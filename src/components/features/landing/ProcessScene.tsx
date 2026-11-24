"use client";

import { useEffect, useRef } from "react";
import {
  BufferGeometry, Color, DirectionalLight, DynamicDrawUsage, Float32BufferAttribute, HemisphereLight,
  InstancedMesh, MeshStandardMaterial, Object3D, OrthographicCamera,
  Points, PointsMaterial, Quaternion, Scene, Vector3, WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { formations, pieceCount, pieceTone } from "./process-formations";

const duration = 610;
const stagger = 13;
const groups = 6;
const forward = new Vector3(0, 0, 1);

interface Selection {
  stage: number;
  accent: string;
}

function poses({ stage, accent }: Selection) {
  return formations[stage].map(({ x, y, z, angle, width, height, depth }, index) => ({
    position: new Vector3(x, y, z),
    orientation: new Quaternion().setFromAxisAngle(forward, angle),
    scale: new Vector3(width, height, depth),
    color: new Color(pieceTone(stage, index, accent)),
  }));
}

function mountScene(host: HTMLDivElement, initial: Selection) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return;
  }

  const scene = new Scene();
  const camera = new OrthographicCamera(-3, 3, 2, -2, 0.1, 40);
  camera.position.set(3.1, 2.3, 10);
  camera.lookAt(0, 0, 0);
  scene.add(new HemisphereLight("#d9edff", "#384966", 2));
  const keyLight = new DirectionalLight("#f0f9ff", 3.3);
  keyLight.position.set(-3, 5, 5);
  const rimLight = new DirectionalLight("#75baff", 2.5);
  rimLight.position.set(4, -1, -3);
  scene.add(keyLight, rimLight);

  const geometry = new RoundedBoxGeometry(1, 1, 1, 2, 0.14);
  const material = new MeshStandardMaterial({ roughness: 0.3, metalness: 0.28 });
  const tiles = new InstancedMesh(geometry, material, pieceCount);
  tiles.instanceMatrix.setUsage(DynamicDrawUsage);
  tiles.frustumCulled = false;
  scene.add(tiles);

  const dustGeometry = new BufferGeometry();
  const dustPositions = Array.from({ length: 36 }, (_, index) => {
    const angle = index * 2.39996;
    const radius = 1.95 + (index % 7) * 0.14;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.75, Math.cos(index * 0.7) * 0.8];
  }).flat();
  dustGeometry.setAttribute("position", new Float32BufferAttribute(dustPositions, 3));
  const dustMaterial = new PointsMaterial({ color: "#a4c5e8", size: 0.036, transparent: true, opacity: 0.5 });
  scene.add(new Points(dustGeometry, dustMaterial));

  const dummy = new Object3D();
  const current = poses(initial);
  let from = current;
  let to = current;
  let transitionStart = 0;
  let transitioning = false;
  let visible = false;
  let contextLost = false;
  let scheduled = 0;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  host.append(renderer.domElement);

  function requestFrame() {
    if (!scheduled && visible && !contextLost && !document.hidden) scheduled = requestAnimationFrame(render);
  }

  function render(time: number) {
    scheduled = 0;
    if (!visible || contextLost || document.hidden) return;

    const elapsed = time - transitionStart;
    current.forEach((pose, index) => {
      const t = transitioning ? Math.min(1, Math.max(0, (elapsed - (index % groups) * stagger) / duration)) : 1;
      const amount = t * t * (3 - 2 * t);
      if (transitioning) {
        pose.position.lerpVectors(from[index].position, to[index].position, amount);
        pose.position.z += Math.sin(Math.PI * t) * (0.32 + (index % 4) * 0.13);
        pose.orientation.slerpQuaternions(from[index].orientation, to[index].orientation, amount);
        pose.scale.lerpVectors(from[index].scale, to[index].scale, amount);
        pose.color.lerpColors(from[index].color, to[index].color, amount);
      }
      dummy.position.copy(pose.position);
      dummy.quaternion.copy(pose.orientation);
      dummy.scale.copy(pose.scale);
      dummy.updateMatrix();
      tiles.setMatrixAt(index, dummy.matrix);
      tiles.setColorAt(index, pose.color);
    });
    tiles.instanceMatrix.needsUpdate = true;
    if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true;
    renderer.render(scene, camera);
    host.dataset.processWebglReady = "true";

    if (transitioning && elapsed < duration + (groups - 1) * stagger) requestFrame();
    else transitioning = false;
  }

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const aspect = width / height;
    const vertical = Math.max(1.98, 2.55 / aspect);
    camera.left = -vertical * aspect;
    camera.right = vertical * aspect;
    camera.top = vertical;
    camera.bottom = -vertical;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    requestFrame();
  }

  function loseContext() {
    contextLost = true;
    cancelAnimationFrame(scheduled);
    delete host.dataset.processWebglReady;
  }

  const viewport = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    requestFrame();
  });
  const dimensions = new ResizeObserver(resize);
  viewport.observe(host);
  dimensions.observe(host);
  document.addEventListener("visibilitychange", requestFrame);
  renderer.domElement.addEventListener("webglcontextlost", loseContext);
  resize();

  return {
    select(selection: Selection) {
      from = current.map((item) => ({
        position: item.position.clone(), orientation: item.orientation.clone(),
        scale: item.scale.clone(), color: item.color.clone(),
      }));
      to = poses(selection);
      transitionStart = performance.now();
      transitioning = true;
      requestFrame();
    },
    dispose() {
      cancelAnimationFrame(scheduled);
      viewport.disconnect();
      dimensions.disconnect();
      document.removeEventListener("visibilitychange", requestFrame);
      renderer.domElement.removeEventListener("webglcontextlost", loseContext);
      renderer.domElement.remove();
      delete host.dataset.processWebglReady;
      tiles.dispose();
      geometry.dispose();
      material.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    },
  };
}

export default function ProcessScene({ stage, accent }: Selection) {
  const host = useRef<HTMLDivElement>(null);
  const selection = useRef({ stage, accent });
  const mounted = useRef<ReturnType<typeof mountScene>>(undefined);

  useEffect(() => {
    selection.current = { stage, accent };
    mounted.current?.select(selection.current);
  }, [stage, accent]);

  useEffect(() => {
    if (!host.current) return;
    const instance = mountScene(host.current, selection.current);
    mounted.current = instance;
    return () => {
      instance?.dispose();
      mounted.current = undefined;
    };
  }, []);

  return <div ref={host} data-process-webgl aria-hidden="true" />;
}

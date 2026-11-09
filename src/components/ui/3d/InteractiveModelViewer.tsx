"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

interface InteractiveModelProps {
  modelUrl?: string;
  color?: string;
  wireframe?: boolean;
  autoRotate?: boolean;
}

function ProceduralTechModel({ color = "#0ea5e9", wireframe = false }: { color?: string; wireframe?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.2;
      coreRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      {/* Outer Holographic Cage */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          wireframe={wireframe || true}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glossy Organic Core */}
      <mesh ref={coreRef} scale={0.75}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function LoadedGLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

export default function InteractiveModelViewer({
  modelUrl,
  color = "#0ea5e9",
  wireframe = false,
  autoRotate = true,
}: InteractiveModelProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="w-full h-full min-h-[350px] relative rounded-2xl overflow-hidden bg-slate-950/40">
      {inView ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color={color} />

          <Suspense fallback={null}>
            {modelUrl ? (
              <LoadedGLBModel url={modelUrl} />
            ) : (
              <ProceduralTechModel color={color} wireframe={wireframe} />
            )}
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4.5}
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-mono">
          3D Canvas Paused (Offscreen)
        </div>
      )}
    </div>
  );
}

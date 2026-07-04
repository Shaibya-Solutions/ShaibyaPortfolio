"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Scroll, Sparkles } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Code2, Cpu, Globe, Rocket, Database, Smartphone, Sparkles as SparkleIcon } from "lucide-react";

// Total virtual depth of the tunnel. Everything (camera, rings, cards) is scaled to this single number.
const TOTAL_DEPTH = 320;

const CARDS = [
  {
    icon: Code2,
    title: "ENGINEERED",
    body: "Scroll to fly through the architecture.",
    hero: true,
  },
  {
    icon: Cpu,
    title: "Scalable Systems",
    body: "Microservices and serverless architectures designed to handle infinite scale with zero latency.",
    color: "sky",
  },
  {
    icon: Globe,
    title: "Web & Mobile",
    body: "React, Next.js, and Swift ecosystems. We don't just build apps, we build experiences that feel alive.",
    color: "blue",
  },
  {
    icon: Database,
    title: "Data Integrity",
    body: "PostgreSQL clusters, Redis caching, and robust ORMs ensuring your data is safe, fast, and globally distributed.",
    color: "indigo",
  },
  {
    icon: SparkleIcon,
    title: "AI Integration",
    body: "LLM-powered features, RAG pipelines, and intelligent automation woven into your product.",
    color: "purple",
  },
  {
    icon: Smartphone,
    title: "Native Feel",
    body: "Cross-platform experiences delivering native 60fps performance and fluid interactions.",
    color: "cyan",
  },
  {
    icon: Rocket,
    title: "Ready to Deploy?",
    body: "",
    cta: true,
  },
];

const SEGMENT = TOTAL_DEPTH / CARDS.length;

// --- 3D Scene Components ---

function TunnelRings() {
  const gap = 14; // fixed visual density regardless of total depth
  const ringsCount = Math.ceil(TOTAL_DEPTH / gap) + 2;
  const rings = useMemo(() => {
    return Array.from({ length: ringsCount }).map((_, i) => {
      const z = -(i * gap);
      const rotation = Math.random() * Math.PI;
      // Slightly darker/more saturated blues to show up on white background
      const color = i % 3 === 0 ? "#0284c7" : i % 2 === 0 ? "#0ea5e9" : "#6366f1";
      return { z, rotation, color };
    });
  }, []);

  return (
    <group>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, ring.rotation]}>
          <torusGeometry args={[10, 0.02, 8, 32]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.4} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function StaticDataNodes() {
  const nodes = useMemo(() => {
    return Array.from({ length: 40 }).map(() => {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = -(Math.random() * TOTAL_DEPTH);
      return { position: [x, y, z] as [number, number, number] };
    });
  }, []);

  return (
    <group>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <octahedronGeometry args={[Math.random() * 0.4 + 0.1, 0]} />
          <meshBasicMaterial color="#0284c7" wireframe />
        </mesh>
      ))}
    </group>
  );
}

function CameraController() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Camera travel distance now matches TOTAL_DEPTH exactly, so ring speed feels consistent
      // no matter how many cards / how deep the tunnel is.
      const targetZ = scroll.offset * TOTAL_DEPTH;
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta);
      groupRef.current.rotation.z = scroll.offset * Math.PI * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <TunnelRings />
      <StaticDataNodes />
      {/* Removed Stars (too hard to see on light bg), kept darker sparkles */}
      <Sparkles count={150} scale={20} size={2} color="#0ea5e9" speed={0.4} opacity={0.8} position={[0, 0, -TOTAL_DEPTH / 2]} />
    </group>
  );
}

// One card = one segment of scroll. Only ONE card is ever visible at a time.
// It fades + floats in, holds, then fades + floats out as the next one fades in.
function FloatingCard({ index, children }: { index: number; children: React.ReactNode }) {
  const scroll = useScroll();
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const t = useRef(0);

  const segStart = index * SEGMENT;
  const segEnd = segStart + SEGMENT;
  const fade = SEGMENT * 0.2; // 20% of segment used for fading

  useFrame((state, delta) => {
    if (!wrapRef.current || !innerRef.current) return;
    t.current += delta;

    const z = scroll.offset * TOTAL_DEPTH;

    let opacity = 0;
    
    // Strict sequential math: no overlapping crossfades!
    if (z >= segStart && z <= segEnd) {
      if (z < segStart + fade) {
        // Fading in
        opacity = index === 0 ? 1 : (z - segStart) / fade; // First card is always visible at start
      } else if (z > segEnd - fade) {
        // Fading out
        opacity = 1 - (z - (segEnd - fade)) / fade;
      } else {
        // Sweet spot
        opacity = 1;
      }
    }
    
    opacity = Math.max(0, Math.min(1, opacity));

    if (opacity <= 0.01) {
      wrapRef.current.style.display = "none";
    } else {
      wrapRef.current.style.display = "flex";
      wrapRef.current.style.opacity = opacity.toString();
      wrapRef.current.style.pointerEvents = opacity > 0.6 ? "auto" : "none";

      // Counteract the scroll so the card stays fixed in the viewport!
      const scrollY = scroll.offset * (CARDS.length - 1) * window.innerHeight;
      wrapRef.current.style.transform = `translate3d(0, ${scrollY}px, 0)`;

      // gentle continuous float (bob up/down + tiny rotation) while visible
      const bob = Math.sin(t.current * 1.1) * 10;
      const tilt = Math.sin(t.current * 0.7) * 1.2;
      const scale = 0.94 + opacity * 0.06; // settles to 1 when fully visible
      innerRef.current.style.transform = `translateY(${bob}px) rotate(${tilt}deg) scale(${scale})`;
    }
  });

  return (
    <div
      ref={wrapRef}
      className="absolute top-0 left-0 w-screen h-screen items-center justify-center px-6"
      style={{ display: "none" }}
    >
      <div ref={innerRef} style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
    </div>
  );
}

const colorMap: Record<string, string> = {
  sky: "border-sky-500/30",
  blue: "border-blue-500/30",
  indigo: "border-indigo-500/30",
  purple: "border-purple-500/30",
  cyan: "border-cyan-500/30",
};

function ContentNodes() {
  return (
    <>
      {CARDS.map((card, i) => {
        const Icon = card.icon;

        if (card.hero) {
          return (
            <FloatingCard key={i} index={i}>
              <div className="w-[90vw] md:w-[800px] text-center">
                <div className="mx-auto w-24 h-24 bg-sky-500/10 border border-sky-500/30 rounded-full flex items-center justify-center mb-8 shadow-sm">
                  <Icon className="w-12 h-12 text-sky-600" />
                </div>
                <h1 className="text-6xl md:text-[8rem] font-black text-slate-900 tracking-tighter mb-6">
                  {card.title}
                </h1>
                <p className="text-2xl md:text-3xl text-slate-600 font-light bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-xl">
                  {card.body}
                </p>
              </div>
            </FloatingCard>
          );
        }

        if (card.cta) {
          return (
            <FloatingCard key={i} index={i}>
              <div className="w-[90vw] md:w-[900px] text-center">
                <Icon className="w-20 h-20 text-sky-500 mx-auto mb-8 animate-bounce" />
                <h2 className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tighter leading-tight">
                  Ready to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                    Deploy?
                  </span>
                </h2>
                <button className="px-14 py-6 bg-slate-900 text-white font-bold text-xl rounded-full hover:bg-slate-800 transition-colors pointer-events-auto shadow-2xl hover:shadow-[0_0_40px_rgba(14,165,233,0.3)]">
                  Initialize Project
                </button>
              </div>
            </FloatingCard>
          );
        }

        return (
          <FloatingCard key={i} index={i}>
            <div
              className={`w-[90vw] md:w-[650px] text-center bg-white/95 backdrop-blur-md p-12 md:p-16 rounded-[3rem] border ${colorMap[card.color || "sky"]} shadow-2xl`}
            >
              <Icon className="w-16 h-16 text-sky-500 mx-auto mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{card.title}</h2>
              <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">{card.body}</p>
            </div>
          </FloatingCard>
        );
      })}
    </>
  );
}

// --- Main Export ---

export function Soft3DScrollExperience() {
  return (
    <main className="w-full h-screen bg-slate-50 overflow-hidden fixed inset-0 z-50 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={1}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#f8fafc"]} />
        <fog attach="fog" args={["#f8fafc", 5, 40]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />

        <Suspense fallback={null}>
          <ScrollControls pages={CARDS.length} damping={0.25} distance={1.2}>
            <CameraController />
            <Scroll html style={{ width: "100%", height: "100%" }}>
              <div className="w-full h-full relative pointer-events-none">
                <ContentNodes />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      <style dangerouslySetInnerHTML={{
        __html: `body { overflow: hidden !important; }`,
      }} />
    </main>
  );
}

export default Soft3DScrollExperience;
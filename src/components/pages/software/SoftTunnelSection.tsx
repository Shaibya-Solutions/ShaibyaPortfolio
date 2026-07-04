"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Cpu, Laptop, Globe, Database } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_DEPTH = 200;

const CARDS = [
  {
    icon: Cpu,
    title: "System Architecture",
    body: "Designing scalable, resilient cloud-native foundations tailored for high availability.",
    color: "pink",
  },
  {
    icon: Laptop,
    title: "UI/UX Engineering",
    body: "Crafting intuitive interfaces powered by behavioral data to ensure seamless user journeys.",
    color: "amber",
  },
  {
    icon: Globe,
    title: "Full-Stack Development",
    body: "Building robust backend APIs and dynamic frontends that scale infinitely.",
    color: "blue",
  },
  {
    icon: Database,
    title: "CI/CD & Deployment",
    body: "Automated testing and zero-downtime containerized releases for rapid iterations.",
    color: "rose",
  },
];

const SEGMENT = TOTAL_DEPTH / CARDS.length;



function TunnelRings() {
  const gap = 10;
  const ringsCount = Math.ceil(TOTAL_DEPTH / gap) + 2;
  const rings = useMemo(() => {
    return Array.from({ length: ringsCount }).map((_, i) => {
      const z = -(i * gap);
      const rotation = Math.random() * Math.PI;
      const color = i % 3 === 0 ? "#0284c7" : i % 2 === 0 ? "#0ea5e9" : "#6366f1";
      return { z, rotation, color };
    });
  }, []);

  return (
    <group>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, ring.rotation]}>
          <torusGeometry args={[8, 0.02, 8, 32]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.3} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function StaticDataNodes() {
  const nodes = useMemo(() => {
    return Array.from({ length: 40 }).map(() => {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = -(Math.random() * TOTAL_DEPTH);
      return { position: [x, y, z] as [number, number, number] };
    });
  }, []);

  return (
    <group>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <octahedronGeometry args={[Math.random() * 0.3 + 0.1, 0]} />
          <meshBasicMaterial color="#0284c7" wireframe />
        </mesh>
      ))}
    </group>
  );
}

function CameraController({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetZ = progressRef.current * TOTAL_DEPTH;
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta);
      groupRef.current.rotation.z = progressRef.current * Math.PI * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <TunnelRings />
      <StaticDataNodes />
      <Sparkles count={100} scale={15} size={2} color="#0ea5e9" speed={0.4} opacity={0.8} position={[0, 0, -TOTAL_DEPTH / 2]} />
    </group>
  );
}

export function SoftTunnelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // 4 screens of scrolling
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Update shared scroll state for the Canvas via ref
          progressRef.current = self.progress;

          // 1. Animate Title from center to top (0.0 to 0.1 progress)
          if (titleRef.current) {
            const p = Math.min(1, Math.max(0, self.progress * 10)); // 0 to 1 over the first 10%
            // Start at top 50% (translateY -50%), end at top 3rem (translateY 0%)
            // We'll just interpolate translateY using percentages or pixels
            const yOffset = 50 - (p * 50); // 50vh down to 0
            const yPercent = -50 + (p * 50); // -50% to 0%
            const scale = 1 + ((1 - p) * 0.2); // Starts at 1.2 scale, goes to 1.0
            
            titleRef.current.style.top = p === 1 ? '3rem' : `calc(${yOffset}vh + 3rem)`;
            titleRef.current.style.transform = `translateY(${yPercent}%) scale(${scale})`;
          }

          // 2. Adjust cards mapping to use the remaining 90% of scroll (0.1 to 1.0)
          // We map 0.1-1.0 to 0-1 for the cards.
          let cardProgress = 0;
          if (self.progress > 0.1) {
            cardProgress = (self.progress - 0.1) / 0.9;
          }

          const z = cardProgress * TOTAL_DEPTH;
          
          cardsRef.current.forEach((card, index) => {
            if (!card) return;
            const segStart = index * SEGMENT;
            const segEnd = segStart + SEGMENT;
            const fade = SEGMENT * 0.2;
            
            let opacity = 0;
            // Only show cards if cardProgress > 0 (i.e. self.progress > 0.1)
            if (cardProgress > 0 && z >= segStart && z <= segEnd) {
              if (z < segStart + fade) {
                opacity = index === 0 ? (z - segStart) / fade : (z - segStart) / fade;
              } else if (z > segEnd - fade) {
                opacity = 1 - (z - (segEnd - fade)) / fade;
              } else {
                opacity = 1;
              }
            }
            opacity = Math.max(0, Math.min(1, opacity));
            
            if (opacity <= 0.01) {
              card.style.display = "none";
            } else {
              card.style.display = "flex";
              card.style.opacity = opacity.toString();
              card.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
              
              const scale = 0.94 + opacity * 0.06;
              card.style.transform = `scale(${scale})`;
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const colorMap: Record<string, string> = {
    pink: "border-pink-500/30 text-pink-500",
    amber: "border-amber-500/30 text-amber-500",
    blue: "border-blue-500/30 text-blue-500",
    rose: "border-rose-500/30 text-rose-500",
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-slate-50 overflow-hidden border-t border-slate-200">
      
      {/* 3D Tunnel Background */}
      <div className="absolute inset-0 z-0">
        {isClient && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={1}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <color attach="background" args={["#f8fafc"]} />
            <fog attach="fog" args={["#f8fafc", 5, 30]} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
            <CameraController progressRef={progressRef} />
          </Canvas>
        )}
      </div>

      {/* HTML Cards Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute inset-0 flex items-center justify-center px-6"
              style={{ display: "none", opacity: 0 }}
            >
              <div
                className={`w-[90vw] md:w-[650px] text-center bg-white/95 backdrop-blur-md p-12 md:p-16 rounded-[3rem] border shadow-2xl transition-transform ${colorMap[card.color].split(' ')[0]}`}
              >
                <div className={`mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-8 border ${colorMap[card.color].split(' ')[0]}`}>
                  <Icon className={`w-10 h-10 ${colorMap[card.color].split(' ')[1]}`} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{card.title}</h2>
                <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">{card.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div 
        ref={titleRef}
        className="absolute left-0 w-full text-center px-6 z-20 pointer-events-none"
        style={{ top: 'calc(50vh + 3rem)', transform: 'translateY(-50%) scale(1.2)' }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight drop-shadow-md">
          Engineering & Development Capabilities
        </h2>
      </div>

    </section>
  );
}

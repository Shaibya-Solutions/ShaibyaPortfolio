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

// Adapted for Software Solutions
const CARDS = [
  {
    icon: Globe,
    title: "Enterprise Web",
    body: "Designing scalable, resilient web architectures tailored for high availability and performance.",
    color: "pink",
  },
  {
    icon: Laptop,
    title: "Native Mobile",
    body: "Crafting intuitive iOS and Android applications powered by behavioral data to ensure seamless journeys.",
    color: "amber",
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    body: "Building robust backend APIs, databases, and microservices that scale infinitely.",
    color: "blue",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    body: "Seamlessly embedding intelligent automation and LLMs directly into your software products.",
    color: "rose",
  },
  {
    icon: Globe,
    title: "Cloud & DevOps",
    body: "Automated CI/CD pipelines and containerized zero-downtime deployments via Kubernetes.",
    color: "pink",
  },
  {
    icon: Laptop,
    title: "Cybersecurity",
    body: "Military-grade encryption and automated vulnerability scanning to keep your data untouchable.",
    color: "amber",
  },
  {
    icon: Database,
    title: "SaaS Platforms",
    body: "End-to-end multi-tenant architecture designed to support rapid scaling and subscription models.",
    color: "blue",
  }
];

const SEGMENT = TOTAL_DEPTH / CARDS.length;

function TunnelRings() {
  const gap = 20; // Increased gap to make rings feel slower
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
      groupRef.current.rotation.z = progressRef.current * Math.PI * 0.10; // Slower rotation
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

export function SoftScrollExperience() {
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
        end: "+=700%", // 7 screens of scrolling for 7 cards (much smoother/slower)
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onRefresh: () => console.log("ScrollTrigger refreshed"),
        onUpdate: (self) => {
          // Update shared scroll state for the Canvas via ref
          progressRef.current = self.progress;

          // 1. Animate Title from center to top (0.0 to 0.1 progress)
          if (titleRef.current) {
            const p = Math.min(1, Math.max(0, self.progress * 10)); // 0 to 1 over the first 10%
            // Start at top 50% (translateY -50%), end at top 3rem (translateY 0%)
            const yOffset = 50 - (p * 50); // 50vh down to 0
            const yPercent = -50 + (p * 50); // -50% to 0%
            const scale = 1 + ((1 - p) * 0.2); // Starts at 1.2 scale, goes to 1.0
            
            titleRef.current.style.top = p === 1 ? '3rem' : `calc(${yOffset}vh + 3rem)`;
            titleRef.current.style.transform = `translateY(${yPercent}%) scale(${scale})`;
          }

          // 2. Adjust cards mapping to use the remaining 90% of scroll (0.1 to 1.0)
          let cardProgress = 0;
          if (self.progress > 0.1) {
            cardProgress = (self.progress - 0.1) / 0.9;
          }

          const z = cardProgress * TOTAL_DEPTH;
          const gapZ = TOTAL_DEPTH / Math.max(1, CARDS.length - 1);
          
          cardsRef.current.forEach((card, index) => {
            if (!card) return;
            const cardTargetZ = index * gapZ;
            const distance = z - cardTargetZ; // positive means camera scrolled past it
            
            // 3. Ultra-smooth Fading logic
            const maxFadeDist = gapZ * 0.85; // How far before it fully fades out
            const solidDist = gapZ * 0.15; // How far it stays at 100% opacity
            
            let opacity = 0;
            if (Math.abs(distance) <= solidDist) {
              opacity = 1;
            } else {
              opacity = 1 - ((Math.abs(distance) - solidDist) / (maxFadeDist - solidDist));
            }

            opacity = Math.max(0, Math.min(1, opacity));
            if (cardProgress <= 0) opacity = 0; // Hide completely during title animation
            
            if (opacity <= 0.01) {
              card.style.display = "none";
            } else {
              card.style.display = "flex";
              card.style.opacity = opacity.toString();
              card.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
              
              // 4. Smooth Vertical Sliding & Scaling
              // Card comes from bottom (positive Y) and goes to top (negative Y)
              const yTranslate = (distance / gapZ) * -150; // Slides up by 150px
              const scale = 1 - (Math.abs(distance) / gapZ) * 0.08; // Gentle scale down
              
              card.style.transform = `translateY(${yTranslate}px) scale(${scale})`;
            }
          });
        }
      });
    }, containerRef);

    // Give React time to render sibling components properly
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => ctx.revert();
  }, []);

  const colorMap: Record<string, string> = {
    pink: "border-pink-500/30 text-pink-500",
    amber: "border-amber-500/30 text-amber-500",
    blue: "border-blue-500/30 text-blue-500",
    rose: "border-rose-500/30 text-rose-500",
  };

  return (
    <section ref={containerRef} className="relative z-10 h-screen w-full bg-slate-50 overflow-hidden">
      
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
          Software Capabilities
        </h2>
      </div>

    </section>
  );
}

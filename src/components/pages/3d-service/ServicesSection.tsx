"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Cuboid, Play, MonitorPlay } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Character Modelling",
    description: "High-fidelity, rig-ready character models for games, films, and AR/VR with immaculate topology.",
    icon: <MonitorPlay className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "Product Rendering",
    description: "Photorealistic product visualizations that highlight materials, lighting, and premium details.",
    icon: <Cuboid className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Architectural Viz",
    description: "Breathtaking 3D walkthroughs and interior renders that bring unbuilt spaces to life.",
    icon: <Layers className="w-8 h-8 text-pink-500" />,
  },
  {
    title: "Motion Graphics",
    description: "Dynamic, cinematic 3D motion graphics that elevate your brand's storytelling.",
    icon: <Play className="w-8 h-8 text-blue-500" />,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Expertise</span>
          </h2>
          <p className="text-slate-600 max-w-2xl text-lg">
            Specialized 3D pipelines designed to deliver industry-leading visual fidelity without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <TiltCard
              key={service.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const TiltCard = React.forwardRef<HTMLDivElement, { icon: React.ReactNode, title: string, description: string }>(({ icon, title, description }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15;
    const y = (e.clientY - top - height / 2) / 15;
    setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  // Compose refs
  const setRefs = (el: HTMLDivElement) => {
    cardRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  return (
    <div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-8 rounded-3xl bg-slate-50 border border-slate-200 transition-all duration-200 ease-out flex flex-col items-start cursor-pointer hover:bg-white hover:shadow-xl hover:-translate-y-2"
      style={{ transform, transformStyle: "preserve-3d" }}
    >
      <div 
        className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm"
        style={{ transform: "translateZ(30px)" }}
      >
        {icon}
      </div>
      <h3 
        className="text-xl font-semibold text-slate-900 mb-3"
        style={{ transform: "translateZ(20px)" }}
      >
        {title}
      </h3>
      <p 
        className="text-slate-600 leading-relaxed text-sm"
        style={{ transform: "translateZ(10px)" }}
      >
        {description}
      </p>
    </div>
  );
});
TiltCard.displayName = "TiltCard";

import React from "react";

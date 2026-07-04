"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Laptop, Database, Globe, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processes = [
  { 
    id: "01", 
    title: "System Architecture", 
    desc: "Designing scalable, resilient cloud-native foundations tailored for high availability and performance.", 
    icon: <Cpu className="w-8 h-8 text-pink-500" />,
    colorClass: "bg-pink-500/10 text-pink-500"
  },
  { 
    id: "02", 
    title: "UI/UX Engineering", 
    desc: "Crafting intuitive interfaces powered by behavioral data to ensure seamless user journeys.", 
    icon: <Laptop className="w-8 h-8 text-amber-500" />,
    colorClass: "bg-amber-500/10 text-amber-500"
  },
  { 
    id: "03", 
    title: "Full-Stack Development", 
    desc: "Building robust backend APIs and dynamic frontends that scale infinitely with your business.", 
    icon: <Globe className="w-8 h-8 text-blue-500" />,
    colorClass: "bg-blue-500/10 text-blue-500"
  },
  { 
    id: "04", 
    title: "CI/CD & Deployment", 
    desc: "Automated testing and zero-downtime containerized releases for rapid iterations.", 
    icon: <Database className="w-8 h-8 text-rose-500" />,
    colorClass: "bg-rose-500/10 text-rose-500"
  },
];

export function SoftProcessScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      // Calculate how far to scroll left
      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculate on resize
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-slate-50 overflow-hidden flex flex-col justify-center relative border-t border-slate-200">
      
      <div className="absolute top-16 left-0 w-full text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Engineering & Development Capabilities
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="flex gap-6 px-12 md:px-24 w-max items-center h-full mt-20">
        {processes.map((process) => (
          <div 
            key={process.id} 
            className="w-[85vw] md:w-[40vw] lg:w-[350px] h-auto min-h-[380px] flex flex-col relative group rounded-3xl overflow-hidden shrink-0 bg-white border border-slate-200 shadow-sm p-8 hover:shadow-md transition-shadow"
          >
            {/* Pill shaped icon container */}
            <div className="bg-slate-100 rounded-full py-4 px-6 mb-8 w-fit flex items-center justify-center">
              {process.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {process.title}
            </h3>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              {process.desc}
            </p>
          </div>
        ))}
        {/* Empty padding block at the end so the last item centers */}
        <div className="w-[10vw] shrink-0" />
      </div>
    </section>
  );
}

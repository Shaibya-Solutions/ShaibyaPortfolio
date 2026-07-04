"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DigitalFeaturesParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el) => {
        if (!el) return;
        const speed = parseFloat(el.dataset.speed || "1");
        
        gsap.to(el, {
          y: () => -150 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background large watermark */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-slate-100 whitespace-nowrap pointer-events-none"
        ref={(el) => { elementsRef.current[0] = el; }}
        data-speed="0.2"
      >
        SYSTEM
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Column: Text and smaller images */}
        <div className="flex flex-col gap-32 pt-20">
          <div 
            ref={(el) => { elementsRef.current[1] = el; }} 
            data-speed="1.2"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Enterprise Web <br/><span className="text-[#0ea5e9]">Applications</span>
            </h3>
            <p className="text-slate-600 text-lg md:text-xl">
              We build scalable React and Next.js applications designed for maximum performance, SEO, and robust state management.
            </p>
          </div>

          <div 
            ref={(el) => { elementsRef.current[2] = el; }} 
            data-speed="0.8"
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-sky-500/20 shadow-xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop"
              alt="Code Editor"
              fill
              className="object-cover opacity-90"
            />
          </div>
          
          <div 
            ref={(el) => { elementsRef.current[3] = el; }} 
            data-speed="1.5"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Database <br/><span className="text-[#0ea5e9]">Architecture</span>
            </h3>
            <p className="text-slate-600 text-lg md:text-xl">
              Optimized PostgreSQL, MongoDB, and Redis infrastructures ensuring low-latency data retrieval and bulletproof redundancy.
            </p>
          </div>
        </div>

        {/* Right Column: Staggered large images */}
        <div className="flex flex-col gap-32">
          <div 
            ref={(el) => { elementsRef.current[4] = el; }} 
            data-speed="1.6"
            className="relative w-full aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-2xl mt-0 lg:mt-32"
          >
            <Image 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
              alt="Dashboard"
              fill
              className="object-cover opacity-90"
            />
          </div>

          <div 
            ref={(el) => { elementsRef.current[5] = el; }} 
            data-speed="1.1"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Native Mobile <br/><span className="text-[#0ea5e9]">Experiences</span>
            </h3>
            <p className="text-slate-600 text-lg md:text-xl">
              Cross-platform React Native and Swift applications delivering native 60fps performance and beautiful fluid interactions.
            </p>
          </div>

          <div 
            ref={(el) => { elementsRef.current[6] = el; }} 
            data-speed="0.9"
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-sky-500/20 shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
              alt="Mobile App"
              fill
              className="object-cover opacity-90"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SoftFeaturesParallax() {
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[20rem] font-bold text-slate-50 whitespace-nowrap pointer-events-none z-0 select-none"
        ref={(el) => { elementsRef.current[0] = el; }}
        data-speed="0.2"
      >
        ENGINEER
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Column: Text and smaller images */}
        <div className="flex flex-col gap-32 pt-20">
          <div 
            ref={(el) => { elementsRef.current[1] = el; }} 
            data-speed="1.2"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Infinite <br/><span className="text-[#0ea5e9]">Scalability</span>
            </h3>
            <p className="text-slate-600 text-lg md:text-xl">
              We design software architectures that gracefully handle anywhere from a hundred to a million concurrent users without breaking a sweat.
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
              className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div 
            ref={(el) => { elementsRef.current[3] = el; }} 
            data-speed="1.5"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Military-Grade <br/><span className="text-[#0ea5e9]">Security</span>
            </h3>
            <p className="text-slate-600 text-lg md:text-xl">
              From end-to-end encryption to automated vulnerability scanning, we build defense-in-depth into every layer of your application.
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
              alt="Data Dashboard"
              fill
              className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div 
            ref={(el) => { elementsRef.current[5] = el; }} 
            data-speed="1.1"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Pixel-Perfect <br/><span className="text-[#0ea5e9]">Interfaces</span>
            </h3>
            <p className="text-slate-600 text-lg md:text-xl">
              Fluid animations, intuitive navigation, and gorgeous component design. We ensure your users love every second they spend in your app.
            </p>
          </div>

          <div 
            ref={(el) => { elementsRef.current[6] = el; }} 
            data-speed="0.9"
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-sky-500/20 shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
              alt="Mobile Application"
              fill
              className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

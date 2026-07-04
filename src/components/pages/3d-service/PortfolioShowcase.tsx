"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const portfolioItems = [
  { id: 1, title: "Cyber Samurai", img: "https://images.unsplash.com/photo-1633519842426-302482fa816d?q=80&w=800&auto=format&fit=crop", speed: 0.8 },
  { id: 2, title: "Abstract Flow", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", speed: 1.2 },
  { id: 3, title: "Product Viz", img: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800&auto=format&fit=crop", speed: 0.9 },
  { id: 4, title: "Arch Render", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop", speed: 1.1 },
  { id: 5, title: "Sci-Fi Environment", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop", speed: 1.3 },
  { id: 6, title: "Character Rig", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop", speed: 0.7 },
];

export function PortfolioShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        const speed = parseFloat(item.dataset.speed || "1");
        
        gsap.to(item, {
          y: (i, target) => -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold font-heading text-slate-900"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Works</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              data-speed={item.speed}
              className={`relative group rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 aspect-[4/5] shadow-sm ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <Image 
                src={item.img} 
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <span className="text-cyan-600 text-sm font-semibold uppercase tracking-wider">3D Render</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

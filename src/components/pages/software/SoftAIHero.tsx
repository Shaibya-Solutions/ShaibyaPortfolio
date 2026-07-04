"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Link, Sparkles } from "lucide-react";
import { useRef } from "react";

export function SoftAIHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-40 overflow-hidden bg-white flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* Light Theme Spotlight Effect from Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-cyan-400/20 via-blue-400/10 to-transparent blur-[80px] pointer-events-none" />
      
      {/* Background Grid Lines (Light Theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 font-bold text-sm mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Next-Generation Intelligence</span>
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-slate-900 mb-8 leading-[1.1]">
            Innovate Faster. Achieve More. <br />
            With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">AI Solutions.</span>
          </h2>
          
          <div className="mt-12">
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <Link className="w-5 h-5 group-hover:rotate-45 transition-transform" /> Learn More
              </span>
              <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

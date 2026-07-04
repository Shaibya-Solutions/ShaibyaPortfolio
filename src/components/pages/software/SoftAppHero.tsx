"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Smartphone } from "lucide-react";
import { useRef } from "react";

export function SoftAppHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={containerRef} className="relative py-40 bg-slate-50 overflow-hidden flex items-center min-h-[90vh]">
      
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[15%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[100px] mix-blend-multiply" 
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        
        <motion.div style={{ scale, opacity, y }} className="w-full">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-md text-purple-600 font-bold text-sm mb-8 border border-purple-100">
            <Smartphone className="w-4 h-4" />
            <span>Mobile & Desktop Experiences</span>
          </div>

          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-slate-900 mb-8 leading-[0.95]">
            Crafting Apps That <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
              Feel Native.
            </span>
          </h2>

          <p className="text-xl md:text-3xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed mb-12">
            Building beautiful, high-performance applications for every screen, delivering flawless <strong className="font-bold text-slate-900">UX</strong> and <strong className="font-bold text-slate-900">multi-platform stability</strong> across iOS, Android, and Desktop.
          </p>

          <button className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-2xl rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-all overflow-hidden scale-100 hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Launch Your Next App <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

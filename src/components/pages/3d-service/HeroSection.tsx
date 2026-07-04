"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Hero3DScene } from "./Hero3DScene";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - Copy */}
        <div className="flex flex-col items-start text-left pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 border border-slate-900/10 backdrop-blur-md mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider text-slate-700 uppercase">Immersive Experiences</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight leading-tight"
          >
            <span className="text-slate-900">Shaping the</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500">
              Virtual Future
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 font-light max-w-lg mb-10 leading-relaxed"
          >
            We sculpt hyper-realistic 3D assets, craft cinematic motion graphics, and build immersive visualizations that elevate your brand's digital presence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <button className="group relative px-8 py-4 bg-slate-900 text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl">
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-4 h-4 fill-white text-white" />
                View Showreel
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            <button className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-semibold rounded-full shadow-sm transition-all hover:scale-105 active:scale-95">
              Explore Services
            </button>
          </motion.div>
        </div>

        {/* Right Column - 3D Canvas */}
        <div className="relative h-[50vh] lg:h-[80vh] w-full rounded-3xl overflow-hidden pointer-events-none">
          <Hero3DScene />
        </div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent" />
      </motion.div>
    </section>
  );
}

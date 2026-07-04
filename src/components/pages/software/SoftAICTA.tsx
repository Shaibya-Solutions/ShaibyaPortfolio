"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";

export function SoftAICTA() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      
      {/* Dynamic Background Effects (Light Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/10 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="bg-slate-50 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 border border-slate-200 shadow-2xl relative overflow-hidden"
        >
          {/* Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-400/20 blur-[60px]" />
          
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-8 border border-slate-200 shadow-sm relative">
            <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-40" />
            <Cpu className="w-10 h-10 text-cyan-500" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Ready to innovate with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">AI solutions?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-12">
            Let's discuss how AI can transform your business operations and drive exponential growth.
          </p>
          
          <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-full hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all overflow-hidden scale-100 hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Start Your AI Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Liquid hover effect */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function SoftAmplifyCTA() {
  return (
    <section className="py-32 bg-slate-50 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[3rem] p-12 md:p-24 text-center border border-slate-200 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-400/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Ready to scale your digital <span className="text-pink-500">infrastructure?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Let's translate your business goals into a powerful, scalable, and profitable digital architecture.
            </p>
            
            <button className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-pink-500 text-white font-bold text-xl rounded-full hover:bg-pink-600 hover:scale-105 transition-all shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)]">
              Book a Strategy Session
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

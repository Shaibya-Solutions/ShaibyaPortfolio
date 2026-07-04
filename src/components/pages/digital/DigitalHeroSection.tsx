"use client";

import { motion } from "framer-motion";
import { Megaphone, Link as LinkIcon } from "lucide-react";

export function DigitalHeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-slate-50 overflow-hidden pt-24 pb-12">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full text-center relative z-10 flex flex-col items-center justify-center flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Megaphone className="w-16 h-16 text-pink-500 mx-auto" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-heading tracking-tight leading-[1.1] text-slate-900 mb-8"
        >
          We Do Not Just Market. We Drive <span className="text-pink-500">Solutions.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Architecting hyper-targeted campaigns that drive scalable acquisition, viral social growth, and exponential revenue acceleration.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full max-w-7xl mx-auto px-10 flex justify-start pb-8"
      >
        <div className="p-3 bg-white rounded-full shadow-md border border-slate-200 cursor-pointer hover:scale-110 transition-transform">
          <LinkIcon className="w-5 h-5 text-slate-700" />
        </div>
      </motion.div>
    </section>
  );
}

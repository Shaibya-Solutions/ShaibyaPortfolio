"use client";

import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden bg-white border-t border-slate-200">
      {/* CSS Animated Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/30 via-cyan-500/20 to-transparent animate-slow-spin mix-blend-multiply pointer-events-none" />
        <div className="absolute top-[20%] left-[20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/20 to-transparent animate-slow-spin-reverse mix-blend-multiply pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold font-heading text-slate-900 mb-8"
        >
          Ready to step into the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Third Dimension?</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-slate-600 mb-12"
        >
          Let's build immersive visual experiences that captivate your audience and elevate your brand.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="group relative px-10 py-5 bg-slate-900 text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 text-lg shadow-xl">
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Required tailwind animations in globals.css or inline style fallback */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slow-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 30s linear infinite;
        }
        .animate-slow-spin-reverse {
          animation: slow-spin-reverse 25s linear infinite;
        }
      `}} />
    </section>
  );
}

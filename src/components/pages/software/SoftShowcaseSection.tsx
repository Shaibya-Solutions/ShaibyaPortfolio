"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PlaySquare } from "lucide-react";

export function SoftShowcaseSection() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading text-slate-900 tracking-tight"
          >
            High-Impact Product Demos
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our engineering team develops dynamic <span className="font-semibold text-slate-900">interactive prototypes and high-fidelity demos</span> designed for maximum stakeholder buy-in. We blend robust backend architecture with compelling frontend experiences.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">Flawless user flow and interactive component testing.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">A/B testing on various interfaces and micro-interactions.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">Optimized performance metrics and load times.</span>
              </li>
            </ul>
          </motion.div>

          {/* Right Video Cards container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-pink-500/30 p-6 bg-white shadow-xl flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
              
              {/* Vertical Card 1 */}
              <div className="w-[240px] shrink-0 h-[400px] bg-slate-50 rounded-2xl border border-slate-200 flex flex-col relative snap-center group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                  <PlaySquare className="w-12 h-12 text-pink-500" strokeWidth={1} />
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-mono font-medium text-slate-500 bg-white px-2 py-1 rounded">
                  0:10
                </div>
              </div>

              {/* Vertical Card 2 */}
              <div className="w-[240px] shrink-0 h-[400px] bg-slate-50 rounded-2xl border border-slate-200 flex flex-col relative snap-center group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                  <PlaySquare className="w-12 h-12 text-pink-500" strokeWidth={1} />
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-mono font-medium text-slate-500 bg-white px-2 py-1 rounded">
                  0:11
                </div>
              </div>

              {/* Vertical Card 3 */}
              <div className="w-[240px] shrink-0 h-[400px] bg-slate-50 rounded-2xl border border-slate-200 flex flex-col relative snap-center group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                  <PlaySquare className="w-12 h-12 text-pink-500" strokeWidth={1} />
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-mono font-medium text-slate-500 bg-white px-2 py-1 rounded">
                  0:12
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

function CountUp({ target, duration, suffix = "", prefix = "" }: { target: number, duration: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // roughly 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{prefix}{count}{suffix}</>;
}

export function SoftPerformanceCTA() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Case Study Snapshot */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-200 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-rose-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-center mb-16 relative z-10">
              Case Study Snapshot: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Performance Boost</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative z-10">
              
              {/* Before */}
              <div className="flex-1 w-full bg-white rounded-3xl p-10 border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[250px]">
                <p className="text-slate-500 font-medium mb-4">Before Optimization</p>
                <div className="text-6xl md:text-8xl font-black text-rose-500 tracking-tighter mb-4">
                  4.5s
                </div>
                <p className="text-slate-700 font-bold text-lg">API Response Time</p>
              </div>

              {/* Arrow */}
              <div className="text-slate-300 md:rotate-0 rotate-90">
                <ArrowRight className="w-12 h-12" />
              </div>

              {/* After */}
              <div className="flex-1 w-full bg-white rounded-3xl p-10 border border-slate-100 shadow-xl text-center flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-slate-500 font-medium mb-4 relative z-10">After Full-Stack Re-architecture</p>
                <div className="text-6xl md:text-8xl font-black text-emerald-500 tracking-tighter mb-4 relative z-10">
                  <CountUp target={80} duration={2000} suffix="ms" />
                </div>
                <p className="text-slate-700 font-bold text-lg relative z-10">API Response Time</p>
                <Zap className="absolute top-6 right-6 w-8 h-8 text-emerald-400 opacity-20 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </div>

            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6">
            Ready to build a platform that <span className="text-orange-500">truly scales?</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium">
            Let's discuss your next-generation web application or modern API strategy.
          </p>
          <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-orange-500/30 transition-all overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Start an Architecture Review <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

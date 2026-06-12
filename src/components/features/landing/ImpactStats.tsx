"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(end: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
}

export default function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const v1 = useCountUp(10, 1600, isInView);
  const v2 = useCountUp(5, 1600, isInView);
  const v3 = useCountUp(3, 1600, isInView);
  const v4 = useCountUp(14, 1600, isInView);

  return (
    <section ref={ref} className="py-28 bg-[#010D18] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header — left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1282A2] mb-4">Impact</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]">
            Numbers that<br />speak for themselves.
          </h2>
        </motion.div>

        {/* Bento grid — asymmetric */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Large stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="col-span-2 bg-gradient-to-br from-[#0B4E61] to-[#034078] rounded-3xl p-10 flex flex-col justify-between min-h-[240px]"
          >
            <p className="text-[#64B0C6] text-sm font-medium uppercase tracking-wider">Live Projects</p>
            <div>
              <span className="text-7xl md:text-8xl font-black text-white">{v1}+</span>
              <p className="text-[#64B0C6] mt-2">Websites, systems, and MVPs across 6 industries</p>
            </div>
          </motion.div>

          {/* Medium stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-8 flex flex-col justify-between min-h-[240px] backdrop-blur-sm"
          >
            <p className="text-[#64B0C6] text-sm font-medium uppercase tracking-wider">Fitness Brands</p>
            <div>
              <span className="text-6xl font-black text-white">{v2}</span>
              <p className="text-[#64B0C6] mt-2 text-sm">Revolution, Wave, Arnold Gold & more</p>
            </div>
          </motion.div>

          {/* Medium stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-8 flex flex-col justify-between min-h-[240px] backdrop-blur-sm"
          >
            <p className="text-[#64B0C6] text-sm font-medium uppercase tracking-wider">RE Clients</p>
            <div>
              <span className="text-6xl font-black text-white">{v3}</span>
              <p className="text-[#64B0C6] mt-2 text-sm">Live in Nagpur with proven results</p>
            </div>
          </motion.div>

          {/* Wide stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="col-span-2 lg:col-span-4 bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-[#64B0C6] text-sm font-medium uppercase tracking-wider mb-1">Collaborators</p>
              <span className="text-5xl font-black text-white">{v4}+</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Bridgestone", "Mirragio", "CyberBugs", "Ensis", "Blue Duck", "VIMS Hospital", "Revolution Fitness", "Manish Group"].map(c => (
                <span key={c} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/60 text-xs font-medium">{c}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

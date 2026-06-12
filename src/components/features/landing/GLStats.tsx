"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10, suffix: "+", label: "Live Projects", sub: "Across industries" },
  { value: 14, suffix: "+", label: "Collaborators", sub: "Global network" },
  { value: 5, suffix: "", label: "Fitness Brands", sub: "Scaled with us" },
  { value: 3, suffix: "", label: "RE Clients", sub: "Real estate wins" },
];

const collaborators = [
  "Bridgestone", "Mirragio", "CyberBugs", "Ensis",
  "Blue Duck", "VIMS Hospital", "Revolution Fitness", "Manish Group",
  "Bridgestone", "Mirragio", "CyberBugs", "Ensis",
  "Blue Duck", "VIMS Hospital", "Revolution Fitness", "Manish Group",
];

function useCounter(target: number, isActive: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isActive, target, duration]);
  return count;
}

export default function GLStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative bg-white py-28 lg:py-40 overflow-hidden border-t border-[#E5E7EB]">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="accent-line w-12 mb-10 origin-left" style={{ transform: "scaleX(1)" }} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-5 inline-block">
            Impact
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#111827]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Numbers that <span className="heading-gradient">tell the story.</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24">
          {stats.map((stat, i) => {
            const count = useCounter(stat.value, isInView);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#111827] leading-none mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {count}<span className="text-[#0ea5e9]">{stat.suffix}</span>
                </div>
                <div className="text-sm font-semibold text-[#111827] mb-1">{stat.label}</div>
                <div className="text-xs text-[#9CA3AF]">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF] mb-8">
            Trusted by
          </p>
          <div
            className="overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="marquee-track">
              {collaborators.map((name, i) => (
                <div key={`${name}-${i}`} className="flex items-center gap-8 px-6">
                  <span className="text-sm font-semibold text-[#D1D5DB] whitespace-nowrap hover:text-[#9CA3AF] transition-colors duration-300 cursor-default">
                    {name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#E5E7EB]" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

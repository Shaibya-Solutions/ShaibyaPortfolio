"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCountUp(end: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
  trigger,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 1600, trigger);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-2 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:border-amber-300 hover:shadow-md transition-all"
    >
      <span className="text-4xl sm:text-5xl font-extrabold text-amber-600">
        {count}
        <span className="text-2xl font-bold text-amber-400">{suffix}</span>
      </span>
      <p className="text-sm text-slate-500 leading-snug">{label}</p>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-stone-50 py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-2">
            In Action
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 max-w-2xl leading-snug">
            Intelligent solutions driving real business growth
          </h2>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 mb-12"
        >
          <div className="aspect-video w-full bg-slate-900">
            <video
              src="/videos/Business_Growth_Video_Generation.mp4"
              controls
              playsInline
              className="w-full h-full"
            />
          </div>
          {/* Amber accent strip */}
          <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            value={42}
            suffix="%"
            label="Average Efficiency Improvement for Clients"
            trigger={isInView}
            delay={0.2}
          />
          <StatCard
            value={167}
            suffix="%"
            label="Average ROI Growth Across Projects"
            trigger={isInView}
            delay={0.3}
          />
          <StatCard
            value={95}
            suffix="%"
            label="Faster Processing with AI Automation"
            trigger={isInView}
            delay={0.4}
          />
          <StatCard
            value={30}
            suffix="+"
            label="Products & Projects Delivered"
            trigger={isInView}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}

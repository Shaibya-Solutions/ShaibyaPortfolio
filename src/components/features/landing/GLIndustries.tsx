"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

export default function GLIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      id="industries"
      className="relative bg-white py-20 lg:py-32 overflow-hidden"
    >
      {/* Subtle dot-grid background */}
      <div className="absolute inset-0 dot-grid opacity-[0.4] pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(14,165,233,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        {/* Header */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="accent-line w-12 mb-8 origin-left"
        />
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-4"
        >
          Industries
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#111827] leading-[1.15]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Deep expertise in the verticals{" "}
          <span className="heading-gradient">that matter.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-sm text-[#9CA3AF] max-w-lg"
        >
          From real estate portals to gym management systems — we've shipped across industries.
          Click any chip to explore.
        </motion.p>
      </div>

      {/* Feature Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <FeatureCarousel />
      </motion.div>
    </section>
  );
}

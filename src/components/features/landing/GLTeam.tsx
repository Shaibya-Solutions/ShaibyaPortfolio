"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TEAM_MEMBERS } from "@/data/team";
import {
  AnimatedTeamShowcase,
  type TeamTestimonial,
} from "@/components/ui/testimonial";

/* ───── Map team data → AnimatedTeamShowcase format ───── */
const teamShowcaseData: TeamTestimonial[] = TEAM_MEMBERS.map((m) => ({
  name: m.codename,
  designation: `${m.dayJob} · ${m.location}`,
  quote: m.hoverQuote,
  src:
    m.image ||
    `https://api.dicebear.com/7.x/bottts/png?seed=${m.codename.replace(/\s+/g, "")}&size=300&backgroundColor=0f172a`,
}));

export default function GLTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="team"
      className="relative bg-white py-28 lg:py-40 overflow-hidden"
    >
      {/* Subtle animated grid background — 10% opacity */}
      <style>
        {`
          @keyframes team-grid-drift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .team-animated-grid {
            width: 200%;
            height: 200%;
            background-image:
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: 3rem 3rem;
            animation: team-grid-drift 40s linear infinite alternate;
          }
        `}
      </style>
      <div className="team-animated-grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* ───── Section Header ───── */}
        <div className="mb-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="accent-line w-12 mb-10 origin-left"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-5"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#111827] leading-[1.15]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            The people behind{" "}
            <span className="heading-gradient">Shaibya.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-[#6B7280] max-w-md"
          >
            A lean crew of specialists who ship real impact — meet the minds
            building Shaibya.
          </motion.p>
        </div>

        {/* ───── Animated Showcase Carousel ───── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatedTeamShowcase testimonials={teamShowcaseData} autoplay />
        </motion.div>


      </div>
    </section>
  );
}

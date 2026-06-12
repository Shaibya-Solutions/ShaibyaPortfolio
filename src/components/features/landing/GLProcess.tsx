"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageCircle, PenTool, Code2, Rocket,
  HeadphonesIcon, BarChart3,
} from "lucide-react";
import dynamic from "next/dynamic";

const RadialOrbitalTimeline = dynamic(
  () => import("@/components/ui/radial-orbital-timeline"),
  { ssr: false, loading: () => <div className="h-[700px] bg-[#F8FAFB]" /> }
);

/* ── Shaibya Solutions process data ── */
const processTimelineData = [
  {
    id: 1,
    title: "Discovery",
    date: "Week 1",
    content:
      "A 30-minute WhatsApp conversation to understand your business, pain points, and what success looks like for you. We identify quick wins and long-term goals.",
    category: "Planning",
    icon: MessageCircle,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Week 1–2",
    content:
      "We map out the architecture, wireframes, and user flows. You see exactly what we're building before a single line of code is written — no surprises.",
    category: "Design",
    icon: PenTool,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Build",
    date: "Week 2–4",
    content:
      "Agile sprints with regular check-ins. You're never in the dark — we ship incrementally, gather your feedback, and iterate fast.",
    category: "Development",
    icon: Code2,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Launch",
    date: "Week 4–5",
    content:
      "We deploy, configure domains, and run final QA. Your system goes live — optimized for performance, SEO, and real-world usage.",
    category: "Launch",
    icon: Rocket,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 45,
  },
  {
    id: 5,
    title: "Support",
    date: "Ongoing",
    content:
      "30 days of free post-launch support included. We monitor performance, fix issues, and provide training for your team.",
    category: "Support",
    icon: HeadphonesIcon,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 6,
    title: "Optimize",
    date: "Ongoing",
    content:
      "Analytics-driven improvements. We track what's working, automate more workflows, and help you scale — from lead capture to full CRM integration.",
    category: "Growth",
    icon: BarChart3,
    relatedIds: [5, 1],
    status: "pending" as const,
    energy: 15,
  },
];

export default function GLProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 lg:pt-40 pb-8">
        {/* Header */}
        <div className="mb-4 max-w-xl">
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
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#111827] leading-[1.15]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            From conversation to <span className="heading-gradient">live system.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm text-[#9CA3AF] mt-4"
          >
            Click any node to explore each phase of our process
          </motion.p>
        </div>
      </div>

      {/* Orbital Timeline */}
      <RadialOrbitalTimeline timelineData={processTimelineData} />
    </section>
  );
}

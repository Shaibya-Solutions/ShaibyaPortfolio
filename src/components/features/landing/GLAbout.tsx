"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import {
  MessageCircle, PenTool, Code2, Rocket,
  HeadphonesIcon, BarChart3,
} from "lucide-react";

const ThreeDGallery = dynamic(
  () => import("@/components/ui/three-d-gallery"),
  { ssr: false }
);

const RadialOrbitalTimeline = dynamic(
  () => import("@/components/ui/radial-orbital-timeline"),
  { ssr: false, loading: () => <div className="h-[500px]" /> }
);

/* ───── Screenshots for 3D carousel ───── */
const carouselImages = [
  "/images/screenshots/client-1.png",
  "/images/screenshots/client-2.png",
  "/images/screenshots/client-3.png",
  "/images/screenshots/client-4.png",
  "/images/screenshots/client-5.png",
  "/images/screenshots/client-6.png",
];

/* ───── Process timeline data ───── */
const processTimelineData = [
  {
    id: 1, title: "Discovery", date: "Week 1",
    content: "A 30-minute WhatsApp conversation to understand your business, pain points, and what success looks like for you. We identify quick wins and long-term goals.",
    category: "Planning", icon: MessageCircle, relatedIds: [2], status: "completed" as const, energy: 100,
  },
  {
    id: 2, title: "Design", date: "Week 1–2",
    content: "We map out the architecture, wireframes, and user flows. You see exactly what we're building before a single line of code is written — no surprises.",
    category: "Design", icon: PenTool, relatedIds: [1, 3], status: "completed" as const, energy: 90,
  },
  {
    id: 3, title: "Build", date: "Week 2–4",
    content: "Agile sprints with regular check-ins. You're never in the dark — we ship incrementally, gather your feedback, and iterate fast.",
    category: "Development", icon: Code2, relatedIds: [2, 4], status: "in-progress" as const, energy: 70,
  },
  {
    id: 4, title: "Launch", date: "Week 4–5",
    content: "We deploy, configure domains, and run final QA. Your system goes live — optimized for performance, SEO, and real-world usage.",
    category: "Launch", icon: Rocket, relatedIds: [3, 5], status: "pending" as const, energy: 45,
  },
  {
    id: 5, title: "Support", date: "Ongoing",
    content: "30 days of free post-launch support included. We monitor performance, fix issues, and provide training for your team.",
    category: "Support", icon: HeadphonesIcon, relatedIds: [4, 6], status: "pending" as const, energy: 30,
  },
  {
    id: 6, title: "Optimize", date: "Ongoing",
    content: "Analytics-driven improvements. We track what's working, automate more workflows, and help you scale — from lead capture to full CRM integration.",
    category: "Growth", icon: BarChart3, relatedIds: [5, 1], status: "pending" as const, energy: 15,
  },
];

/* ───── Timeline ───── */
const timeline = [
  { year: "2022", event: "Founded in Nagpur with a 3-person team" },
  { year: "2023", event: "Shipped CoalTrack AI — first major automation project" },
  { year: "2023", event: "Expanded to Noida with full-stack engineering hub" },
  { year: "2024", event: "FitManage 360 scaled client from 120 → 350 members" },
  { year: "2024", event: "VIMS Hospital digital suite launched" },
  { year: "2025", event: "Texas office established — serving North America" },
  { year: "2025", event: "10+ AI-powered products in production" },
];



/* ───── Main section ───── */
export default function GLAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeProcessId, setActiveProcessId] = useState<number | null>(null);

  return (
    <section ref={ref} id="about" className="relative bg-white overflow-hidden">

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-16">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9]"
          >
            Our Story
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#111827] hover:text-[#0ea5e9] transition-colors"
            >
              View all work
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Two-column: headline left, 3D carousel right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — headline + copy + stats */}
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-[#111827] leading-[1.08] mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Ahead of the curve,
              <br />
              <span className="heading-gradient italic font-normal">always.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[15px] text-[#6B7280] leading-[1.8] max-w-md mb-10"
            >
              A technology company born in Nagpur, built for the world.
              AI, full-stack, mobile — all under one roof.
            </motion.p>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-8 pb-10 border-b border-[#E5E7EB]"
            >
              {[
                { value: "42%", label: "Avg efficiency gain" },
                { value: "10+", label: "AI products shipped" },
                { value: "2", label: "Countries" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-[#111827]" style={{ fontFamily: "var(--font-syne)" }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D carousel */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <ThreeDGallery
              images={carouselImages}
              imageWidth={220}
              imageHeight={138}
              rotateSpeed={18}
              pauseOnHover={true}
              translateZ={260}
              borderRadius={12}
              showBackface={true}
              width={480}
              height={360}
            />
          </motion.div>
        </div>

      </div>

      {/* ─── Story Scroll ─── */}
      <FlowArt aria-label="Our Story — Shaibya Solutions">

        {/* 01 — Origin */}
        <FlowSection
          aria-label="Origin — How It Started"
          style={{ backgroundColor: '#0ea5e9', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — Origin</p>
          <hr className="my-[2vw] border-t border-white/30" />
          <div>
            <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}>
              Built<br />For<br />Everyone.
            </h2>
          </div>
          <hr className="my-[2vw] border-t border-white/30" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed opacity-90">
            Shaibya Solutions was founded on a single belief — that intelligent,
            beautifully-crafted software shouldn't be reserved for big corporations.
            We started in Nagpur to close the gap between ambitious businesses and
            the technology they deserved.
          </p>
        </FlowSection>

        {/* 02 — Journey */}
        <FlowSection
          aria-label="Journey — Our Milestones"
          style={{ backgroundColor: '#022648', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — Journey</p>
          <hr className="my-[2vw] border-t border-white/20" />
          <div>
            <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight text-white"
              style={{ fontFamily: 'var(--font-syne)' }}>
              Coal<br />To<br />Code.
            </h2>
          </div>
          <hr className="my-[2vw] border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed opacity-80">
            Our first project automated billing for a coal distributor — turning a
            7-day manual process into a 4-hour AI workflow. That single win proved
            our thesis: the right technology can transform any industry.
          </p>
          <hr className="my-[2vw] border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            {[
              { label: '42%', desc: 'Average efficiency gain across all client projects.' },
              { label: '167%', desc: 'Average ROI growth from our digital solutions.' },
              { label: '10+', desc: 'AI-powered products live in production today.' },
            ].map((s) => (
              <div key={s.label} className="min-w-[160px] flex-1">
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#0ea5e9]">{s.label}</p>
                <p className="text-[clamp(0.85rem,1.3vw,1rem)] leading-relaxed opacity-70">{s.desc}</p>
              </div>
            ))}
          </div>
          <hr className="my-[2vw] border-t border-white/20" />
          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed opacity-80">
            From coal yards to hospital wards — we've shipped everywhere.
          </p>
        </FlowSection>

        {/* 03 — Values */}
        <FlowSection
          aria-label="Values — What We Stand For"
          style={{ backgroundColor: '#F8FAFB', color: '#111827' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]">03 — Values</p>
          <hr className="my-[2vw] border-t border-black/10" />
          <div>
            <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}>
              Ship.<br />Measure.<br />Iterate.
            </h2>
          </div>
          <hr className="my-[2vw] border-t border-black/10" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed text-[#6B7280]">
            We believe in radical transparency — our clients see every sprint,
            every decision, every tradeoff. No black boxes. No surprises on launch day.
          </p>
          <hr className="my-[2vw] border-t border-black/10" />
          <div className="flex flex-wrap gap-[3vw]">
            {[
              { label: 'Transparency', desc: 'Every sprint, every decision visible to our clients. No black boxes.' },
              { label: 'Ownership', desc: 'We measure success by business outcomes — not feature counts.' },
              { label: 'Craftsmanship', desc: 'Great software is both functional and beautiful — built to last.' },
            ].map((v) => (
              <div key={v.label} className="min-w-[180px] flex-1">
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#111827]">{v.label}</p>
                <p className="text-[clamp(0.85rem,1.3vw,1rem)] leading-relaxed text-[#9CA3AF]">{v.desc}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        {/* 04 — Culture */}
        <FlowSection
          aria-label="Culture — How We Work"
          style={{ backgroundColor: '#0a1628', color: '#fff' }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between shrink-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]">04 — How We Work</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">From conversation to live system.</p>
          </div>
          <hr className="border-t border-white/10 shrink-0" />

          {/* Two-column layout: text left, orbital right */}
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-0">

            {/* Left — large text */}
            <div className="lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-12 shrink-0 py-8 lg:py-0">
              <h2
                className="text-[clamp(3.5rem,7vw,8rem)] font-bold leading-[0.85] uppercase tracking-tight text-white"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                From<br />Idea<br />To<br />Launch.
              </h2>
              <p className="mt-8 text-[clamp(0.95rem,1.5vw,1.15rem)] text-white/50 max-w-[36ch] leading-relaxed">
                Six phases. Every project follows the same proven process —
                from a 30-minute discovery call to a live, optimised system.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { label: 'Discovery', id: 1 },
                  { label: 'Design', id: 2 },
                  { label: 'Build', id: 3 },
                  { label: 'Launch', id: 4 },
                  { label: 'Support', id: 5 },
                  { label: 'Optimize', id: 6 },
                ].map((step) => {
                  const isActive = activeProcessId === step.id;
                  return (
                    <span
                      key={step.label}
                      className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300"
                      style={{ color: isActive ? '#0ea5e9' : 'rgba(255,255,255,0.30)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                        style={{ background: isActive ? '#0ea5e9' : 'rgba(255,255,255,0.20)' }}
                      />
                      {step.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right — orbital timeline */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
              <RadialOrbitalTimeline
                timelineData={processTimelineData}
                onActiveChange={setActiveProcessId}
              />
            </div>

          </div>
        </FlowSection>

      </FlowArt>

    </section>
  );
}

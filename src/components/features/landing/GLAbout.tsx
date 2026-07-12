"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  MessageCircle, PenTool, Code2, Rocket,
  HeadphonesIcon, BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

/* ───── Per-step content ───── */
const stepData = [
  {
    id: 1,
    bg: "#0ea5e9",
    dark: true,
    accentLabel: "#ffffff",      // card labels on blue bg
    accentDot: "rgba(255,255,255,0.5)",
    label: "01 — Discovery",
    right: "Our Core Process",
    heading: "START WITH A CONVERSATION.",
    body: "A 30-minute WhatsApp call is all it takes. We listen first — understanding your business, your pain points, and what success looks like. No decks, no pitches. Just an honest conversation.",
    cards: [
      { label: "Free Audit", desc: "Zero-commitment discovery call to map your workflow." },
      { label: "30 mins", desc: "That's all it takes to get a clear picture." },
      { label: "Quick Wins", desc: "We identify the highest-impact changes immediately." },
    ],
    orbitalId: 1,
  },
  {
    id: 2,
    bg: "#F8FAFB",
    dark: false,
    accentLabel: "#0ea5e9",
    accentDot: "#0ea5e9",
    label: "02 — Design",
    right: "Blueprint Before Build",
    heading: "SEE IT BEFORE WE BUILD IT.",
    body: "We map out architecture, wireframes, and user flows before writing a single line of code. You get full visibility into exactly what we're building — no surprises, no scope creep.",
    cards: [
      { label: "Wireframes", desc: "Every screen laid out and approved before development." },
      { label: "Architecture", desc: "Tech stack and data structure decided upfront." },
      { label: "No Surprises", desc: "You sign off on design before we touch code." },
    ],
    orbitalId: 2,
  },
  {
    id: 3,
    bg: "#022648",
    dark: true,
    accentLabel: "#38bdf8",
    accentDot: "#38bdf8",
    label: "03 — Build",
    right: "Agile Sprints",
    heading: "BUILT FAST. BUILT RIGHT.",
    body: "Agile sprints with regular check-ins. You're never in the dark — we ship incrementally, gather your feedback, and iterate fast. Code reviews, testing, and quality gates at every step.",
    cards: [
      { label: "2–4 Weeks", desc: "Most projects built and ready for review in under a month." },
      { label: "Agile", desc: "Weekly demos so you always know the exact progress." },
      { label: "QA Built-in", desc: "Testing happens throughout — not just at the end." },
    ],
    orbitalId: 3,
  },
  {
    id: 4,
    bg: "#0ea5e9",
    dark: true,
    accentLabel: "#ffffff",
    accentDot: "rgba(255,255,255,0.5)",
    label: "04 — Launch",
    right: "Go Live",
    heading: "SHIP IT. MAKE IT COUNT.",
    body: "We deploy, configure domains, and run final QA. Your system goes live — optimized for performance, SEO, and real-world usage. Handover includes full documentation and team training.",
    cards: [
      { label: "Zero Downtime", desc: "Staged rollouts ensure a smooth go-live every time." },
      { label: "SEO Ready", desc: "Performance-optimised and search-engine-indexed from day one." },
      { label: "Full Handover", desc: "Docs, training, and admin access — all yours." },
    ],
    orbitalId: 4,
  },
  {
    id: 5,
    bg: "#F8FAFB",
    dark: false,
    accentLabel: "#0ea5e9",
    accentDot: "#0ea5e9",
    label: "05 — Support",
    right: "Always There",
    heading: "WE DON'T DISAPPEAR AFTER LAUNCH.",
    body: "30 days of free post-launch support included with every project. We monitor performance, fix issues fast, and provide hands-on training so your team is fully self-sufficient.",
    cards: [
      { label: "30 Days", desc: "Free post-launch support included in every engagement." },
      { label: "Monitoring", desc: "Uptime and performance tracked from our end continuously." },
      { label: "Training", desc: "Your team gets hands-on walkthroughs until they're confident." },
    ],
    orbitalId: 5,
  },
  {
    id: 6,
    bg: "#022648",
    dark: true,
    accentLabel: "#38bdf8",
    accentDot: "#38bdf8",
    label: "06 — Optimize",
    right: "Continuous Growth",
    heading: "ALWAYS OPTIMIZING.",
    body: "Analytics-driven improvements after every launch. We track what's working, automate more workflows, and help you scale — from lead capture to full CRM integration. Growth never stops.",
    cards: [
      { label: "Analytics", desc: "Every system tracked and measured from day one." },
      { label: "Automation", desc: "We keep adding automation layers post-launch." },
      { label: "Scale", desc: "Built to grow — from 1 user to 10,000 and beyond." },
    ],
    orbitalId: 6,
  },
];

/* ───── Main section ───── */
export default function GLAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const storySectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!storySectionRef.current) return;
    ScrollTrigger.refresh();

    const trigger = ScrollTrigger.create({
      trigger: storySectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        let id = 1;
        if (p < 0.17) id = 1;
        else if (p < 0.34) id = 2;
        else if (p < 0.50) id = 3;
        else if (p < 0.67) id = 4;
        else if (p < 0.84) id = 5;
        else id = 6;
        setActiveStepId(id);
      },
    });

    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { trigger.kill(); clearTimeout(timer); };
  }, { scope: storySectionRef });

  const step = stepData[activeStepId - 1];

  return (
    <section ref={ref} id="about" className="relative bg-[#020817]">

      {/* ─── Pinned scroll section ─── */}
      <section
        ref={storySectionRef}
        className="relative h-[600vh] w-full"
        style={{ backgroundColor: step.bg, transition: "background-color 0.8s ease" }}
      >
        <div
          className="sticky top-0 h-screen w-full flex flex-col justify-between px-[4vw] pt-[clamp(4.5rem,7vw,5.5rem)] pb-[4vw] overflow-hidden"
          style={{ color: step.dark ? "#ffffff" : "#111827", transition: "color 0.8s ease" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between shrink-0 mb-4">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500"
              style={{ color: step.dark ? "#ffffff" : "#0ea5e9" }}
            >
              {step.label}
            </p>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500"
              style={{ color: step.dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)" }}
            >
              {step.right}
            </p>
          </div>
          <hr
            className="border-t shrink-0 transition-colors duration-500"
            style={{ borderColor: step.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)" }}
          />

          {/* Split */}
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 items-center justify-center gap-8 lg:gap-16">

            {/* Left */}
            <div className="lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-12 shrink-0 w-full">
              <motion.h2
                key={activeStepId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="font-bold leading-[0.92] uppercase tracking-tight mb-4"
                style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2rem, 4vw, 3.8rem)", color: step.dark ? "#ffffff" : "#111827" }}
              >
                {step.heading}
              </motion.h2>

              <p
                className="max-w-[48ch] leading-relaxed mb-6 font-medium"
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.15rem)", color: step.dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)" }}
              >
                {step.body}
              </p>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 w-full max-w-md">
                {step.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="sm:min-w-[100px] sm:flex-1 border p-3 rounded-xl"
                    style={{
                      borderColor: step.dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.1)",
                      backgroundColor: step.dark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.04)",
                    }}
                  >
                    <p className="mb-1 text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight"
                      style={{ color: step.accentLabel }}>{card.label}</p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: step.dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}
                    >
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — orbital */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden w-full min-h-[380px] sm:min-h-0">
              <RadialOrbitalTimeline
                timelineData={processTimelineData}
                activeId={step.orbitalId}
                activeStepId={activeStepId}
                onActiveChange={() => { }}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

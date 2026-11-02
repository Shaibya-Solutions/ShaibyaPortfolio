"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
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
    content: "Every successful partnership begins with understanding. In a 30-minute WhatsApp call, we take the time to learn about your business, the challenges you face, and the outcomes you want to achieve. No presentations or sales pitches—just a focused conversation to explore how we can create meaningful value together.",
    category: "Planning", icon: MessageCircle, relatedIds: [2], status: "completed" as const, energy: 100,
  },
  {
    id: 2, title: "Design", date: "Week 1–2",
    content: "We map out the architecture, wireframes, and user flows. You see exactly what we're building before a single line of code is written — no surprises.",
    category: "Design", icon: PenTool, relatedIds: [1, 3], status: "completed" as const, energy: 90,
  },
  {
    id: 3, title: "Build", date: "Week 2–4",
    content: "We execute in focused sprints with complete transparency, delivering working software incrementally and refining it through continuous feedback. Every release is backed by rigorous engineering standards, thorough testing, and uncompromising quality assurance.",
    category: "Development", icon: Code2, relatedIds: [2, 4], status: "in-progress" as const, energy: 70,
  },
  {
    id: 4, title: "Launch", date: "Week 4–5",
    content: "We deploy, configure domains, and run final QA. Your system goes live — optimized for performance, SEO, and real-world usage.",
    category: "Launch", icon: Rocket, relatedIds: [3, 5], status: "pending" as const, energy: 45,
  },
  {
    id: 5, title: "Support", date: "Ongoing",
    content: "WE DON'T DISAPPEAR AFTER LAUNCH. 30 days of free post-launch support included with every project. We monitor performance, fix issues fast, and provide hands-on training so your team is fully self-sufficient.",
    category: "Support", icon: HeadphonesIcon, relatedIds: [4, 6], status: "pending" as const, energy: 30,
  },
  {
    id: 6, title: "Optimize", date: "Ongoing",
    content: "Launch is only the beginning. We use data and analytics to identify opportunities for continuous improvement, streamline workflows, and enhance performance. As your business evolves, we help scale your technology—from process automation to seamless CRM integration.",
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
    heading: "UNDERSTANDING FIRST.",
    body: "Every successful partnership begins with understanding. In a 30-minute WhatsApp call, we take the time to learn about your business, the challenges you face, and the outcomes you want to achieve. No presentations or sales pitches—just a focused conversation to explore how we can create meaningful value together.",
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
    heading: "BUILD.",
    body: "We execute in focused sprints with complete transparency, delivering working software incrementally and refining it through continuous feedback. Every release is backed by rigorous engineering standards, thorough testing, and uncompromising quality assurance.",
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
    heading: "OPTIMIZE.",
    body: "Launch is only the beginning. We use data and analytics to identify opportunities for continuous improvement, streamline workflows, and enhance performance. As your business evolves, we help scale your technology—from process automation to seamless CRM integration.",
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
  const [activeStepId, setActiveStepId] = useState(1);
  const [largeViewport, setLargeViewport] = useState(false);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const immersive = largeViewport && !reduceMotion;
  const storySectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px) and (min-height: 800px)");
    const update = () => setLargeViewport(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useGSAP(() => {
    if (!immersive || !storySectionRef.current) return;
    const trigger = ScrollTrigger.create({
      id: "homepage-process",
      trigger: storySectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setActiveStepId(Math.min(6, Math.floor(self.progress * 6) + 1)),
    });
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(refresh); trigger.kill(); };
  }, { scope: storySectionRef, dependencies: [immersive], revertOnUpdate: true });

  const selectStep = (id: number | null) => {
    if (id === null) return;
    setActiveStepId(id);
    const element = storySectionRef.current;
    if (immersive && element) {
      const trigger = ScrollTrigger.getById("homepage-process");
      trigger?.refresh();
      const start = trigger?.start ?? element.getBoundingClientRect().top + window.scrollY;
      const distance = trigger ? trigger.end - trigger.start : element.offsetHeight - window.innerHeight;
      const destination = start + ((id - 0.5) / stepData.length) * distance;
      if (lenis) lenis.scrollTo(destination, { duration: 0.6 });
      else window.scrollTo({ top: destination, behavior: "smooth" });
    }
  };

  const step = stepData[activeStepId - 1];

  return (
    <section id="about" className="relative bg-[#020817]">
      <section
        ref={storySectionRef}
        data-process-section
        data-process-layout={immersive ? "immersive" : "compact"}
        className={immersive ? "relative h-[600svh] w-full" : "relative w-full"}
        style={{ backgroundColor: step.bg, transition: "background-color 0.6s ease" }}
      >
        <div
          data-process-panel
          className={immersive
            ? "sticky top-0 h-[100svh] w-full flex flex-col px-[4vw] pt-36 pb-8"
            : "w-full px-6 lg:px-12 py-16 lg:py-20"}
          style={{ color: step.dark ? "#ffffff" : "#111827" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-5 shrink-0" style={{ borderColor: step.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)" }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em]">{step.label}</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">{step.right}</p>
          </div>
          <nav aria-label="Our process stages" className="flex flex-wrap gap-2 mb-5 shrink-0">
            {processTimelineData.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectStep(item.id)}
                aria-pressed={activeStepId === item.id}
                className="rounded-full border px-3 py-2 text-xs font-semibold transition-colors"
                style={{ color: activeStepId === item.id ? "#0a1628" : "inherit", background: activeStepId === item.id ? "#ffffff" : "transparent", borderColor: step.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.2)" }}
              >
                {item.title}
              </button>
            ))}
          </nav>

          <div className={`grid lg:grid-cols-2 items-center gap-8 lg:gap-10 ${immersive ? "flex-1 min-h-0" : ""}`}>
            <div data-process-copy className="min-w-0">
              <motion.h2
                key={activeStepId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="font-bold leading-[0.98] uppercase tracking-tight mb-5"
                style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.8rem, 3.4vw, 3.5rem)", color: step.dark ? "#ffffff" : "#111827" }}
              >
                {step.heading}
              </motion.h2>
              <p className="max-w-[48ch] text-sm xl:text-base leading-relaxed mb-6 font-medium opacity-90">{step.body}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {step.cards.map((card) => (
                  <div key={card.label} className="border p-3 rounded-xl" style={{ borderColor: step.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)", background: step.dark ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.03)" }}>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: step.accentLabel }}>{card.label}</p>
                    <p className="text-xs leading-relaxed opacity-75">{card.desc}</p>
                  </div>
                ))}
              </div>
              <a
                href={`https://wa.me/917498341146?text=${encodeURIComponent(`Hi Shaibya Solutions, I'd like to discuss the ${processTimelineData[activeStepId - 1].title.toLowerCase()} stage of a project.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                Discuss your project <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className={immersive ? "h-full min-h-0 min-w-0" : "h-[480px] sm:h-[500px] lg:h-[clamp(400px,calc(100svh_-_240px),500px)] min-w-0"}>
              <RadialOrbitalTimeline
                timelineData={processTimelineData}
                activeId={step.orbitalId}
                activeStepId={activeStepId}
                onActiveChange={selectStep}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

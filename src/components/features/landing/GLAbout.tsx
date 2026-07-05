"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CipherText } from "@/components/ui/cipher-text";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  MessageCircle, PenTool, Code2, Rocket,
  HeadphonesIcon, BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ThreeDGallery = dynamic(
  () => import("@/components/ui/three-d-gallery"),
  { ssr: false }
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

/* ───── Matching client website links ───── */
const carouselLinks = [
  "https://vimsnagpur.com",                   // client-1 → VIMS Hospital
  "https://www.sonarkillatours.in",            // client-2 → Sonar Killa Tours
  "https://www.touchwoodfurnitech.com",        // client-3 → Touchwood Furnitech
  "https://www.revolutionfitnesss.in",         // client-4 → Revolution Fitness
  "https://www.mginfraproperties.in",          // client-5 → MG Infra Properties
  "https://www.snyypit.com",                   // client-6 → Snyppit
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
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const storySectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!storySectionRef.current) return;

    // Refresh immediately to detect layout correctly
    ScrollTrigger.refresh();

    const trigger = ScrollTrigger.create({
      trigger: storySectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        let stepId = 1;

        if (p <= 0.25) {
          stepId = 1;
        } else if (p <= 0.5) {
          stepId = 2;
        } else if (p <= 0.75) {
          stepId = 3;
        } else {
          stepId = 4;
        }

        setActiveStepId(stepId);
      }
    });

    // Refresh again after a brief timeout to account for dynamic mounting layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      trigger.kill();
      clearTimeout(timer);
    };
  }, { scope: storySectionRef });

  return (
    <section ref={ref} id="about" className="relative bg-[#020817]">

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-16 relative z-10">
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
              className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 hover:text-[#0ea5e9] transition-colors"
            >
              View all work
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Mockup layout: full width layout, centered text, globe below, description and button side-by-side underneath */}
        <div className="w-full flex flex-col items-center py-10 relative z-10">
          {/* Custom radial-gradient overlay covering the section */}
          <div className="absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(#38bdf80d_1px,#020817_1px)] bg-size-[20px_20px] opacity-60"></div>
          
          <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto text-center px-4">
            {/* Massive bold heading */}
            <h2 className="text-6xl sm:text-8xl md:text-[8rem] font-black bg-gradient-to-b from-[#ffffff] via-[#93c5fd] to-[#020817] bg-clip-text text-transparent leading-[100%] tracking-tighter uppercase mb-8" style={{ fontFamily: "var(--font-syne)" }}>
              'Ahead of the curve'
            </h2>
            


            {/* Bottom row: description and view work button */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 w-full text-left border-t border-slate-800/60 pt-8 max-w-4xl mx-auto">
              {/* Description Block */}
              <div className="flex-1">
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                  A technology company born in Nagpur, built for the world.
                  AI, full-stack, mobile — all under one roof.
                </p>
              </div>

              {/* View All Work Button */}
              <div className="shrink-0 w-full md:w-auto flex justify-center">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 px-8 py-4.5 bg-[#f97316] text-white font-bold rounded-full shadow-lg shadow-orange-500/25 hover:bg-[#ea580c] hover:shadow-orange-500/35 hover:scale-105 transition-all duration-300 text-sm sm:text-base group"
                >
                  <span>View all work</span>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#f97316] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* ─── Pinned Story Scroll Section ─── */}
      <section
        ref={storySectionRef}
        className="relative h-[400vh] w-full"
        style={{
          backgroundColor:
            activeStepId === 1 ? '#0ea5e9' :
            activeStepId === 2 ? '#022648' :
            activeStepId === 3 ? '#F8FAFB' : '#0a1628',
          transition: 'background-color 0.8s ease',
        }}
      >
        {(() => {
          const isDarkTheme = activeStepId !== 3;
          return (
            <div
              className="flow-art-container sticky top-0 h-screen w-full flex flex-col justify-between px-[4vw] pt-[clamp(2rem,4vw,4vw)] pb-[4vw] overflow-hidden"
              style={{
                color: isDarkTheme ? '#ffffff' : '#111827',
                transition: 'color 0.8s ease',
                transformOrigin: 'bottom left',
              }}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between shrink-0 mb-4">
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500"
                  style={{
                    color:
                      activeStepId === 1 || activeStepId === 2 ? '#ffffff' :
                      activeStepId === 3 ? '#0ea5e9' : '#0ea5e9'
                  }}
                >
                  {activeStepId === 1 && "01 — Origin"}
                  {activeStepId === 2 && "02 — Journey"}
                  {activeStepId === 3 && "03 — Values"}
                  {activeStepId === 4 && `04 — How We Work (${processTimelineData.find(item => item.id === activePhaseId)?.title} - Phase ${activePhaseId})`}
                </p>
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500"
                  style={{
                    color:
                      activeStepId === 1 || activeStepId === 2 ? 'rgba(255,255,255,0.7)' :
                      activeStepId === 3 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)'
                  }}
                >
                  {activeStepId <= 3 ? "Our Core Identity" : "From conversation to live system."}
                </p>
              </div>
              <hr
                className="border-t shrink-0 transition-colors duration-500"
                style={{
                  borderColor:
                    activeStepId === 1 || activeStepId === 2 ? 'rgba(255,255,255,0.2)' :
                    activeStepId === 3 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
                }}
              />

              {/* Core split screen container */}
              <div className="flex flex-col lg:flex-row flex-1 min-h-0 items-center justify-center gap-8 lg:gap-16">
                
                {/* Left Column: Info card content */}
                <div className="lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-12 shrink-0 w-full">
                  {/* Step Title */}
                  <motion.h2
                    key={activeStepId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-[clamp(2.5rem,5.5vw,6rem)] font-bold leading-[0.9] uppercase tracking-tight mb-6 transition-colors duration-500"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      color: isDarkTheme ? '#ffffff' : '#111827',
                    }}
                  >
                    {activeStepId === 1 && "BUILT FOR EVERYONE."}
                    {activeStepId === 2 && "COAL TO CODE."}
                    {activeStepId === 3 && "SHIP. MEASURE. ITERATE."}
                    {activeStepId === 4 && "FROM IDEA TO LAUNCH."}
                  </motion.h2>

                  {/* Step Subtitle / Content */}
                  <p
                    className="text-[clamp(1.05rem,1.8vw,1.4rem)] max-w-[50ch] leading-relaxed mb-8 transition-colors duration-500 font-medium"
                    style={{
                      color:
                        activeStepId === 1 || activeStepId === 2 ? 'rgba(255,255,255,0.9)' :
                        activeStepId === 3 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)'
                    }}
                  >
                    {activeStepId === 1 && "Shaibya Solutions was founded on a single belief — that intelligent, beautifully-crafted software shouldn't be reserved for big corporations. We started in Nagpur to close the gap between ambitious businesses and the technology they deserved."}
                    {activeStepId === 2 && "Our first project automated billing for a coal distributor — turning a 7-day manual process into a 4-hour AI workflow. That single win proved our thesis: the right technology can transform any industry."}
                    {activeStepId === 3 && "We believe in radical transparency — our clients see every sprint, every decision, every tradeoff. No black boxes. No surprises on launch day."}
                    {activeStepId === 4 && "Six phases. Every project follows the same proven process — from a 30-minute discovery call to a live, optimised system."}
                  </p>

                  {/* Extra grids and info based on Step */}
                  <div className="w-full max-w-md">
                    {/* Step 2 Stats Grid */}
                    {activeStepId === 2 && (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {[
                          { label: '42%', desc: 'Average efficiency gain across projects.' },
                          { label: '167%', desc: 'Average ROI growth from solutions.' },
                          { label: '10+', desc: 'AI-powered products live.' },
                        ].map((s, idx) => (
                          <div
                            key={idx}
                            className="min-w-[120px] flex-1 border p-4 rounded-xl transition-all duration-500"
                            style={{
                              borderColor: 'rgba(255,255,255,0.1)',
                              backgroundColor: 'rgba(255,255,255,0.03)',
                            }}
                          >
                            <p className="mb-1 text-base font-bold uppercase tracking-wider text-[#0ea5e9]">{s.label}</p>
                            <p className="text-xs leading-relaxed text-slate-300">{s.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Step 3 Values Grid */}
                    {activeStepId === 3 && (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {[
                          { label: 'Transparency', desc: 'Every sprint, every decision visible. No black boxes.' },
                          { label: 'Ownership', desc: 'We measure success by outcomes — not feature counts.' },
                          { label: 'Craftsmanship', desc: 'Functional and beautiful — built to last.' },
                        ].map((v, idx) => (
                          <div
                            key={idx}
                            className="min-w-[130px] flex-1 border p-4 rounded-xl transition-all duration-500"
                            style={{
                              borderColor: 'rgba(0,0,0,0.12)',
                              backgroundColor: 'rgba(0,0,0,0.03)',
                            }}
                          >
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#0ea5e9]">{v.label}</p>
                            <p className="text-xs leading-relaxed text-gray-600">{v.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Step 4 Phase Card Display */}
                    {activeStepId === 4 && (
                      (() => {
                        const activeStep = processTimelineData.find(item => item.id === activePhaseId) || processTimelineData[0];
                        return (
                          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl w-full relative overflow-hidden transition-all duration-300">
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
                            
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
                                {activeStep.date}
                              </span>
                              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                Phase 0{activeStep.id}
                              </span>
                            </div>
                            
                            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide mb-2">
                              {activeStep.title}
                            </h3>
                            
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed min-h-[72px]">
                              {activeStep.content}
                            </p>
                          </div>
                        );
                      })()
                    )}
                  </div>
                  
                  {/* Step indicators row: Rendered clean at the bottom left */}
                  {activeStepId === 4 && (
                    <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 relative z-10 border-t pt-5"
                      style={{ borderColor: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                    >
                      {[
                        { label: 'Discovery', id: 1 },
                        { label: 'Design', id: 2 },
                        { label: 'Build', id: 3 },
                        { label: 'Launch', id: 4 },
                        { label: 'Support', id: 5 },
                        { label: 'Optimize', id: 6 },
                      ].map((step) => {
                        const isActive = activePhaseId === step.id;
                        return (
                          <button
                            key={step.label}
                            onClick={() => setActivePhaseId(step.id)}
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:text-[#0ea5e9]"
                            style={{
                              color: isActive
                                ? '#0ea5e9'
                                : isDarkTheme
                                ? 'rgba(255,255,255,0.3)'
                                : 'rgba(0,0,0,0.3)'
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                              style={{
                                background: isActive
                                  ? '#0ea5e9'
                                  : isDarkTheme
                                  ? 'rgba(255,255,255,0.15)'
                                  : 'rgba(0,0,0,0.15)'
                              }}
                            />
                            {step.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column: Orbital Timeline (Constant) */}
                <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden w-full">
                  <RadialOrbitalTimeline
                    timelineData={processTimelineData}
                    activeId={
                      activeStepId === 1 ? 1 :
                      activeStepId === 2 ? 3 :
                      activeStepId === 3 ? 5 :
                      activePhaseId
                    }
                    activeStepId={activeStepId}
                    onActiveChange={(id) => {
                      if (id !== null && activeStepId === 4) {
                        setActivePhaseId(id);
                      }
                    }}
                  />
                </div>

              </div>
            </div>
          );
        })()}
      </section>
    </section>
  );
}

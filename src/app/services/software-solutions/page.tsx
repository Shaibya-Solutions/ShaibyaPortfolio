"use client";

import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import Squares from "@/components/ui/Squares";
import DecryptedText from "@/components/ui/DecryptedText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Carousel3D from "@/components/ui/carousel-3d";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  Smartphone,
  Sparkles,
  ArrowRight,
  Zap,
  Layout,
  Layers,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

// WebGL component — must be dynamically imported with ssr:false to avoid hydration errors
const AbstractTechShape = dynamic(
  () => import("@/components/ui/3d/AbstractTechShape").then(m => ({ default: m.AbstractTechShape })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-sky-200/40 animate-pulse bg-sky-500/5" />
      </div>
    ),
  }
);

const SOLUTIONS = [
  {
    title: "High-Performance Websites",
    description: "Fast, responsive, and SEO-optimized web experiences designed to establish absolute authority. We focus on curated typography, visual layout flow, and micro-interactions.",
    bulletPoints: [
      "Headless CMS & Static Sites (Next.js)",
      "Editorial Design & Visual Excellence",
      "Core Web Vitals Optimization",
      "Interactive Animations (Framer Motion / GSAP)"
    ],
    icon: Globe,
    color: "rgba(14, 165, 233, 0.08)", // subtle blue glow
    accentColor: "#0ea5e9"
  },
  {
    title: "Custom Applications (Web & Mobile)",
    description: "Scalable dashboards, gym managers, custom CRM portals, and mobile systems built on high-performance backends. We eliminate manual overhead with clean, beautiful UX.",
    bulletPoints: [
      "Next.js Customer Portals & SaaS Dashboards",
      "High-Performance Node.js / Serverless API routes",
      "Robust Database Architecture (Postgres, MongoDB)",
      "Cross-Platform Native Mobile Apps"
    ],
    icon: Smartphone,
    color: "rgba(249, 115, 22, 0.08)", // subtle orange glow
    accentColor: "#f97316"
  },
  {
    title: "Out-of-the-Box AI Pipelines",
    description: "Intelligent automation workflows integrating state-of-the-art LLMs, custom OCR document parsers, and smart classification models to completely automate manual bottlenecks.",
    bulletPoints: [
      "AI-Based Billing & Invoice Extraction",
      "Intelligent Data Categorization & Structuring",
      "Custom Assistant Pipelines & Chatbots",
      "Workflow Automation & System Integrations"
    ],
    icon: Cpu,
    color: "rgba(168, 85, 247, 0.08)", // subtle purple glow
    accentColor: "#a855f7"
  }
];

const PRINCIPLES = [
  {
    title: "Simplicity over Bloat",
    description: "We write clean, focused code and eliminate clunky corporate layers. We build features that deliver direct value, keeping systems fast and maintainable.",
    icon: Zap
  },
  {
    title: "Obsession with Detail",
    description: "Every pixel, spacing variable, font weight, and page transition is curated. We believe software should feel extremely premium and tactile.",
    icon: Layout
  },
  {
    title: "Leverage & Impact",
    description: "We don't build software to fill hours. We engineer leverage. Our solutions exist to automate manual labor and drive business metrics.",
    icon: Layers
  }
];

const CAROUSEL_IMAGES = [
  { src: "/images/solutions/coal.png", alt: "CoalTrack AI" },
  { src: "/images/solutions/fitlife.png", alt: "FitManage 360" },
  { src: "/images/solutions/cellcurehub.png", alt: "MediReach Pro" },
  { src: "/images/solutions/vims.png", alt: "VIMS Hospital Website" }
];

export default function SoftwareSolutionsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden font-sans">
      <SiteHeader />

      {/* ══ HERO SECTION (Light theme, animated canvas grid, interactive 3D WebGL shape) ════════════════ */}
      <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Squares
            direction="diagonal"
            speed={0.25}
            borderColor="rgba(15, 23, 42, 0.03)"
            hoverFillColor="rgba(14, 165, 233, 0.04)"
            squareSize={50}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/20 via-transparent to-white" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "opacity, transform" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-8">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Services // Software
                </div>

                <h1 className="font-bold tracking-tight leading-[1.08] mb-8 font-heading text-slate-900 dark:text-white">
                  <span className="text-slate-400 dark:text-slate-500 block text-2xl md:text-3xl font-light tracking-wide uppercase mb-3">
                    Engineering Custom Systems
                  </span>
                  <DecryptedText
                    text="OUT OF THE BOX"
                    animateOn="view"
                    sequential={true}
                    className="text-slate-900 dark:text-white font-bold"
                    parentClassName="block"
                    revealDirection="start"
                    speed={45}
                    maxIterations={15}
                    encryptedClassName="text-[#0ea5e9]"
                  />
                </h1>

                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
                  We reject clunky legacy software and rigid templates. We engineer bespoke websites,
                  scalable custom applications, and automated AI pipelines designed to streamline your business
                  operations, eliminate manual bottlenecks, and accelerate your growth.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider bg-sky-600 text-white transition-all duration-200 hover:scale-105 hover:bg-sky-500 shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 flex items-center gap-2"
                  >
                    Pitch a Project <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="#shipped-systems"
                    className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  >
                    Explore Shipped Work
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right 3D Interactive Component */}
            <div className="lg:col-span-5 relative h-[300px] md:h-[380px] lg:h-[480px] w-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full h-full relative"
              >
                {/* 3D WebGL Shape floating next to the copy */}
                <AbstractTechShape />

                {/* Orbit decoration */}
                <div className="absolute inset-0 rounded-full border border-sky-500/10 pointer-events-none scale-75 animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-0 rounded-full border border-orange-500/5 pointer-events-none scale-90 animate-[spin_60s_linear_infinite_reverse]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3D SCROLL VIEW: SHIPPED SYSTEMS SECTION (Jaw-Dropping Carousel) ════════ */}
      <section id="shipped-systems" className="py-32 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Carousel Copy */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-3 block">
                Interactive Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6 leading-tight">
                Shipped Systems <br />
                in 3D Scroll View
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
                Drag, hover, and rotate our shipped digital products. We build real web systems, custom apps, and automated billing software live in production.
              </p>

              <div className="space-y-4">
                {[
                  "CoalTrack AI — automated OCR data-entry pipelines.",
                  "FitManage 360 — complete gym membership management.",
                  "MediReach Pro — SEO appointment scheduling systems.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-sky-50 dark:bg-sky-950 flex items-center justify-center mt-1 shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-sky-500">
                        <path d="M1.5 4L3.5 6L8.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Drum Carousel Component */}
            <div className="lg:col-span-7 flex items-center justify-center relative overflow-visible py-8 bg-white/40 dark:bg-slate-900/10 border border-slate-100 dark:border-slate-900/20 rounded-4xl">
              <Carousel3D
                images={CAROUSEL_IMAGES}
                autoPlayInterval={3500}
                width={300}
                height={200}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES SECTION (Light spotlight cards with subtle glows) ════ */}
      <section id="solutions" className="py-32 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-3 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
              We Build Solutions That Fuel Growth
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light mt-3">
              Explore the core engineering pillars we deploy to help businesses automate operations and establish digital authority.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-45px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex"
                >
                  <SpotlightCard
                    className="flex flex-col justify-between w-full border-slate-200/80 bg-white/40 hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-900/10 transition-colors p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md"
                    spotlightColor={sol.color as any}
                  >
                    <div>
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 dark:border-slate-850"
                        style={{ background: `linear-gradient(135deg, rgba(248, 250, 252, 0.8), ${sol.color})` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: sol.accentColor }} />
                      </div>

                      <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                        {sol.title}
                      </h3>

                      <p className="text-slate-500 dark:text-slate-400 font-light text-base leading-relaxed mb-8">
                        {sol.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-850 pt-6">
                      <ul className="space-y-3">
                        {sol.bulletPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 font-light">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: sol.accentColor }} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY SECTION (Apple-Inspired Principles) ════════════════ */}
      <section className="py-32 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-3 block">
                Our Standards
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mb-6">
                How We Approach Code & Design
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                We believe that software should be beautiful, clean, and highly useful.
                We combine technical precision with visual craftsmanship to build systems that last.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-12">
              {PRINCIPLES.map((pr, idx) => {
                const Icon = pr.icon;
                return (
                  <motion.div
                    key={pr.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-6 md:gap-8 items-start p-8 rounded-3xl bg-white dark:bg-slate-900/10 border border-slate-100 dark:border-slate-900/60 hover:border-slate-200 dark:hover:border-slate-800/80 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center text-[#0ea5e9] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                        {pr.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed text-base">
                        {pr.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA SECTION ═══════════════════════════════════════════════════ */}
      <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#0ea5e9 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF9F6]/40 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900 p-12 md:p-16 rounded-4xl backdrop-blur-md shadow-sm"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-6 tracking-tight animate-pulse">
              Ready to automate and scale?
            </h2>

            <p className="text-slate-500 dark:text-slate-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Tell us about your manual operations or the product you want to create.
              Our developers will scope the architecture and build an out-of-the-box solution customized for your business.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Start Collaboration <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

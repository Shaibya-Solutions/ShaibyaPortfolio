"use client";

import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import Squares from "@/components/ui/Squares";
import DecryptedText from "@/components/ui/DecryptedText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Carousel3D from "@/components/ui/carousel-3d";
import { AbstractTechShape } from "@/components/ui/3d/AbstractTechShape";
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

const SOLUTIONS = [
  {
    title: "High-Performance Websites",
    description: "Fast, responsive, and SEO-optimized web experiences designed to establish absolute authority. We focus on curated typography, visual layout flow, and micro-interactions.",
    bulletPoints: [
      "Headless CMS & Static Sites (Next.js)",
      "Editorial Design & Visual Excellence",
      "Curated Animations & Layout flows",
      "Complete Technical SEO & Indexing setup"
    ],
    icon: Globe,
    color: "#0ea5e9",
    bgGlow: "rgba(14,165,233,0.15)"
  },
  {
    title: "Integrated CRM Systems",
    description: "Replacing messy spreadsheets with custom dashboards, automated pipelines, and unified client records. Tailored for your specific business logic and workflows.",
    bulletPoints: [
      "Customer databases & site-visit tracking",
      "Automated lead capture & follow-ups",
      "Role-based staff control panels",
      "Analytics dashboards & forecasting tools"
    ],
    icon: Layout,
    color: "#10b981",
    bgGlow: "rgba(16,185,129,0.15)"
  },
  {
    title: "WhatsApp API Automation",
    description: "Meeting your clients where they live. We build WhatsApp automated bots, auto-reminders, invoice dispatch systems, and customer-support channels.",
    bulletPoints: [
      "Automated payment renewal reminders",
      "Instant inquiry catalog shares",
      "Real-time check-in alerts",
      "Operational status alerts"
    ],
    icon: Zap,
    color: "#eab308",
    bgGlow: "rgba(234,179,8,0.15)"
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile applications for iOS and Android built on robust frameworks. Seamless offline support, local push notifications, and fast loading states.",
    bulletPoints: [
      "React Native & Expo configurations",
      "Smooth micro-interactions & transitions",
      "Push notification dispatch systems",
      "Built-in offline caching layers"
    ],
    icon: Smartphone,
    color: "#ec4899",
    bgGlow: "rgba(236,72,153,0.15)"
  },
  {
    title: "Database Engineering",
    description: "Designing secure, relational, and high-performance databases. We structure complex relationships, write clean queries, and optimize query latency.",
    bulletPoints: [
      "PostgreSQL & Prisma configurations",
      "Complex migrations & structural updates",
      "Optimized query latency benchmarks",
      "Scheduled backups & data exports"
    ],
    icon: Layers,
    color: "#8b5cf6",
    bgGlow: "rgba(139,92,246,0.15)"
  },
  {
    title: "Digital Operations Hubs",
    description: "Bridging physical and digital operations. We connect inventory logs, delivery route ETAs, and client billing into one centralized web control center.",
    bulletPoints: [
      "FMCG distribution tracking systems",
      "Logistics coordination dashboards",
      "Unified POS & multi-branch tracking",
      "Operational alert automation systems"
    ],
    icon: Cpu,
    color: "#f97316",
    bgGlow: "rgba(249,115,22,0.15)"
  }
];

export default function SoftwareSolutionsClient() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden font-sans selection:bg-[#0284c7]/30">
      <SiteHeader />
      
      {/* ══ HERO SECTION (Visual Authority & DecryptedText) ══════════════ */}
      <section className="relative pt-44 pb-32 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-900">
        {/* Background grids */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.18] dark:opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle 800px at 50% -20%, rgba(14,165,233,0.15), transparent)`,
            }}
          />
          <Squares 
            direction="diagonal"
            speed={0.4}
            squareSize={40}
            borderColor="rgba(14,165,233,0.03)"
            hoverColor="rgba(14,165,233,0.06)"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-100/50 dark:border-sky-900/30 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mb-8">
                  <Sparkles className="w-3.5 h-3.5" /> Services // Tech Engineering
                </div>

                <h1 className="text-5xl md:text-8vw lg:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[0.95] mb-8">
                  We Build <br />
                  <span className="text-[#0ea5e9]">
                    <DecryptedText
                      text="Digital Backbones."
                      speed={50}
                      maxIterations={15}
                      animateOn="view"
                      encryptedClassName="encrypted-char"
                    />
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
                  At Shaibya Solutions, we build high-performance web systems, custom CRM platforms, and process automation tools that solve real operational pain. We focus on clean code, robust architectures, and out-of-the-box performance.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    Start Project <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="#solutions"
                    className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  >
                    Explore Systems
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: WebGL 3D Shape */}
            <div className="lg:col-span-5 relative aspect-square w-full max-w-[450px] mx-auto flex items-center justify-center">
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_300px_at_center,rgba(56,189,248,0.1),transparent)]" />
              <div className="relative z-10 w-full h-full">
                <AbstractTechShape />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ THE SYSTEMS: CARDS SECTION ═══════════════════════════════ */}
      <section id="solutions" className="py-28 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-3xl mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-3 block">
              Our Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Software Systems Built for Leverage
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light mt-3">
              We specialize in replacing manual processes, registers, and messy chat threads with custom, high-fidelity software architectures.
            </p>
          </div>

          {/* Grid of Spotlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <SpotlightCard 
                    className="h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 p-8 rounded-4xl flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                    spotlightColor={s.color}
                  >
                    <div>
                      {/* Icon container */}
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform duration-300"
                        style={{ backgroundColor: `${s.color}15`, color: s.color }}
                      >
                        <Icon size={22} />
                      </div>

                      <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                        {s.title}
                      </h3>
                      
                      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
                        {s.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                      {s.bulletPoints.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          <span className="font-medium">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══ 3D PORTFOLIO CAROUSEL SECTION ═════════════════════════════ */}
      <section className="py-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-3 block">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-none mb-4">
              Featured Productions
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light">
              Explore some of the high-performance platforms, dashboards, and portals we have designed and built.
            </p>
          </div>

          <div className="h-[480px] w-full flex items-center justify-center overflow-hidden">
            <Carousel3D />
          </div>

        </div>
      </section>

      {/* ══ CTA SECTION ═══════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#FAF9F6] dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
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
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-6 tracking-tight">
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

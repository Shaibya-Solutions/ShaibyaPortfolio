// app/about/page.tsx
"use client";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChairmanMessage } from "@/components/about-ceomessage";
import { MilestonesDynamicScroll } from "@/components/about-milestone";
import { Stats } from "@/components/about-stats";
import { WhyShaibyaCreative } from "@/components/about-whyshaibya";
import { motion } from "framer-motion";
import { CapabilitiesShowcase } from "@/components/about-capabilities"; // New

export default function AboutPage() {
  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <Section className="pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
            Ahead of the curve, always.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-slate-300">
            We are a technology company focused on AI, full‑stack development,
            and multi‑platform apps. Our mission is to craft intelligent
            software that’s reliable, accessible, and delightful.
          </p>
        </motion.div>
      </Section>

      <div className="bg-slate-900 border-t border-b border-slate-800/60">
        <Stats />
      </div>

      <div className="bg-slate-950">
        <ChairmanMessage />
      </div>

      {/* NEW: Dynamic Milestones that change on scroll */}
      <MilestonesDynamicScroll />

      {/* NEW: Capabilities section with a visual showcase */}
      <div className="bg-slate-900 border-t border-b border-slate-800/60">
        <CapabilitiesShowcase />
      </div>

      {/* NEW: Creative "Why Us" section */}
      <div className="bg-slate-950">
        <WhyShaibyaCreative />
      </div>

      <SiteFooter />
    </main>
  );
}

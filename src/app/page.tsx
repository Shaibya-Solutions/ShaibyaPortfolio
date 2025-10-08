"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { FeatureCard } from "@/components/ui/feature-card";
import { AppShowcaseCTA } from "@/components/features/landing/AppShowcaseCTA";

import StackCaseStudies from "@/components/features/landing/stack-cards";
import Testimonials from "@/components/ui/testimonials";
import VideoSection from "@/components/features/landing/video-section";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the ParticleBackground component to ensure it only renders on the client-side.
const ParticleBackground = dynamic(
  () => import("../components/features/landing/particle-background"),
  {
    ssr: false, // This is crucial for canvas-based animations.
  }
);

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-slate-100 scroll-smooth">
      <SiteHeader />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Section className="relative mt-10 flex flex-col items-center justify-center gap-8 ">
          {/* Particle background is placed here as a child component */}
          <ParticleBackground />

          <div className="relative z-10 flex flex-col justify-center text-center">
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-t from-white to-[var(--secondary)] bg-clip-text text-transparent md:text-7xl lg:text-8xl">
              Ahead of the Curve,
              <br /> Always
            </h1>
            <p className="mt-4 max-w-prose text-slate-300">
              We craft AI-powered platforms, robust full-stack web apps, and
              polished desktop/mobile experiences.
            </p>
          </div>

          {/* This div creates the blur effect behind the hero text */}
          <div className="relative z-10 hidden max-w-7xl md:block">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-2xl" />
          </div>
        </Section>
      </motion.div>

      {/* What we offer section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Section className="mt-14">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-semibold text-white">What We Offer</h2>
          </div>
          <div className="sm:mx-20 md:mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-2 justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="row-span-2"
            >
              <FeatureCard
                title="Artificial Intelligence"
                desc="ML models, analytics, and intelligent automation."
                image="/ai-solution.webp"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureCard
                title="Full-stack Web"
                desc="Scalable APIs, realtime, and delightful UX."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="row-span-2"
            >
              <FeatureCard
                title="Desktop & Mobile"
                desc="Cross-platform apps, native performance."
                image="/customer-exp.jpg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureCard
                title="Custom R&D"
                desc="Rapid prototyping and PoC to production."
              />
            </motion.div>
          </div>
        </Section>
      </motion.section>
      <VideoSection />
      <StackCaseStudies />
      <Testimonials />
      <AppShowcaseCTA />
      <SiteFooter />
    </main>
  );
}

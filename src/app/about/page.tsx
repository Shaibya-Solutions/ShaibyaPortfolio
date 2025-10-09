"use client";
import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
// Original Imports/Logic
import { motion } from "framer-motion";
import { Zap, Code, Brain, Users, TrendingUp, Handshake } from "lucide-react"; // Icons for new sections

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- About Shaibya Section Component ---
const AboutShaibyaSection = () => (
  <Section className="py-24 border-t border-slate-800/60 bg-slate-900">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
      >
        About Shaibya
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-xl text-blue-300 mb-12 max-w-3xl"
      >
        "Crafting the next generation of digital excellence."
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Handshake,
            title: "Integrity First",
            description:
              "We build trust through transparent processes and honest communication, ensuring reliability in every partnership.",
          },
          {
            icon: TrendingUp,
            title: "Driven by Innovation",
            description:
              "Our foundation is built on continuous learning, constantly exploring new technologies like GenAI and cutting-edge frameworks.",
          },
          {
            icon: Users,
            title: "Client-Centric Value",
            description:
              "We measure our success by the tangible, measurable impact we deliver to your business goals and bottom line.",
          },
        ].map((value, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg"
          >
            <value.icon className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {value.title}
            </h3>
            <p className="text-slate-400 text-sm">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </Section>
);

// --- What We Do Section Component (Services) ---
const WhatWeDoSection = () => (
  <Section className="py-24 bg-slate-950">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
      >
        What We Do
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-lg text-slate-300 mb-12 max-w-3xl"
      >
        We offer end-to-end solutions that merge creativity with deep technical
        expertise to build scalable and future-proof products.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Brain,
            title: "AI & Machine Learning",
            description:
              "Integration of bespoke LLMs, data visualization, and predictive analytics to automate decision-making.",
          },
          {
            icon: Code,
            title: "Full-Stack Web Development",
            description:
              "Bespoke application development using modern frameworks (React/Next.js) for high-performance web platforms.",
          },
          {
            icon: Zap,
            title: "Multi-Platform Mobile Apps",
            description:
              "Native-like mobile experiences (iOS & Android) that are fast, secure, and integrate deeply with hardware features.",
          },
        ].map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg"
          >
            <service.icon className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-slate-400 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </Section>
);

// --- The Culture Section Component ---
const TheCultureSection = () => (
  <Section className="py-24 border-t border-slate-800/60 bg-slate-900">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
      >
        The Culture: Why We Hustle
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-lg text-slate-300 mb-12 max-w-3xl"
      >
        Our mindset is simple: **relentless execution** paired with a passion
        for solving the unsolvable. We thrive on technical challenges.
      </motion.p>

      <div className="space-y-8 max-w-4xl">
        <motion.div
          variants={itemVariants}
          className="flex items-start space-x-4"
        >
          <span className="text-blue-400 text-3xl font-bold pt-1">01</span>
          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">
              Engineered for Scale
            </h3>
            <p className="text-slate-400">
              We don't just write code; we architect systems designed to handle
              exponential growth and remain robust under heavy load.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex items-start space-x-4"
        >
          <span className="text-blue-400 text-3xl font-bold pt-1">02</span>
          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">
              Mastery over Method
            </h3>
            <p className="text-slate-400">
              We prioritize deep expertise over buzzwords. Our team constantly
              upskills to master new paradigms and deliver exceptional quality.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex items-start space-x-4"
        >
          <span className="text-blue-400 text-3xl font-bold pt-1">03</span>
          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">
              Fierce Ownership
            </h3>
            <p className="text-slate-400">
              Every project is treated as our own. We take full responsibility
              for delivery, performance, and long-term sustainability.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </Section>
);

export default function AboutPage() {
  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      <SiteHeader />

      {/* 1. Hero Section (Kept as is) */}
      <Section className="pt-20 pb-16 bg-gradient-to-b from-[#0f1117] to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
            Ahead of the curve, always.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-slate-300">
            We are a technology company focused on **AI, full‑stack development,
            and multi‑platform apps**. Our mission is to craft intelligent
            software that’s reliable, accessible, and delightful.
          </p>
        </motion.div>
      </Section>

      {/* 2. About Shaibya (The agency story & values) */}
      <AboutShaibyaSection />

      {/* 3. What We Do (Services / solutions area) */}
      <WhatWeDoSection />

      {/* 4. The Culture (Our mindset / why we hustle) */}
      <TheCultureSection />

      <SiteFooter />
    </main>
  );
}

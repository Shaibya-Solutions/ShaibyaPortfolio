"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Rocket,
  ArrowRight,
  Code,
  Cpu,
  Layers,
  Heart,
  Zap,
  TrendingUp,
} from "lucide-react";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";

const BG_COLOR = "#fbfbfd";
const TEXT_MAIN = "#1d1d1f";
const TEXT_MUTED = "#86868b";

interface AppleCardProps {
  icon: React.ElementType;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  accentColor: string;
}

function AppleCard({
  icon: Icon,
  tag,
  title,
  subtitle,
  description,
  bullets,
  ctaText,
  ctaHref,
  accentColor,
}: AppleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="relative flex flex-col justify-between bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_30px_60px_rgba(14,165,233,0.07)] transition-all duration-300 overflow-hidden group"
    >
      <div
        className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
        >
          <Icon size={26} />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: accentColor }}>
          {tag}
        </span>

        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1d1d1f] mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          {title}
        </h3>

        <p className="text-sm font-semibold text-slate-500 mb-5">
          {subtitle}
        </p>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
          {description}
        </p>

        <div className="space-y-3.5 mb-8">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
              <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accentColor }} />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-bold group/btn w-fit transition-colors pt-4"
        style={{ color: TEXT_MAIN }}
      >
        <span className="group-hover:underline">{ctaText}</span>
        <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" style={{ color: accentColor }} />
      </a>
    </motion.div>
  );
}

export default function CommunityClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15,
      },
    },
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#ffffff] text-[#1d1d1f] overflow-x-hidden selection:bg-sky-100 selection:text-sky-900">
      <SiteHeader />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#f5f5f7] via-[#ffffff] to-[#ffffff]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-sky-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50/50 text-sky-600 text-xs md:text-sm font-bold mb-6 tracking-wider uppercase"
          >
            <Sparkles size={14} />
            <span>Shaibya Community Ecosystem</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-[#1d1d1f]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Designed for Builders.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 font-bold">
              Crafted for Founders.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-base md:text-xl text-[#515154] max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Welcome to the Shaibya Ecosystem. We bring together passionate student builders, highly skilled specialists, and visionary startup founders to co-create, learn, and grow together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#join"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all duration-300"
            >
              Join the Ecosystem <ArrowRight size={16} />
            </a>
            <a
              href="#hubs"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-300"
            >
              Explore Hubs
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── COMMUNITY TRACKS (3 MAIN HUBS) ─── */}
      <section id="hubs" className="py-24 bg-[#f5f5f7] px-6 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2
              className="text-3xl md:text-5xl font-extrabold text-[#1d1d1f] tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Three Main Communities
            </h2>
            <p className="mt-4 text-[#86868b] text-sm md:text-base font-semibold">
              Select the track that matches your current path. We scale engineers, support creative experts, and launch platforms.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* 1st: STUDENTS */}
            <motion.div variants={itemVariants}>
              <AppleCard
                icon={GraduationCap}
                tag="THE BUILDER'S SANDBOX"
                title="Students & Learners"
                subtitle="Learn by doing, write production code"
                description="Skip the basic video tutorials. In our Sandbox, students work directly on active production systems, write database paths, build UI hooks, and learn architecture under expert guidance."
                bullets={[
                  "Write features for live products serving thousands of users.",
                  "Receive structured reviews and mentoring from senior engineers.",
                  "Fast-track path into paid development and design internships."
                ]}
                ctaText="Join WhatsApp Community"
                ctaHref="https://wa.me/917498341146?text=Hi!%20I%20am%20a%20student%20and%20want%20to%20join%20the%20Shaibya%20Student%20Sandbox%20WhatsApp%20community."
                accentColor="#0ea5e9"
              />
            </motion.div>

            {/* 2nd: TALENT */}
            <motion.div variants={itemVariants}>
              <AppleCard
                icon={Briefcase}
                tag="THE CREATIVE SHIELD"
                title="Talented Specialists"
                subtitle="Collaborate on high-end tech products"
                description="Designed for people with proven talent in coding, UI/UX, 3D modeling, copywriting, or marketing. Collaborate with other specialists on premium consulting sprints and tools."
                bullets={[
                  "Work in cross-functional squads of highly skilled specialists.",
                  "Deliver complex project scope with high architectural support.",
                  "Fair, sprint-based profit-sharing structures for active team components."
                ]}
                ctaText="Join LinkedIn Circle"
                ctaHref="https://www.linkedin.com/company/shaibyasolutions/about/"
                accentColor="#10b981"
              />
            </motion.div>

            {/* 3rd: FOUNDERS */}
            <motion.div variants={itemVariants}>
              <AppleCard
                icon={Rocket}
                tag="THE STARTUP ROCKET"
                title="Founders & Ideators"
                subtitle="Accelerate your product validation from day zero"
                description="For individuals who want to start their own software platform. We support with visual mockups, MVP strategy, full product execution, and seed/investor deck consulting support."
                bullets={[
                  "Rapid prototyping models - go from sketch to live in weeks.",
                  "Consulting on architecture scaling, monetization, and team building.",
                  "Direct introduction to regional business ecosystems and logistics."
                ]}
                ctaText="Pitch Your Idea"
                ctaHref="https://wa.me/917498341146?text=Hi!%20I%20am%20a%20founder%20and%20want%20to%20pitch%20a%20software%20idea%20to%20Shaibya%20Solutions."
                accentColor="#ec4899"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUE SYSTEM SECTION ─── */}
      <section className="py-24 bg-white px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#86868b] mb-4 block">
                Ecosystem Core Principles
              </span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-[#1d1d1f] tracking-tight leading-tight mb-8"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Why we created this distributed network.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                Traditional classrooms teach theories; traditional agencies build code templates. Neither teaches you how to design a product that solves a real business workflow, nor how to manage production deployments under heavy load.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                We believe that the best way to develop world-class engineering talent is to give builders ownership of real production code. By matching founders with specialists and mentoring students on production sprints, we create a positive-sum loop where everyone grows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:shadow-md transition-shadow">
                <Code className="text-sky-500 mb-5" size={28} />
                <h4 className="font-extrabold text-slate-800 text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>Craftsmanship</h4>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  We care about variables naming, layout shifts, clean hooks, and fast API endpoints. Details matter.
                </p>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:shadow-md transition-shadow">
                <Cpu className="text-indigo-500 mb-5" size={28} />
                <h4 className="font-extrabold text-slate-800 text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>Modern Leverage</h4>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  We use next.js, cloud automation, WhatsApp APIs, and RERA structures to gain extreme business leverage.
                </p>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:shadow-md transition-shadow">
                <Layers className="text-emerald-500 mb-5" size={28} />
                <h4 className="font-extrabold text-slate-800 text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>Complete Openness</h4>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  We communicate in public channels, document decisions, and share learning materials freely with all sandbox members.
                </p>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:shadow-md transition-shadow">
                <Heart className="text-rose-500 mb-5" size={28} />
                <h4 className="font-extrabold text-slate-800 text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>Active Collaboration</h4>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  Nagpur, Noida, Texas, and Bangalore — we sync asynchronously, meet regularly, and build together as peers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION SECTION ─── */}
      <section id="join" className="py-28 bg-[#f5f5f7] px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[#86868b] text-xs font-bold uppercase tracking-widest block mb-4">
            Ecosystem Application
          </span>
          <h2
            className="text-4xl md:text-6xl font-extrabold text-[#1d1d1f] tracking-tight leading-none mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to build with us?
          </h2>
          <p className="text-[#515154] text-lg max-w-xl mx-auto mb-10 font-medium">
            Whether you want to write React code, configure databases, design visual transitions, or launch your startup — we want to hear from you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/917498341146?text=Hi!%20I%20am%20interested%20in%20joining%20the%20Shaibya%20Ecosystem%20whatsapp%20group."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-10 py-4 font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md"
            >
              <FaWhatsapp size={16} /> Join WhatsApp Hub
            </a>
            <a
              href="https://www.linkedin.com/company/shaibyasolutions/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-10 py-4 font-bold text-xs uppercase tracking-wider text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
            >
              <FaLinkedin size={16} /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

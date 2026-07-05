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

// Apple-like color scheme and styling constants
const BG_COLOR = "#fbfbfd"; // Apple's light gray background
const WHITE = "#ffffff";
const TEXT_MAIN = "#1d1d1f"; // Apple's main text
const TEXT_MUTED = "#86868b"; // Apple's secondary text

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
      {/* Decorative soft background glow */}
      <div
        className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        {/* Soft colored icon container */}
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

export default function CommunityPage() {
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
        {/* Soft Subtle Glow Background Blobs */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600">
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
                  "Participate in high-margin engineering and consulting sprints.",
                  "Incubate shared utility packages and build in public."
                ]}
                ctaText="Join WhatsApp Community"
                ctaHref="https://wa.me/917498341146?text=Hi!%20I%20am%20a%20specialist%20and%20want%20to%20join%20the%20Shaibya%20Talent%20WhatsApp%20community."
                accentColor="#8b5cf6"
              />
            </motion.div>

            {/* 3rd: STARTUP FOUNDERS */}
            <motion.div variants={itemVariants}>
              <AppleCard
                icon={Rocket}
                tag="THE ACCELERATOR"
                title="Startup Founders"
                subtitle="Launch and grow your tech together"
                description="We help early-stage founders scope product features, establish solid cloud architectures, deploy clean MVPs in weeks, and connect with top vetted talent from our sandbox."
                bullets={[
                  "Ship your product MVP to market with velocity and security.",
                  "Receive technical co-founder level advisory on system designs.",
                  "Hire top student builders who are already vetted in our Sandbox."
                ]}
                ctaText="Join WhatsApp Community"
                ctaHref="https://wa.me/917498341146?text=Hi!%20I%20am%20a%20startup%20founder%20and%20want%20to%20join%20the%20Shaibya%20Founders%20WhatsApp%20community."
                accentColor="#f97316"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── METRIC STATS SECTION ─── */}
      <section className="py-20 bg-white border-y border-slate-100 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              { val: "30+", label: "Vetted Student Builders", icon: Code },
              { val: "15+", label: "Startups Collaborated & Helped", icon: Rocket },
            ].map((stat, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
                  <stat.icon size={18} />
                </div>
                <span className="text-4xl md:text-5xl font-extrabold text-[#1d1d1f]" style={{ fontFamily: "var(--font-syne)" }}>
                  {stat.val}
                </span>
                <span className="text-sm text-slate-500 font-bold mt-1.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM VALUES SECTION ─── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              className="text-2xl md:text-4xl font-extrabold text-[#1d1d1f] tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              How We Work in the Ecosystem
            </h2>
            <p className="mt-3 text-slate-500 text-sm font-semibold">
              We operate under simple, high-velocity principles inspired by Apple's focus on quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start p-6 rounded-2xl bg-[#f5f5f7] border border-slate-100">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1d1d1f] mb-1" style={{ fontFamily: "var(--font-syne)" }}>Extreme Leverage</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  We reject legacy corporate processes. With modern frameworks, AI scaffolding, and first-principles thinking, single-builder teams achieve enormous product outcomes.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 rounded-2xl bg-[#f5f5f7] border border-slate-100">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 shrink-0">
                <Heart size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1d1d1f] mb-1" style={{ fontFamily: "var(--font-syne)" }}>Craftsmanship Over Speed</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  We care deeply about smooth transitions, clean margins, semantic layout tags, and API speed. Simple products are hard work, and we value builders who respect details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── JOIN THE ECOSYSTEM CTA ─── */}
      <section id="join" className="py-20 px-6 relative bg-gradient-to-b from-[#ffffff] to-[#f5f5f7] border-t border-slate-100">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200/80 bg-white p-8 md:p-14 text-center shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
            {/* Soft inner glow decorations */}
            <div className="absolute -top-24 -left-24 w-52 h-52 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

            <h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Join the Ecosystem
            </h2>
            
            <p className="text-[#515154] text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium">
              Ready to learn by coding, collaborate with talented professionals, or accelerate your startup MVP? Let's grow together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/917498341146?text=Hi!%20I%20am%20interested%20in%20joining%20the%20Shaibya%20Community%20as%20a%20builder/expert."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all duration-300"
              >
                <FaWhatsapp size={18} />
                Join as Student / Expert
              </a>
              <a
                href="https://wa.me/917498341146?text=Hi!%20I%20am%20a%20startup%20founder%20and%20want%20to%20know%20more%20about%20the%20Shaibya%20Ecosystem."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-300"
              >
                <FaLinkedin size={18} />
                Connect as Founder
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import Link from "next/link";
import {
  Building2,
  Lightbulb,
  Target,
  Users,
  Globe2,
  Rocket,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";

const BRAND = "#0ea5e9";
const TEXT = "#111827";
const MUTED = "#6B7280";
const FAINT = "#9CA3AF";
const BORDER = "#E5E7EB";
const BG = "#ffffff";
const BG_ALT = "#F8FAFB";
const DARK = "#060d1f";

const timeline = [
  {
    year: "The Inception",
    title: "A Spark of Innovation",
    description:
      "Shaibya Solutions was born out of a simple observation: businesses were struggling to bridge the gap between complex technological capabilities and real-world operational needs. Our founders set out to create a consultancy that prioritized practical, scalable solutions.",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
  {
    year: "Building the Foundation",
    title: "Assembling the Experts",
    description:
      "We started small, focusing on localized impact. By gathering a core team of passionate technologists and strategists, Shaibya established its foundational ethos: delivering uncompromising quality and building lasting partnerships.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
  },
  {
    year: "Expansion & Growth",
    title: "Scaling New Heights",
    description:
      "As our reputation for excellence grew, so did our footprint. We expanded our service offerings to encompass enterprise digital transformation, cloud architecture, and cutting-edge data analytics.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    year: "Present Day",
    title: "A Global Solutions Partner",
    description:
      "Today, Shaibya Solutions stands as a beacon of technological empowerment. We continue to drive innovation, helping organizations worldwide navigate the complexities of the digital age with confidence.",
    icon: Globe2,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];

const values = [
  {
    title: "Integrity First",
    description: "We believe in transparent, honest partnerships. Our word is our bond.",
    icon: Building2,
  },
  {
    title: "Relentless Innovation",
    description: "We constantly push the boundaries of what is possible, embracing new technologies.",
    icon: Sparkles,
  },
  {
    title: "Client-Centric",
    description: "Your success is our success. We measure our impact by the value we create for you.",
    icon: Target,
  },
  {
    title: "Excellence Delivered",
    description: "We hold ourselves to the highest standards of quality, ensuring every solution is robust and effective.",
    icon: Award,
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden" style={{ background: BG, color: TEXT }}>
      <SiteHeader />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-24 overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400"
            alt=""
            aria-hidden
            className="w-full h-full object-cover grayscale"
          />
          {/* Overlay — white fade so dark text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.95) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.22em] mb-6"
              style={{ color: BRAND, fontFamily: "var(--font-inter)" }}
            >
              Our Story
            </p>
            <h1
              className="font-bold tracking-tight leading-[1.02] mb-8"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                letterSpacing: "-0.03em",
                color: TEXT,
              }}
            >
              Empowering the Future,{" "}
              <br className="hidden md:block" />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: MUTED }}>
                One Solution at a Time.
              </span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: MUTED, fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              We are more than just a technology company. Shaibya Solutions is a collective of
              visionaries, engineers, and strategists dedicated to transforming how businesses
              operate in the digital era.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ WHO WE ARE + VALUES ═══════════════════════════════════════ */}
      <section className="py-24 lg:py-32 border-y" style={{ borderColor: BORDER, background: BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: FAINT, fontFamily: "var(--font-inter)" }}
              >
                Who We Are
              </p>
              <h2
                className="font-bold mb-8 leading-tight"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: TEXT,
                }}
              >
                What is Shaibya Solutions?
              </h2>
              <div
                className="space-y-5 text-lg leading-relaxed pl-6"
                style={{ color: MUTED, fontFamily: "var(--font-inter)", fontWeight: 300, borderLeft: `2px solid ${BORDER}` }}
              >
                <p>
                  Shaibya Solutions is a premier technology consulting and implementation firm.
                  We specialize in identifying operational bottlenecks and deploying bespoke,
                  scalable digital solutions that drive efficiency and growth.
                </p>
                <p>
                  Our name, Shaibya, reflects our commitment to truth, resilience, and unwavering
                  dedication to our clients&apos; success. We bridge the gap between legacy systems and
                  forward-looking innovations, ensuring our partners are always a step ahead.
                </p>
              </div>
            </motion.div>

            {/* Right — values hover grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px"
              style={{ background: BORDER, border: `1px solid ${BORDER}` }}
            >
              {values.map((v) => (
                <div
                  key={v.title}
                  className="group p-8 bg-white hover:bg-[#111827] transition-colors duration-300 cursor-default"
                >
                  <v.icon className="w-7 h-7 mb-5 text-[#0ea5e9] group-hover:text-[#38bdf8] transition-colors duration-300" />
                  <h4
                    className="text-base font-bold mb-2 text-[#111827] group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {v.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-[#6B7280] group-hover:text-white/70 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {v.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ═════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: DARK, color: "#F3F5F9" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <div
            className="text-center max-w-3xl mx-auto mb-20 pb-12"
            style={{ borderBottom: "1px solid rgba(243,245,249,0.12)" }}
          >
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "rgba(243,245,249,0.45)", fontFamily: "var(--font-inter)" }}
            >
              Our History
            </p>
            <h2
              className="font-bold mb-6 tracking-tight text-white"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              The Shaibya Story
            </h2>
            <p
              className="text-lg italic font-light"
              style={{ color: "rgba(243,245,249,0.65)", fontFamily: "var(--font-inter)" }}
            >
              Every great enterprise starts with a vision. Here is how Shaibya Solutions evolved
              from a bold idea into a driving force in technology.
            </p>
          </div>

          {/* Timeline entries */}
          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "rgba(243,245,249,0.12)" }}
            />

            <div className="space-y-16">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="relative flex flex-col md:flex-row items-center gap-8"
                >
                  {/* Node */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 items-center justify-center z-10"
                    style={{ background: DARK, border: "1px solid rgba(243,245,249,0.25)" }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: BRAND }} />
                  </div>

                  {/* Left col */}
                  <div className="w-full md:w-1/2 md:pr-16 md:text-right">
                    {idx % 2 === 0 ? (
                      <div className="p-8 border border-white/10 hover:border-[#0ea5e9]/40 bg-white/[0.03] transition-all duration-300">
                        <span
                          className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
                          style={{ color: BRAND, fontFamily: "var(--font-inter)" }}
                        >
                          {item.year}
                        </span>
                        <h4
                          className="text-2xl font-bold mb-4 text-white"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="leading-relaxed text-base font-light text-white/70"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <div className="aspect-video w-full overflow-hidden border border-white/10">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right col */}
                  <div className="w-full md:w-1/2 md:pl-16 md:text-left">
                    {idx % 2 === 1 ? (
                      <div className="p-8 border border-white/10 hover:border-[#0ea5e9]/40 bg-white/[0.03] transition-all duration-300">
                        <span
                          className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
                          style={{ color: BRAND, fontFamily: "var(--font-inter)" }}
                        >
                          {item.year}
                        </span>
                        <h4
                          className="text-2xl font-bold mb-4 text-white"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="leading-relaxed text-base font-light text-white/70"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <div className="aspect-video w-full overflow-hidden border border-white/10">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════ */}
      <section
        className="py-32 text-center"
        style={{ background: BG_ALT, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-bold tracking-[0.22em] uppercase mb-6"
              style={{ color: BRAND, fontFamily: "var(--font-inter)" }}
            >
              Join Us
            </p>
            <h2
              className="font-bold tracking-tight mb-8"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
                color: TEXT,
              }}
            >
              Be Part of Our Next Chapter
            </h2>
            <p
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto italic font-light"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              Whether you are looking to transform your business or join a team of innovators,
              Shaibya Solutions is ready to welcome you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-[0.2em] px-10 py-5 transition-all duration-200 hover:gap-5"
              style={{ background: TEXT, color: "#ffffff", border: `1px solid ${TEXT}` }}
            >
              Connect With Us <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

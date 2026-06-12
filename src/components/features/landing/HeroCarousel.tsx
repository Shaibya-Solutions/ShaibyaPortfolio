"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  {
    tag: "Nagpur's #1 Emerging Real Estate City",
    heading: "Your agency needs a digital backbone.",
    subheading: "We've built systems for 3 Nagpur real estate businesses — more leads, faster closures, zero paperwork.",
    cta: { text: "Talk to us", href: "#" },
    ctaSecondary: { text: "Real Estate Solutions", href: "/industry/real-estate" },
    image: "/images/solutions/vims.png",
    stat: { value: "22%", label: "Sales surge in Nagpur" },
  },
  {
    tag: "Proven at Revolution Fitness",
    heading: "120 → 350 members. Here's the system.",
    subheading: "5 gym brands run on our FitManage platform. Automated renewals, attendance, payments — everything.",
    cta: { text: "See the system", href: "/industry/fitness" },
    ctaSecondary: { text: "FitManage 360", href: "/portfolio/solutions#fitmanage-360" },
    image: "/images/solutions/fitlife.png",
    stat: { value: "80%", label: "Admin time eliminated" },
  },
  {
    tag: "We build with founders",
    heading: "A student had a plan. We built the platform.",
    subheading: "Snyppit, Bridgestone, Mirragio — we don't just take orders. We think with you and ship what works.",
    cta: { text: "Start a project", href: "/contact" },
    ctaSecondary: { text: "Read the story", href: "/snyppit" },
    image: "/images/solutions/memorybox.png",
    stat: { value: "4wk", label: "Idea to launch" },
  },
];

const DURATION = 7000;

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => { setIdx(p => (p + 1) % slides.length); setProgress(0); }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setProgress(p => { if (p >= 100) { next(); return 0; } return p + 100 / (DURATION / 50); });
    }, 50);
    return () => clearInterval(t);
  }, [paused, next]);

  const s = slides[idx];

  return (
    <section
      className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#faf9f7]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">

          {/* LEFT — Text content (asymmetric alignment) */}
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {/* Tag */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B4E61] mb-6"
              >
                {s.tag}
              </motion.p>

              {/* Headline — large, editorial */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#010D18] mb-6"
              >
                {s.heading}
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-lg text-[#4a5568] leading-relaxed max-w-lg mb-10"
              >
                {s.subheading}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                {idx === 0 ? (
                  <WhatsAppCTA text={s.cta.text} />
                ) : (
                  <Link href={s.cta.href} className="group inline-flex items-center gap-2 bg-[#0B4E61] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#034078] transition-colors">
                    {s.cta.text} <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                <Link href={s.ctaSecondary.href} className="inline-flex items-center gap-2 text-[#0B4E61] font-semibold text-sm border-b-2 border-[#0B4E61]/20 hover:border-[#0B4E61] pb-0.5 transition-colors">
                  {s.ctaSecondary.text} <FaArrowRight size={11} />
                </Link>
              </motion.div>

              {/* Inline stat */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl font-black text-[#0B4E61]">{s.stat.value}</span>
                <span className="text-sm text-[#4a5568] font-medium leading-tight max-w-[120px]">{s.stat.label}</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — Image with geometric clip */}
          <div className="relative hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10"
                style={{ clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 0% 100%)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B4E61]/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Decorative geometric accent */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-[#0B4E61]/15 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#0B4E61]/5 rounded-full -z-10" />
          </div>
        </div>
      </div>

      {/* Bottom progress indicators */}
      <div className="absolute bottom-8 left-6 lg:left-12 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setIdx(i); setProgress(0); }} aria-label={`Slide ${i + 1}`}
            className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === idx ? 48 : 24 }}
          >
            <div className="absolute inset-0 bg-[#0B4E61]/15 rounded-full" />
            {i === idx && <div className="absolute inset-y-0 left-0 bg-[#0B4E61] rounded-full" style={{ width: `${progress}%` }} />}
            {i !== idx && <div className="absolute inset-0 bg-[#0B4E61]/25 rounded-full hover:bg-[#0B4E61]/40 transition-colors" />}
          </button>
        ))}
        <span className="text-xs text-[#0B4E61]/50 ml-2 font-mono">{String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

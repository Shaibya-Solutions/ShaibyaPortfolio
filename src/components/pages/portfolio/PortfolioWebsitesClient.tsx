"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import { websiteProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

/* ── tokens ── */
const BRAND = "#0ea5e9";
const TEXT = "#111827";
const MUTED = "#6B7280";
const FAINT = "#9CA3AF";
const BORDER = "#E5E7EB";
const BG = "#F8FAFB";
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── animated counter ── */
function Stat({ value, label, active }: { value: string; label: string; active: boolean }) {
  const match = value.match(/^[\d.]+/);
  const num: number | null = match ? parseFloat(match[0]) : null;
  const suffix = num !== null ? value.slice(match![0].length) : "";
  const [disp, setDisp] = useState(num ?? 0);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current || num === null) return;
    done.current = true;
    const target = num; const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1200);
      setDisp((1 - Math.pow(1 - t, 3)) * target);
      if (t < 1) requestAnimationFrame(tick); else setDisp(target);
    };
    requestAnimationFrame(tick);
  }, [active, num]);
  const fmt = num !== null ? (num % 1 === 0 ? Math.round(disp).toString() : disp.toFixed(1)) : value;
  return (
    <div className="flex flex-col gap-1">
      <span style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.75rem,3vw,2.5rem)", fontWeight: 800, lineHeight: 1, color: TEXT, letterSpacing: "-0.03em" }}>
        {num !== null ? `${fmt}${suffix}` : value}
      </span>
      <span style={{ fontSize: 11, color: FAINT, fontFamily: "var(--font-inter)", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

/* ── row ── */
function Row({ project: p, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const [hovered, setHovered] = useState(false);
  const imgLeft = index % 2 === 0;
  const rowNum = String(index + 1).padStart(2, "0");

  const imgVar = {
    hidden: { opacity: 0, x: imgLeft ? -60 : 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
  };
  const txtVar = {
    hidden: { opacity: 0, x: imgLeft ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.12, ease: EASE } },
  };

  const ImageHalf = (
    <motion.div variants={imgVar} initial="hidden" animate={inView ? "visible" : "hidden"}
      className="relative w-full lg:w-1/2 overflow-hidden"
      style={{ minHeight: "clamp(300px,46vw,600px)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <Image src={p.thumbnail} alt={p.name} fill sizes="(max-width:1024px) 100vw,50vw"
        className="object-cover object-top"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }} />
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "rgba(17,24,39,0.50)" }}>
        {p.liveUrl ? (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white font-bold px-7 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform"
            style={{ color: TEXT, fontFamily: "var(--font-inter)", fontSize: 13 }}>
            Visit Live Site <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="text-white font-bold uppercase tracking-widest px-5 py-2.5 rounded-full"
            style={{ fontSize: 11, border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
            Confidential
          </span>
        )}
      </motion.div>
    </motion.div>
  );

  const TextHalf = (
    <motion.div variants={txtVar} initial="hidden" animate={inView ? "visible" : "hidden"}
      className="relative w-full lg:w-1/2 flex flex-col justify-center overflow-hidden"
      style={{ padding: "clamp(44px,7vw,96px) clamp(32px,5.5vw,80px)", background: "#fff", minHeight: "clamp(300px,46vw,600px)" }}>
      {/* Ghost number */}
      <span aria-hidden style={{ position: "absolute", fontFamily: "var(--font-syne)", fontSize: "clamp(110px,16vw,200px)", fontWeight: 900, color: TEXT, opacity: 0.04, lineHeight: 1, top: "50%", transform: "translateY(-50%)", left: imgLeft ? "-0.04em" : "auto", right: imgLeft ? "auto" : "-0.04em", letterSpacing: "-0.06em", userSelect: "none", pointerEvents: "none" }}>
        {rowNum}
      </span>
      <div className="relative z-10 flex flex-col gap-6">
        {/* Meta row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 700, color: BRAND, letterSpacing: "0.06em" }}>{rowNum}</span>
            <span style={{ color: BORDER }}>·</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700, color: FAINT, textTransform: "uppercase", letterSpacing: "0.16em" }}>{p.industry}</span>
          </div>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-1 shrink-0"
              style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700, color: FAINT, textTransform: "uppercase", letterSpacing: "0.14em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = FAINT)}>
              VISIT <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
        {/* Service pill */}
        <span style={{ display: "inline-flex", alignSelf: "flex-start", fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: BRAND, background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.20)", borderRadius: 9999, padding: "4px 12px" }}>
          Web Development
        </span>
        {/* Name */}
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, lineHeight: 0.95, color: TEXT, letterSpacing: "-0.04em", textTransform: "uppercase", margin: 0 }}>
          {p.name}
        </h2>
        {/* Tagline */}
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(14px,1.4vw,17px)", color: MUTED, lineHeight: 1.65, maxWidth: 400, margin: 0 }}>
          {p.tagline}
        </p>
        {/* Stats */}
        {p.stats.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,3vw,36px)", paddingTop: 8 }}>
            {p.stats.slice(0, 3).map(s => <Stat key={s.label} value={s.value} label={s.label} active={inView} />)}
          </div>
        )}
        <div style={{ height: 1, background: BORDER }} />
        {/* Services + year */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 6px" }}>
            {p.servicesDelivered.map((s, si) => (
              <span key={s} style={{ fontSize: 12, color: FAINT, fontFamily: "var(--font-inter)" }}>
                {s}{si < p.servicesDelivered.length - 1 && <span style={{ margin: "0 6px", color: BORDER }}>·</span>}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 11, color: FAINT, fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}>{p.year}</span>
        </div>
        {/* Testimonial */}
        {p.testimonial && (
          <div style={{ padding: "16px 20px", background: BG, border: `1px solid ${BORDER}`, borderRadius: 12, marginTop: 4 }}>
            <p style={{ fontSize: 13, color: "#4B5563", fontStyle: "italic", lineHeight: 1.7, margin: "0 0 8px", fontFamily: "var(--font-inter)" }}>&ldquo;{p.testimonial.quote}&rdquo;</p>
            <p style={{ fontSize: 11, color: FAINT, fontWeight: 600, margin: 0, fontFamily: "var(--font-inter)" }}>— {p.testimonial.name}, {p.testimonial.role}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div ref={ref}>
      {index > 0 && <div style={{ height: 1, background: BORDER }} />}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "clamp(300px,55vh,600px)" }}>
        {imgLeft ? <>{ImageHalf}{TextHalf}</> : <>{TextHalf}{ImageHalf}</>}
      </div>
    </div>
  );
}

/* ── page ── */
export default function WebsitesPortfolioPage() {
  const [visibleCount, setVisibleCount] = useState(4);
  const visible = websiteProjects.slice(0, visibleCount);
  const hasMore = visibleCount < websiteProjects.length;
  const remaining = websiteProjects.length - visibleCount;
  return (
    <main className="min-h-screen flex flex-col" style={{ background: BG, color: TEXT }}>
      <SiteHeader />

      <section style={{ paddingTop: "clamp(100px,14vw,176px)", paddingBottom: "clamp(40px,5vw,64px)", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ color: BRAND, fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", marginBottom: 20 }}>
            Portfolio — Websites
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(3.5rem,10vw,7.5rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.05em", color: TEXT, textTransform: "uppercase", marginBottom: 28 }}>
            WEBSITES
            <br /><span style={{ color: BRAND }}>WE&apos;VE BUILT.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(15px,1.5vw,18px)", color: MUTED, lineHeight: 1.7, maxWidth: 520 }}>
            {websiteProjects.length} live websites across healthcare, real estate, hospitality, fitness, and fashion. Each one built to convert visitors into clients.
          </motion.p>
        </div>
      </section>

      <section className="flex-grow" style={{ background: "#fff" }}>
        {visible.map((p, i) => <Row key={p.slug} project={p} index={i} />)}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "32px clamp(24px,4vw,48px) 40px", borderTop: `1px solid ${BORDER}` }}>
            <button
              onClick={() => setVisibleCount(c => c + 4)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND, background: "rgba(14,165,233,0.07)", border: `1px solid rgba(14,165,233,0.22)`, borderRadius: 9999, padding: "10px 24px", cursor: "pointer" }}
            >
              View more{remaining > 0 && ` (${Math.min(remaining, 4)} of ${remaining})`}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        )}
      </section>

      <section style={{ borderTop: `1px solid ${BORDER}`, background: BG, padding: "clamp(64px,8vw,120px) clamp(24px,4vw,48px)" }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.26em", color: FAINT, marginBottom: 20 }}>Now Booking</p>
            <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.4rem,5.5vw,4.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", textTransform: "uppercase", color: TEXT }}>
              READY TO BUILD<br />SOMETHING<br /><span style={{ color: BRAND }}>LIKE THIS?</span>
            </h2>
          </div>
          <WhatsAppCTA message="Hi, I need a website for my business." text="Get a free quote" />
        </div>
      </section>

      <Footer />
    </main>
  );
}

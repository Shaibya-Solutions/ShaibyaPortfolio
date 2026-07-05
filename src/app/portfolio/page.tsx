"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import {
  allProjects,
  websiteProjects,
  solutionProjects,
  rndProjects,
} from "@/data/projects";
import type { Project } from "@/data/projects";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS — site theme (globals.css)
   Brand:   #0ea5e9  sky blue
   Text:    #111827  gray-900
   Muted:   #6B7280  gray-500
   Faint:   #9CA3AF  gray-400
   Border:  #E5E7EB  gray-200
   BG:      #ffffff  / #F8FAFB
   ───────────────────────────────────────────────────────────── */
const BRAND = "#0ea5e9";
const TEXT = "#111827";
const MUTED = "#6B7280";
const FAINT = "#9CA3AF";
const BORDER = "#E5E7EB";
const BG = "#F8FAFB";
const BG_ROW = "#ffffff";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─────────────────────────────────────────────────────────────
   FILTER CONFIG
   ───────────────────────────────────────────────────────────── */
const FILTERS = [
  { label: "ALL WORK", value: "all" },
  { label: "WEBSITES", value: "website" },
  { label: "SOLUTIONS", value: "solution" },
  { label: "R&D / MVPS", value: "rnd" },
] as const;
type FilterValue = (typeof FILTERS)[number]["value"];

const typeLabel: Record<string, string> = {
  website: "Web Development",
  solution: "AI & Automation",
  rnd: "R&D / MVP",
};

/* ─────────────────────────────────────────────────────────────
   SOLAR SYSTEM COMPONENT
   ───────────────────────────────────────────────────────────── */
interface OrbitMetric {
  id: number;
  label: string;
  value: number;
  suffix?: string;
  planetName: string;
  orbitRadius: number;
  highlightColor: string;
}

const ORBIT_METRICS: OrbitMetric[] = [
  { id: 1, label: "Website Projects", value: 7, suffix: "+", planetName: "Mercury", orbitRadius: 72, highlightColor: "#E0E0E0" },
  { id: 2, label: "AI & Automation", value: 6, suffix: "+", planetName: "Venus", orbitRadius: 104, highlightColor: "#FFECB3" },
  { id: 3, label: "Live Clients", value: 15, suffix: "+", planetName: "Earth", orbitRadius: 136, highlightColor: "#81D4FA" },
  { id: 4, label: "R&D / MVPs", value: 6, suffix: "+", planetName: "Mars", orbitRadius: 168, highlightColor: "#FF8A65" },
  { id: 5, label: "Industries Served", value: 8, suffix: "+", planetName: "Jupiter", orbitRadius: 200, highlightColor: "#FFCC80" },
  { id: 6, label: "Leads Captured", value: 3, suffix: "k+", planetName: "Saturn", orbitRadius: 232, highlightColor: "#DCE775" },
];

function PortfolioSolarSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [hovered, setHovered] = useState<OrbitMetric | null>(null);
  const [active, setActive] = useState<OrbitMetric | null>(null);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const maxVal = useMemo(() => Math.max(...ORBIT_METRICS.map(m => m.value)), []);
  const getPlanetSize = (val: number) => 28 + (val / maxVal) * 32; // 28–60px

  const displayed = active ?? hovered;

  return (
    <div ref={ref} className="relative flex items-center justify-center w-full" style={{ height: 520 }}>
      {/* Soft radial glow on light bg */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />

      {/* Orbit rings */}
      <motion.div className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 1 }}>
        {ORBIT_METRICS.map(m => (
          <motion.div key={`ring-${m.id}`}
            className="absolute rounded-full border"
            style={{
              width: m.orbitRadius * 2,
              height: m.orbitRadius * 2,
              borderColor: displayed?.id === m.id ? m.highlightColor : "rgba(0,0,0,0.10)",
              boxShadow: displayed?.id === m.id ? `0 0 12px 2px ${m.highlightColor}55` : "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Center core */}
      <motion.div
        className="z-20 flex flex-col items-center justify-center text-center rounded-2xl border shadow-md"
        style={{
          width: 100,
          height: 100,
          background: "#ffffff",
          borderColor: BORDER,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {displayed ? (
          <>
            <div className="text-lg font-extrabold leading-none" style={{ color: BRAND }}>{displayed.value}{displayed.suffix}</div>
            <div className="text-[10px] mt-1 px-2 leading-tight" style={{ color: MUTED }}>{displayed.label}</div>
          </>
        ) : (
          <>
            <div className="text-sm font-bold" style={{ color: TEXT }}>19+</div>
            <div className="text-[10px] mt-0.5" style={{ color: FAINT }}>Projects</div>
          </>
        )}
      </motion.div>

      {/* Rotating planets container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
      >
        {ORBIT_METRICS.map((m, i) => {
          const angle = (i / ORBIT_METRICS.length) * 2 * Math.PI;
          const x = m.orbitRadius * Math.cos(angle);
          const y = m.orbitRadius * Math.sin(angle);
          const size = getPlanetSize(m.value);
          const isHighlighted = displayed?.id === m.id;

          return (
            <motion.div
              key={m.id}
              className="absolute cursor-pointer rounded-full"
              custom={i}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, scale: 0.2 },
                visible: (i) => ({
                  opacity: 1,
                  scale: isHighlighted ? 1.25 : 1,
                  transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
                }),
              }}
              style={{
                width: size,
                height: size,
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: `translate(-50%, -50%) rotate(-${(360 / ORBIT_METRICS.length) * i}deg)`,
                backgroundImage: `url(/images/landing/${m.planetName.toLowerCase()}.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: isHighlighted
                  ? `0 0 20px 8px ${m.highlightColor}88`
                  : "0 2px 12px rgba(0,0,0,0.18)",
                zIndex: isHighlighted ? 30 : 10,
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={() => { if (!active) setHovered(m); }}
              onMouseLeave={() => { if (!active) setHovered(null); }}
              onClick={() => setActive(prev => prev?.id === m.id ? null : m)}
            >
              {/* Counter-rotated label */}
              <span
                className="absolute text-[10px] w-[80px] text-center pointer-events-none font-semibold leading-tight"
                style={{
                  color: FAINT,
                  transform: `translateY(${size / 2 + 14}px) rotate(${(360 / ORBIT_METRICS.length) * i}deg)`,
                  left: "50%",
                  marginLeft: -40,
                }}
              >
                {m.planetName}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED STAT COUNTER
   ───────────────────────────────────────────────────────────── */
function AnimatedStat({
  value,
  label,
  active,
}: {
  value: string;
  label: string;
  active: boolean;
}) {
  const match = value.match(/^[\d.]+/);
  const numericPart: number | null = match ? parseFloat(match[0]) : null;
  const suffix = numericPart !== null ? value.slice(match![0].length) : "";

  const [displayed, setDisplayed] = useState(numericPart ?? 0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current || numericPart === null) return;
    hasRun.current = true;
    const target = numericPart;
    const duration = 1200;
    const t0 = performance.now();

    function tick(now: number) {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(eased * target);
      if (t < 1) requestAnimationFrame(tick);
      else setDisplayed(target);
    }
    requestAnimationFrame(tick);
  }, [active, numericPart]);

  const formatted =
    numericPart !== null
      ? numericPart % 1 === 0
        ? Math.round(displayed).toString()
        : displayed.toFixed(1)
      : value;

  return (
    <div className="flex flex-col gap-1">
      {/* Large bold number */}
      <span
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          fontWeight: 800,
          lineHeight: 1,
          color: TEXT,
          letterSpacing: "-0.03em",
        }}
      >
        {numericPart !== null ? `${formatted}${suffix}` : value}
      </span>
      <span
        style={{
          fontSize: 11,
          color: FAINT,
          fontFamily: "var(--font-inter)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CASE STUDY ROW
   ───────────────────────────────────────────────────────────── */
function CaseStudyRow({
  project: p,
  index,
}: {
  project: Project;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.12 });
  const [hovered, setHovered] = useState(false);

  /* Alternation — 0-based, so index 0 = odd visually (image left) */
  const imageOnLeft = index % 2 === 0;
  const rowNum = String(index + 1).padStart(2, "0");

  /* Slide variants */
  const imgVar = {
    hidden: { opacity: 0, x: imageOnLeft ? -60 : 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
  };
  const txtVar = {
    hidden: { opacity: 0, x: imageOnLeft ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.12, ease: EASE } },
  };

  /* ── IMAGE HALF ── */
  const ImageHalf = (
    <motion.div
      variants={imgVar}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative w-full lg:w-1/2 overflow-hidden"
      style={{ minHeight: "clamp(320px, 48vw, 640px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {p.thumbnail ? (
        <>
          <Image
            src={p.thumbnail}
            alt={p.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
            style={{
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(17,24,39,0.50)" }}
          >
            {p.liveUrl ? (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white font-bold px-7 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform"
                style={{
                  color: TEXT,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  letterSpacing: "0.03em",
                }}
              >
                Visit Live Site <ArrowUpRight size={14} />
              </a>
            ) : (
              <span
                className="text-white font-bold uppercase tracking-widest px-5 py-2.5 rounded-full"
                style={{
                  fontSize: 11,
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                NDA / Confidential
              </span>
            )}
          </motion.div>
        </>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "#F1F5F9" }}
        >
          <span style={{ color: FAINT, fontSize: 13 }}>No preview</span>
        </div>
      )}
    </motion.div>
  );

  /* ── TEXT HALF ── */
  const TextHalf = (
    <motion.div
      variants={txtVar}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative w-full lg:w-1/2 flex flex-col justify-center overflow-hidden"
      style={{
        padding: "clamp(44px, 7vw, 96px) clamp(32px, 5.5vw, 80px)",
        background: BG_ROW,
        minHeight: "clamp(320px, 48vw, 640px)",
      }}
    >
      {/* Ghost number watermark */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(110px, 16vw, 200px)",
          fontWeight: 900,
          color: TEXT,
          opacity: 0.04,
          lineHeight: 1,
          top: "50%",
          transform: "translateY(-50%)",
          left: imageOnLeft ? "-0.04em" : "auto",
          right: imageOnLeft ? "auto" : "-0.04em",
          letterSpacing: "-0.06em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {rowNum}
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6">

        {/* Top row: serial + industry + visit link */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                fontWeight: 700,
                color: BRAND,
                letterSpacing: "0.06em",
              }}
            >
              {rowNum}
            </span>
            <span style={{ color: BORDER }}>·</span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                fontWeight: 700,
                color: FAINT,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
              }}
            >
              {p.industry}
            </span>
          </div>

          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 shrink-0"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                fontWeight: 700,
                color: FAINT,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = FAINT)}
            >
              VISIT
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>

        {/* Service type pill — brand blue */}
        <span
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            fontFamily: "var(--font-inter)",
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: BRAND,
            background: "rgba(14,165,233,0.08)",
            border: "1px solid rgba(14,165,233,0.20)",
            borderRadius: 9999,
            padding: "4px 12px",
          }}
        >
          {typeLabel[p.type]}
        </span>

        {/* Project name — large, bold, uppercase */}
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            color: TEXT,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {p.name}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: MUTED,
            lineHeight: 1.65,
            maxWidth: 400,
            margin: 0,
          }}
        >
          {p.tagline}
        </p>

        {/* Stats */}
        {p.stats.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(20px, 3vw, 36px)",
              paddingTop: 8,
            }}
          >
            {p.stats.slice(0, 3).map((s) => (
              <AnimatedStat
                key={s.label}
                value={s.value}
                label={s.label}
                active={inView}
              />
            ))}
          </div>
        )}

        {/* Separator */}
        <div style={{ height: 1, background: BORDER }} />

        {/* Tech stack + year */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 8px" }}>
            {p.techStack.slice(0, 5).map((t, ti) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  color: FAINT,
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.03em",
                }}
              >
                {t}
                {ti < Math.min(p.techStack.length, 5) - 1 && (
                  <span style={{ margin: "0 6px", color: BORDER }}>·</span>
                )}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: 11,
              color: FAINT,
              fontFamily: "var(--font-inter)",
              letterSpacing: "0.08em",
            }}
          >
            {p.year}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div ref={rowRef}>
      {index > 0 && <div style={{ height: 1, background: BORDER }} />}
      <div
        className="flex flex-col lg:flex-row"
        style={{ minHeight: "clamp(320px, 55vh, 640px)" }}
      >
        {imageOnLeft
          ? <>{ImageHalf}{TextHalf}</>
          : <>{TextHalf}{ImageHalf}</>
        }
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
export default function PortfolioPage() {
  const [active, setActive] = useState<FilterValue>("all");
  const [visibleCount, setVisibleCount] = useState(4);

  const filtered: Project[] =
    active === "all" ? allProjects
      : active === "website" ? websiteProjects
        : active === "solution" ? solutionProjects
          : rndProjects;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: BG, color: TEXT }}
    >
      <SiteHeader />

      {/* ── HEADER ── */}
      <section
        style={{
          paddingTop: "clamp(100px, 14vw, 176px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          borderBottom: `1px solid ${BORDER}`,
          background: BG,
          overflow: "hidden",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">

            {/* Left — text */}
            <div className="flex-1 lg:pr-8">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: BRAND,
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  marginBottom: 20,
                }}
              >
                Portfolio
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 }}
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: "-0.05em",
                  color: TEXT,
                  textTransform: "uppercase",
                  marginBottom: 28,
                }}
              >
                SELECTED
                <br />
                <span style={{ color: BRAND }}>WORK</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(15px, 1.5vw, 18px)",
                  color: MUTED,
                  lineHeight: 1.7,
                  maxWidth: 480,
                }}
              >
                Recent websites, platforms, and product experiences
                built for real clients across India and the US.
              </motion.p>
            </div>

            {/* Right — solar system */}
            <div className="hidden lg:block w-[520px] shrink-0">
              <PortfolioSolarSystem />
            </div>

          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div
        style={{
          background: BG,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            role="tablist"
            aria-label="Filter projects by type"
            className="flex overflow-x-auto scrollbar-hide"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={active === f.value}
                onClick={() => { setActive(f.value); setVisibleCount(4); }}
                className="relative shrink-0 px-5 py-[18px] transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: active === f.value ? TEXT : FAINT,
                }}
              >
                {f.label}
                {active === f.value && (
                  <motion.div
                    layoutId="pf-underline"
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: 2, background: BRAND }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROWS ── */}
      <section className="flex-grow" style={{ background: BG_ROW }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {filtered.length === 0 ? (
              <div
                className="py-40 text-center"
                style={{ color: FAINT, fontFamily: "var(--font-inter)", fontSize: 14 }}
              >
                No projects in this category.
              </div>
            ) : (
              visible.map((p, i) => (
                <CaseStudyRow key={p.slug} project={p} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* View more button */}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "32px clamp(24px,4vw,48px) 40px", borderTop: `1px solid ${BORDER}` }}>
            <button
              onClick={() => setVisibleCount(c => c + 4)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: BRAND,
                background: "rgba(14,165,233,0.07)",
                border: `1px solid rgba(14,165,233,0.22)`,
                borderRadius: 9999,
                padding: "10px 24px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(14,165,233,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(14,165,233,0.07)";
              }}
            >
              View more
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8m0 0L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          background: BG,
          padding: "clamp(64px,8vw,120px) clamp(24px,4vw,48px)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.26em",
                color: FAINT,
                marginBottom: 20,
              }}
            >
              Now Booking
            </p>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: TEXT,
              }}
            >
              READY TO BUILD
              <br />
              SOMETHING
              <br />
              <span style={{ color: BRAND }}>UNFORGETTABLE?</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 items-start lg:items-end shrink-0">
            <WhatsAppCTA
              message="Hi, I saw your portfolio and I'd like to discuss a project."
              text="Start a conversation"
            />
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: FAINT,
              }}
            >
              No commitment. Just an honest conversation.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

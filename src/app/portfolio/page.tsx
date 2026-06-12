"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
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

  const filtered: Project[] =
    active === "all" ? allProjects
      : active === "website" ? websiteProjects
        : active === "solution" ? solutionProjects
          : rndProjects;

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
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Label */}
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

          {/* Display heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: MUTED,
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            Recent websites, platforms, and product experiences
            built for real clients across India and the US.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div
        className="sticky z-40"
        style={{
          top: 64,
          background: "rgba(248,250,251,0.96)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
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
                onClick={() => setActive(f.value)}
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
              filtered.map((p, i) => (
                <CaseStudyRow key={p.slug} project={p} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
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

      <SiteFooter />
    </main>
  );
}

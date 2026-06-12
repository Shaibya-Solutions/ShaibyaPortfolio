"use client";

import {
    useRef,
    useState,
    useEffect,
    useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS  — site theme (globals.css)
   Brand:   #0ea5e9  sky blue  (--brand)
   Text:    #111827  gray-900  (--foreground)
   Muted:   #6B7280  gray-500
   Light:   #9CA3AF  gray-400
   Border:  #E5E7EB  gray-200  (--border)
   BG:      #F8FAFB  gray-50
   ───────────────────────────────────────────────────────────── */
const T = {
    bg: "#F8FAFB",   // --gray-50  (site section bg)
    bgCard: "#FFFFFF",   // white cards
    bgBrowser: "#F1F5F9",   // browser chrome shell
    bgBar: "#E5E7EB",   // browser top bar
    text: "#111827",   // --gray-900
    textMuted: "#6B7280",   // --gray-500
    textLight: "#9CA3AF",   // --gray-400
    border: "#E5E7EB",   // --gray-200
    accent: "#0ea5e9",   // --brand  (sky blue — used for ALL accents)
    brand: "#0ea5e9",   // same — tags, pills, serial numbers
    shadow: "rgba(17,24,39,0.08)",
} as const;

/* ─────────────────────────────────────────────────────────────
   PROJECTS DATA
   ───────────────────────────────────────────────────────────── */
const PROJECTS = [
    {
        serial: "01",
        title: "CoalTrack AI",
        client: "Coal Distribution Co.",
        tagline: "Smart billing automation",
        tags: ["AI", "AUTOMATION"],
        stats: [
            { value: "95%", label: "Faster billing" },
            { value: "75%", label: "Manpower cut" },
            { value: "500+", label: "Bills/day" },
        ],
        tech: ["Python", "OCR", "FastAPI"],
        link: "/portfolio",
        image: "/images/screenshots/client-1.png",
        year: "2024",
        desc: "Turned a 7-day manual billing process into a 4-hour AI workflow. One photo upload — fully structured data, zero manual entry.",
    },
    {
        serial: "02",
        title: "Revolution Fitness",
        client: "Revolution Fitness Nagpur",
        tagline: "End-to-end gym platform",
        tags: ["MOBILE", "MARKETING"],
        stats: [
            { value: "120→350", label: "Members in 3 months" },
            { value: "30%", label: "Revenue growth" },
        ],
        tech: ["React Native", "Node.js", "Branding"],
        link: "/portfolio",
        image: "/images/screenshots/revolution-fitness.png",
        year: "2024",
        desc: "Full gym management, automated renewals, and a digital brand presence that grew membership 3× in 90 days.",
    },
    {
        serial: "03",
        title: "VIMS Hospital",
        client: "VIMS Hospital Nagpur",
        tagline: "Digital presence & SEO growth",
        tags: ["WEB", "SEO"],
        stats: [
            { value: "2.5×", label: "New patients" },
            { value: "#13", label: "SEO rank at launch" },
        ],
        tech: ["Next.js", "SEO", "Analytics"],
        link: "/portfolio",
        image: "/images/screenshots/vims-hospital.png",
        year: "2024",
        desc: "Zero to full digital presence — online booking, 150+ doctor profiles, and an SEO strategy that moved ranking from 50 to 13.",
    },
    {
        serial: "04",
        title: "MG Infra Properties",
        client: "MG Infra Nagpur",
        tagline: "Website + HRMS in 3 days",
        tags: ["WEB", "SOFTWARE"],
        stats: [
            { value: "80%", label: "Tasks faster" },
            { value: "3 days", label: "Full delivery" },
        ],
        tech: ["React", "Node.js", "HRMS"],
        link: "/portfolio",
        image: "/images/screenshots/mg-infra.png",
        year: "2024",
        desc: "Property management suite, lead capture pipeline, and full HRMS — all designed, built, and deployed in 72 hours.",
    },
    {
        serial: "05",
        title: "GoldHarvest Pro",
        client: "GoldHarvest FinTech",
        tagline: "300 → 1200+ customers, digitally",
        tags: ["AI", "FINTECH"],
        stats: [
            { value: "4×", label: "Customer growth" },
            { value: "1200+", label: "Active users" },
        ],
        tech: ["Python", "AI", "FinTech APIs"],
        link: "/portfolio",
        image: "/images/screenshots/client-2.png",
        year: "2025",
        desc: "AI-assisted KYC, automated onboarding, and FinTech integrations that grew the customer base from 300 to 1200+ in six months.",
    },
] as const;

const TOTAL = PROJECTS.length;

/* ─────────────────────────────────────────────────────────────
   SCROLL ENGINE  (v3 — spec-accurate)
   ─────────────────────────────────────────────────────────────
   ENTRY  — lock only when getBoundingClientRect().top <= 0
             AND .bottom >= window.innerHeight  (fully covers viewport)
   DURING — each wheel/swipe tick advances exactly one project;
             preventDefault() called only while locked
   EXIT   — on first project + scroll-up  → release (no preventDefault)
           — on last project  + scroll-down → release (no preventDefault)
   ───────────────────────────────────────────────────────────── */
const ANIM_DURATION = 700; // ms per project transition

function useScrollEngine() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [imageProgress, setImageProgress] = useState(0);

    const activeIndexRef = useRef(0);
    const imageProgressRef = useRef(0);
    const animatingRef = useRef(false);  // blocks new advances mid-animation
    const isLockedRef = useRef(false);  // are we currently capturing scroll?
    const lastTouchYRef = useRef<number | null>(null);

    /* ─── helpers ─────────────────────────────────────────── */

    /** Returns true when the wrapper fully covers the viewport. */
    const isSectionFullScreen = useCallback((): boolean => {
        const el = wrapperRef.current;
        if (!el) return false;
        const r = el.getBoundingClientRect();
        // top must be at or above viewport-top; bottom at or below viewport-bottom
        return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    }, []);

    /* ─── rAF animation ───────────────────────────────────── */
    const animateTo = useCallback((target: number) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        const start = imageProgressRef.current;
        const startTime = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

        function tick(now: number) {
            const t = Math.min(1, (now - startTime) / ANIM_DURATION);
            const current = start + (target - start) * easeOut(t);
            imageProgressRef.current = current;
            setImageProgress(current);
            if (t < 1) {
                requestAnimationFrame(tick);
            } else {
                imageProgressRef.current = target;
                setImageProgress(target);
                animatingRef.current = false;
            }
        }
        requestAnimationFrame(tick);
    }, []);

    /* ─── advance one project step ────────────────────────── */
    const advance = useCallback((dir: 1 | -1) => {
        if (animatingRef.current) return;
        const next = activeIndexRef.current + dir;
        if (next < 0 || next >= TOTAL) return;
        activeIndexRef.current = next;
        setActiveIndex(next);
        animateTo(next);
    }, [animateTo]);

    /* ─── dot-nav jump ────────────────────────────────────── */
    const jumpToProject = useCallback((i: number) => {
        if (animatingRef.current) return;
        activeIndexRef.current = i;
        setActiveIndex(i);
        animateTo(i);
        wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [animateTo]);

    /* ─── wheel handler ───────────────────────────────────── */
    useEffect(() => {
        const onWheel = (e: globalThis.WheelEvent) => {
            const goingDown = e.deltaY > 0;
            const idx = activeIndexRef.current;

            // ── ENTRY: should we lock? ──────────────────────
            if (!isLockedRef.current) {
                // Only lock if the section fully fills the viewport
                // AND the user is scrolling into it (downward)
                if (!isSectionFullScreen()) return; // not yet full-screen → let page scroll
                // Section is full-screen: lock and absorb this first tick
                isLockedRef.current = true;
            }

            // ── EXIT: release if at a boundary ─────────────
            if (goingDown && idx >= TOTAL - 1) {
                // Last project + scrolling down → unlock, let page scroll
                isLockedRef.current = false;
                return; // do NOT preventDefault — browser scrolls page down
            }
            if (!goingDown && idx <= 0) {
                // First project + scrolling up → unlock, let page scroll
                isLockedRef.current = false;
                return; // do NOT preventDefault — browser scrolls page up
            }

            // ── MID-STACK: capture and advance ─────────────
            e.preventDefault();
            e.stopPropagation();
            advance(goingDown ? 1 : -1);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [advance, isSectionFullScreen]);

    /* ─── touch handler ───────────────────────────────────── */
    useEffect(() => {
        const SWIPE_THRESHOLD = 40; // px

        const onTouchStart = (e: TouchEvent) => {
            lastTouchYRef.current = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (lastTouchYRef.current === null) return;

            const dy = lastTouchYRef.current - e.touches[0].clientY;
            const goingDown = dy > 0;
            const idx = activeIndexRef.current;

            // Attempt lock if not already locked
            if (!isLockedRef.current) {
                if (!isSectionFullScreen()) return;
                isLockedRef.current = true;
            }

            // Exit boundaries
            if (goingDown && idx >= TOTAL - 1) { isLockedRef.current = false; return; }
            if (!goingDown && idx <= 0) { isLockedRef.current = false; return; }

            // Only fire once per swipe gesture (threshold guard)
            if (Math.abs(dy) < SWIPE_THRESHOLD) return;

            e.preventDefault();
            advance(goingDown ? 1 : -1);
            lastTouchYRef.current = null; // one swipe → one project
        };

        const onTouchEnd = () => { lastTouchYRef.current = null; };

        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [advance, isSectionFullScreen]);

    /* ─── Re-lock when user scrolls back into section ─────── */
    // When the user scrolls back up PAST the section after exiting
    // and then scrolls back down into it, we need isLockedRef to
    // reset so it can lock again. We do this by watching scroll
    // position: if the section is no longer full-screen, clear lock.
    useEffect(() => {
        const onScroll = () => {
            if (isLockedRef.current && !isSectionFullScreen()) {
                isLockedRef.current = false;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isSectionFullScreen]);

    return { wrapperRef, imageProgress, activeIndex, jumpToProject };
}

/* ─────────────────────────────────────────────────────────────
   INFO CARD
   ───────────────────────────────────────────────────────────── */
function InfoCard({
    project: p,
    position,
}: {
    project: (typeof PROJECTS)[number];
    position: "top-right" | "bottom-left";
}) {
    const isTopRight = position === "top-right";

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={p.serial + position}
                initial={{ opacity: 0, x: isTopRight ? 20 : -20, y: isTopRight ? -10 : 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isTopRight ? 12 : -12, y: isTopRight ? -6 : 6 }}
                transition={{ type: "spring", stiffness: 200, damping: 28, delay: isTopRight ? 0.08 : 0 }}
                style={{
                    position: "absolute",
                    zIndex: 10,
                    width: "clamp(190px, 20vw, 270px)",
                    ...(isTopRight
                        ? { top: "-11%", right: "-5%" }
                        : { bottom: "-11%", left: "-5%" }),
                    background: T.bgCard,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    padding: "clamp(14px, 1.4vw, 20px)",
                    boxShadow: `0 4px 24px ${T.shadow}, 0 1px 4px rgba(17,24,39,0.06)`,
                }}
            >
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                    <div>
                        <div style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
                            textTransform: "uppercase", color: T.accent,
                            fontFamily: "var(--font-inter)", marginBottom: 3,
                        }}>
                            {p.serial} / {p.year}
                        </div>
                        <div style={{
                            fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 800,
                            color: T.text, fontFamily: "var(--font-syne)",
                            letterSpacing: "-0.03em", lineHeight: 1.15,
                        }}>
                            {p.title}
                        </div>
                    </div>
                    {/* Orange icon pill */}
                    <div style={{
                        width: 28, height: 28, borderRadius: 7,
                        background: T.accent, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginLeft: 10,
                    }}>
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M2 2h4v2H4v6h6V8h2v4H2V2z" fill="white" />
                            <path d="M8 2h4v4h-2V4.8L5.4 9.4 4 8 8.8 3.2H8V2z" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* Tagline */}
                <p style={{
                    fontSize: 11, color: T.textMuted, fontFamily: "var(--font-inter)",
                    lineHeight: 1.5, margin: "0 0 10px",
                }}>
                    {p.tagline}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                    {p.tags.map((tag) => (
                        <span key={tag} style={{
                            display: "inline-block",
                            background: "rgba(14,165,233,0.07)",
                            border: `1px solid rgba(14,165,233,0.22)`,
                            color: T.brand,
                            fontFamily: "var(--font-inter)",
                            borderRadius: 9999, padding: "2px 8px",
                            fontSize: 10, fontWeight: 600,
                            letterSpacing: "0.1em", textTransform: "uppercase",
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Stats */}
                <div style={{
                    display: "flex", gap: 14,
                    paddingTop: 10,
                    borderTop: `1px solid ${T.border}`,
                }}>
                    {p.stats.slice(0, 2).map((s) => (
                        <div key={s.label}>
                            <div style={{
                                fontSize: "clamp(16px, 1.5vw, 20px)", fontWeight: 800,
                                color: T.text, fontFamily: "var(--font-syne)", lineHeight: 1,
                            }}>
                                {s.value}
                            </div>
                            <div style={{
                                fontSize: 10, color: T.textLight,
                                fontFamily: "var(--font-inter)", marginTop: 3,
                            }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech + link row */}
                <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginTop: 10,
                }}>
                    <div style={{ display: "flex", gap: 5 }}>
                        {p.tech.slice(0, 3).map((t, ti) => (
                            <span key={t} style={{
                                fontSize: 10, color: T.textLight,
                                fontFamily: "var(--font-inter)",
                            }}>
                                {t}{ti < Math.min(p.tech.length, 3) - 1 ? " ·" : ""}
                            </span>
                        ))}
                    </div>
                    <Link href={p.link} style={{
                        display: "flex", alignItems: "center", gap: 3,
                        color: T.accent, fontSize: 10, fontWeight: 700,
                        fontFamily: "var(--font-inter)", letterSpacing: "0.1em",
                        textTransform: "uppercase", textDecoration: "none",
                    }}>
                        View <ArrowUpRight size={10} />
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

/* ─────────────────────────────────────────────────────────────
   BROWSER FRAME
   — shell is completely static
   — only the inner translateY div moves
   — aspect ratio 16:9 is preserved at all times
   ───────────────────────────────────────────────────────────── */
function BrowserFrame({
    imageProgress,
    activeIndex,
    onDotClick,
}: {
    imageProgress: number;
    activeIndex: number;
    onDotClick: (i: number) => void;
}) {
    const proj = PROJECTS[activeIndex];

    /*
      imageProgress is an integer (0, 1, 2 …) between projects.
      During animation it floats e.g. 0 → 1.
      The image translates from 0% (progress=N) to -55% (progress=N+1).
      localFrac = fractional part within the current project's step.
    */
    const localFrac = Math.max(0, Math.min(1, imageProgress - activeIndex));
    const imageY = localFrac * -55; // 0% → -55%

    return (
        <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "clamp(480px, 60vw, 880px)",
            flexShrink: 0,
        }}>
            {/* Floating info cards */}
            <InfoCard project={proj} position="top-right" />
            <InfoCard project={proj} position="bottom-left" />

            {/* ── Browser shell — NEVER moves ── */}
            <div style={{
                width: "100%",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: `0 20px 60px rgba(17,24,39,0.14), 0 4px 16px rgba(17,24,39,0.08), 0 0 0 1px ${T.border}`,
                background: T.bgBrowser,
                position: "relative",
                transform: "translateZ(0)", // own compositing layer — never translates
            }}>

                {/* Browser top bar */}
                <div style={{
                    height: 36,
                    background: T.bgBar,
                    display: "flex", alignItems: "center",
                    padding: "0 14px", gap: 10,
                    borderBottom: `1px solid ${T.border}`,
                    flexShrink: 0,
                }}>
                    {/* Traffic lights */}
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
                        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FFBD2E" }} />
                        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
                    </div>
                    {/* URL bar */}
                    <div style={{
                        flex: 1, height: 20,
                        background: "rgba(17,24,39,0.07)",
                        borderRadius: 4,
                        display: "flex", alignItems: "center",
                        paddingLeft: 8, gap: 5,
                    }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
                        <span style={{
                            fontSize: 10, color: T.textMuted,
                            fontFamily: "var(--font-inter)", letterSpacing: "0.02em",
                            overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                        }}>
                            shaibya.solutions / {proj.title.toLowerCase().replace(/\s+/g, "-")}
                        </span>
                    </div>
                    <ExternalLink size={11} color={T.textLight} />
                </div>

                {/* ── Screenshot viewport — 16:9, clips the scrolling image ── */}
                <div style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    background: "#E8E4DF",
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ position: "absolute", inset: 0 }}
                        >
                            {/* ← THE ONLY THING THAT MOVES */}
                            <div style={{
                                position: "absolute",
                                top: 0, left: 0, right: 0,
                                height: "160%",                         // extra height for scroll room
                                transform: `translateY(${imageY}%)`,    // driven by imageProgress
                                willChange: "transform",
                                // transition matches ANIM_DURATION with ease-out so it feels identical
                                transition: `transform ${ANIM_DURATION}ms cubic-bezier(0.16,1,0.3,1)`,
                            }}>
                                <Image
                                    src={proj.image}
                                    alt={proj.title}
                                    fill
                                    sizes="(max-width: 960px) 100vw, 880px"
                                    style={{ objectFit: "cover", objectPosition: "top center" }}
                                    priority={activeIndex === 0}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Subtle bottom vignette */}
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
                        background: "linear-gradient(to bottom, transparent 70%, rgba(17,24,39,0.06) 100%)",
                    }} />
                </div>
            </div>

            {/* Client label above frame */}
            <div style={{
                position: "absolute", top: -26, left: 14,
                fontSize: 11, color: T.textLight,
                fontFamily: "var(--font-inter)", letterSpacing: "0.05em",
            }}>
                {proj.client}
            </div>

            {/* Dot nav */}
            <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 7, marginTop: 20,
            }}>
                {PROJECTS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onDotClick(i)}
                        aria-label={`Jump to project ${i + 1}`}
                        style={{
                            width: i === activeIndex ? 24 : 7,
                            height: 7,
                            borderRadius: 999,
                            background: i === activeIndex ? T.accent : T.border,
                            border: "none", cursor: "pointer", padding: 0,
                            transition: "all 0.3s ease", flexShrink: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS RAIL — bottom centre
   ───────────────────────────────────────────────────────────── */
function ProgressRail({ activeIndex }: { activeIndex: number }) {
    return (
        <div style={{
            position: "absolute", bottom: 20, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 10,
        }}>
            <span style={{
                fontFamily: "var(--font-inter)", fontSize: 10,
                color: T.textLight, letterSpacing: "0.18em",
                textTransform: "uppercase",
            }}>
                {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <div style={{
                width: 100, height: 2,
                background: T.border, borderRadius: 999, overflow: "hidden",
            }}>
                <motion.div
                    animate={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
                    transition={{ duration: ANIM_DURATION / 1000, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: "100%", background: T.accent, borderRadius: 999 }}
                />
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER
   ───────────────────────────────────────────────────────────── */
function SectionHeader() {
    return (
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 3.5vh, 40px)" }}>
            <span style={{
                display: "inline-block",
                color: T.accent,
                fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14,
            }}>
                Our Work
            </span>
            <h2 style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
                letterSpacing: "-0.04em", fontWeight: 800,
                lineHeight: 1.0, margin: 0, color: T.text,
            }}>
                Problems solved.{" "}
                <span style={{ color: T.accent }}>Results proven.</span>
            </h2>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE LAYOUT
   ───────────────────────────────────────────────────────────── */
function MobileLayout() {
    return (
        <section style={{ background: T.bg, padding: "72px 20px 80px" }} aria-label="Our Work">
            <div style={{ textAlign: "center", marginBottom: 36 }}>
                <span style={{ color: T.accent, fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                    Our Work
                </span>
                <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.6rem, 7vw, 2.2rem)", color: T.text, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
                    Problems solved.{" "}
                    <span style={{ color: T.accent }}>Results proven.</span>
                </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {PROJECTS.map((p, i) => (
                    <div key={i} style={{
                        background: T.bgCard,
                        border: `1px solid ${T.border}`,
                        borderRadius: 14, overflow: "hidden",
                        boxShadow: `0 2px 16px ${T.shadow}`,
                    }}>
                        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                            <Image src={p.image} alt={p.title} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                        </div>
                        <div style={{ padding: "18px 18px 20px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                <span style={{ color: T.accent, fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700 }}>{p.serial} / {p.year}</span>
                                <div style={{ display: "flex", gap: 4 }}>
                                    {p.tags.map(t => (
                                        <span key={t} style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.2)", color: T.brand, borderRadius: 999, padding: "2px 7px", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                            <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 19, color: T.text, fontWeight: 700, margin: "0 0 5px" }}>{p.title}</h3>
                            <p style={{ color: T.textMuted, fontSize: 13, fontFamily: "var(--font-inter)", lineHeight: 1.6, margin: "0 0 12px" }}>{p.desc}</p>
                            <div style={{ display: "flex", gap: 14, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                                {p.stats.slice(0, 2).map(s => (
                                    <div key={s.label}>
                                        <div style={{ color: T.text, fontFamily: "var(--font-syne)", fontSize: 17, fontWeight: 800 }}>{s.value}</div>
                                        <div style={{ color: T.textLight, fontSize: 10, fontFamily: "var(--font-inter)", marginTop: 2 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
   STICKY SHELL — reused by desktop + tablet
   ───────────────────────────────────────────────────────────── */
function StickyShell({ children, bg = T.bg }: { children: React.ReactNode; bg?: string }) {
    return (
        <div style={{ position: "sticky", top: 0, height: "100vh", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {children}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP LAYOUT
   ───────────────────────────────────────────────────────────── */
function DesktopLayout() {
    const { wrapperRef, imageProgress, activeIndex, jumpToProject } = useScrollEngine();

    return (
        <div ref={wrapperRef} id="our-work" style={{ height: "120vh", position: "relative" }}>
            <StickyShell>
                <div style={{ padding: "clamp(24px,5vh,56px) clamp(24px,5vw,80px)", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", height: "100%", boxSizing: "border-box" }}>
                    <SectionHeader />

                    <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
                        <BrowserFrame
                            imageProgress={imageProgress}
                            activeIndex={activeIndex}
                            onDotClick={jumpToProject}
                        />
                    </div>
                </div>

                <ProgressRail activeIndex={activeIndex} />

                {/* Scroll hint — fades after first interaction */}
                <motion.div
                    animate={{ opacity: activeIndex > 0 ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: "absolute", right: "clamp(20px,2.5vw,48px)", top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: 8, pointerEvents: "none",
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 7, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                        style={{ width: 1, height: 44, background: `linear-gradient(to bottom, transparent, ${T.brand})`, borderRadius: 999 }}
                    />
                    <span style={{
                        fontSize: 9, color: T.textLight,
                        fontFamily: "var(--font-inter)", letterSpacing: "0.2em",
                        textTransform: "uppercase", writingMode: "vertical-rl",
                    }}>
                        Scroll
                    </span>
                </motion.div>
            </StickyShell>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   TABLET LAYOUT
   ───────────────────────────────────────────────────────────── */
function TabletLayout() {
    const { wrapperRef, imageProgress, activeIndex, jumpToProject } = useScrollEngine();

    return (
        <div ref={wrapperRef} style={{ height: "120vh", position: "relative" }}>
            <StickyShell>
                <div style={{ padding: "28px 20px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", height: "100%", boxSizing: "border-box" }}>
                    <SectionHeader />
                    <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
                        <BrowserFrame imageProgress={imageProgress} activeIndex={activeIndex} onDotClick={jumpToProject} />
                    </div>
                </div>
                <ProgressRail activeIndex={activeIndex} />
            </StickyShell>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   ROOT EXPORT
   ───────────────────────────────────────────────────────────── */
export default function GLOurWork() {
    return (
        <>
            <div className="block sm:hidden">
                <MobileLayout />
            </div>
            <div className="hidden sm:block lg:hidden">
                <TabletLayout />
            </div>
            <div className="hidden lg:block">
                <DesktopLayout />
            </div>
        </>
    );
}

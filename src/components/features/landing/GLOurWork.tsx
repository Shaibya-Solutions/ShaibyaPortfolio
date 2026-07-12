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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        title: "VIMS Hospital",
        client: "VIMS Hospital Nagpur",
        tagline: "Digital presence & SEO growth",
        tags: ["WEB", "SEO"],
        stats: [
            { value: "2.5×", label: "New patients" },
            { value: "#13", label: "SEO rank at launch" },
            { value: "99%", label: "Uptime" },
        ],
        tech: ["Next.js", "SEO", "Analytics"],
        link: "/portfolio",
        image: "/images/screenshots/client-1.png",
        year: "2024",
        desc: "Zero to full digital presence — online booking, 150+ doctor profiles, and an SEO strategy that moved ranking from 50 to 13.",
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
        image: "/images/screenshots/revolution_fitness_desktop.png",
        year: "2024",
        desc: "Full gym management, automated renewals, and a digital brand presence that grew membership 3× in 90 days.",
    },
    {
        serial: "03",
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
        image: "/images/solutions/coal.png",
        year: "2024",
        desc: "Turned a 7-day manual billing process into a 4-hour AI workflow. One photo upload — fully structured data, zero manual entry.",
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
        image: "/images/screenshots/mg_infra_desktop.png",
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

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                id: "our-work-trigger",
                trigger: el,
                start: "top top",
                end: `+=${(TOTAL - 1) * 50}%`,
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    const rawIndex = self.progress * (TOTAL - 1);
                    setImageProgress(rawIndex);

                    const idx = Math.min(Math.round(rawIndex), TOTAL - 1);
                    setActiveIndex(idx);
                }
            });
        }, el);

        return () => ctx.revert();
    }, []);

    const jumpToProject = useCallback((i: number) => {
        const st = ScrollTrigger.getById("our-work-trigger");
        if (st) {
            const targetScroll = st.start + (i / (TOTAL - 1)) * (st.end - st.start);
            window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
    }, []);

    return { wrapperRef, imageProgress, activeIndex, jumpToProject };
}

/* ─────────────────────────────────────────────────────────────
   INFO CARD
   ───────────────────────────────────────────────────────────── */
function InfoCard({
    project: p,
    position,
    activeIndex,
}: {
    project: (typeof PROJECTS)[number];
    position: "top-right" | "bottom-left";
    activeIndex: number;
}) {
    const isTopRight = position === "top-right";
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1200);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Y destination: opposite corners in y direction
    const yTranslation = position === "bottom-left"
        ? (activeIndex % 2 === 0 ? 0 : -220)
        : (activeIndex % 2 === 0 ? 0 : 220);

    // Responsive positioning coordinates
    const positionStyles = isLargeScreen
        ? (isTopRight
            ? { top: "8%", left: "calc(100% + 14px)" }
            : { bottom: "8%", right: "calc(100% + 14px)" })
        : (isTopRight
            ? { top: "5%", left: "calc(100% + 10px)" }
            : { bottom: "5%", right: "calc(100% + 10px)" });

    return (
        <motion.div
            animate={{ y: yTranslation }}
            transition={{
                type: "spring",
                stiffness: 85,
                damping: 18,
                mass: 1,
            }}
            style={{
                position: "absolute",
                zIndex: 10,
                width: isLargeScreen ? "240px" : "clamp(155px, 16vw, 215px)",
                background: T.bgCard,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: isLargeScreen ? "13px 15px" : "clamp(10px, 1.1vw, 14px)",
                boxShadow: `0 10px 30px ${T.shadow}, 0 2px 6px rgba(17,24,39,0.04)`,
                ...positionStyles,
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={p.serial}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                >
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                        <div>
                            <div style={{
                                fontSize: 9, fontWeight: 700, letterSpacing: "0.16em",
                                textTransform: "uppercase", color: T.accent,
                                fontFamily: "var(--font-inter)", marginBottom: 3,
                            }}>
                                {p.serial} / {p.year}
                            </div>
                            <div style={{
                                fontSize: "clamp(12px, 1vw, 14px)", fontWeight: 800,
                                color: T.text, fontFamily: "var(--font-syne)",
                                letterSpacing: "-0.03em", lineHeight: 1.15,
                            }}>
                                {p.title}
                            </div>
                        </div>
                        {/* Icon pill */}
                        <div style={{
                            width: 24, height: 24, borderRadius: 6,
                            background: T.accent, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            flexShrink: 0, marginLeft: 8,
                        }}>
                            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                                <path d="M2 2h4v2H4v6h6V8h2v4H2V2z" fill="white" />
                                <path d="M8 2h4v4h-2V4.8L5.4 9.4 4 8 8.8 3.2H8V2z" fill="white" />
                            </svg>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p style={{
                        fontSize: 10, color: T.textMuted, fontFamily: "var(--font-inter)",
                        lineHeight: 1.5, margin: "0 0 8px",
                    }}>
                        {p.tagline}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                        {p.tags.map((tag) => (
                            <span key={tag} style={{
                                display: "inline-block",
                                background: "rgba(14,165,233,0.07)",
                                border: `1px solid rgba(14,165,233,0.22)`,
                                color: T.brand,
                                fontFamily: "var(--font-inter)",
                                borderRadius: 9999, padding: "2px 7px",
                                fontSize: 9, fontWeight: 600,
                                letterSpacing: "0.1em", textTransform: "uppercase",
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: "flex", gap: 12,
                        paddingTop: 8,
                        borderTop: `1px solid ${T.border}`,
                    }}>
                        {p.stats.slice(0, 2).map((s) => (
                            <div key={s.label}>
                                <div style={{
                                    fontSize: "clamp(13px, 1.2vw, 17px)", fontWeight: 800,
                                    color: T.text, fontFamily: "var(--font-syne)", lineHeight: 1,
                                }}>
                                    {s.value}
                                </div>
                                <div style={{
                                    fontSize: 9, color: T.textLight,
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
                        justifyContent: "space-between", marginTop: 8,
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
        </motion.div>
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
            <InfoCard project={proj} position="top-right" activeIndex={activeIndex} />
            <InfoCard project={proj} position="bottom-left" activeIndex={activeIndex} />

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
                    background: "#ffffff",
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
                            {/* Static image wrapper for smooth cross-fades */}
                            <div style={{ position: "absolute", inset: 0 }}>
                                <Image
                                    src={proj.image}
                                    alt={proj.title}
                                    fill
                                    sizes="(max-width: 960px) 100vw, 880px"
                                    style={{ objectFit: "cover", objectPosition: "top center", background: "#ffffff" }}
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

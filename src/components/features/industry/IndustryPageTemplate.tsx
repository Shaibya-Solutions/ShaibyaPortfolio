"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface IndustryStat {
    value: string;
    label: string;
}

export interface IndustryClient {
    name: string;
    site?: string;
    tag?: string;
    role: string;
    desc: string;
    image: string;
    stats: Array<{ v: string; l: string }>;
}

export interface IndustrySolution {
    emoji: string;
    title: string;
    desc: string;
}

export interface IndustryFAQ {
    q: string;
    a: string;
}

export interface IndustryTransformation {
    label: string;
    before: string;
    after: string;
    pct: number;
}

export interface IndustryPageData {
    slug: string;
    eyebrow: string;
    heroImage: string;
    headline: string[];          // array of lines; last line gets gradient
    heroSub: string;
    heroStats: IndustryStat[];
    contextChapter: {
        label: string;
        paragraphs: string[];
        pullQuote: string;
    };
    painPoints: Array<{ emoji: string; title: string; desc: string; image?: string }>;
    solutions: IndustrySolution[];
    clients: IndustryClient[];
    transformations: IndustryTransformation[];
    ctaTitle: string;
    ctaSub: string;
    ctaMessage: string;
    faqs: IndustryFAQ[];
    accentColor: string;         // e.g. "#0ea5e9"
    accentBg: string;            // e.g. "rgba(14,165,233,0.08)"
    // Optional visual showcase (before/after slider)
    visualShowcase?: {
        beforeSrc: string;
        afterSrc: string;
        heading: string;
        subheading: string;
    };
}

/* ─── Counter hook ───────────────────────────────────────────────── */
function useCountUp(end: number, duration = 1600, trigger: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const inc = end / (duration / 16);
        const timer = setInterval(() => {
            start += inc;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [trigger, end, duration]);
    return count;
}

/* ─── Progress bar ───────────────────────────────────────────────── */
function TransformBar({
    label, before, after, pct, delay, accent,
}: IndustryTransformation & { delay: number; accent: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    return (
        <div ref={ref} className="mb-7">
            <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-semibold text-[#111827]">{label}</span>
                <span className="text-xs text-[#9CA3AF]">
                    {before} <span className="font-bold" style={{ color: accent }}>→</span> {after}
                </span>
            </div>
            <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
                />
            </div>
        </div>
    );
}

/* ─── Pain point bento grid ──────────────────────────────────────── */
const PAIN_COLORS = [
    { c: "#5b8def", tint: "rgba(91,141,239,0.12)", border: "rgba(91,141,239,0.28)", label: "Foundational" },
    { c: "#f2526b", tint: "rgba(242,82,107,0.12)", border: "rgba(242,82,107,0.18)", label: "Urgent" },
    { c: "#9a85f5", tint: "rgba(154,133,245,0.12)", border: "rgba(154,133,245,0.18)", label: "Systemic" },
    { c: "#f2a93b", tint: "rgba(242,169,59,0.12)", border: "rgba(242,169,59,0.18)", label: "Operational" },
    { c: "#3bc7d6", tint: "rgba(59,199,214,0.12)", border: "rgba(59,199,214,0.18)", label: "Recurring" },
];

function PainPointBento({ painPoints, accent }: { painPoints: Array<{ emoji: string; title: string; desc: string; image?: string }>; accent: string }) {
    // Build a grid regardless of how many pain points there are
    const [p0, p1, p2, p3, p4] = painPoints;
    const col = (i: number) => PAIN_COLORS[i % PAIN_COLORS.length];

    return (
        <>
            {/* ── Desktop bento (lg+) ── */}
            <div className="hidden lg:grid gap-[22px]" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>

                {/* Card 1 — tall feature card, spans 7 cols × 2 rows */}
                {p0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
                        className="relative rounded-[24px] flex flex-col justify-between overflow-hidden border border-white/10 bg-[#0c1120] shadow-2xl min-h-[520px] group transition-all duration-500 hover:scale-[1.01]"
                        style={{ gridColumn: "1 / 8", gridRow: "1 / 3" }}
                    >
                        {p0.image && (
                          <div className="relative w-full aspect-[16/10] overflow-hidden">
                            <Image
                              src={p0.image}
                              alt={p0.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1120] to-transparent opacity-80" />
                          </div>
                        )}
                        <div className="p-8 relative z-10 flex-1 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-4" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                                <span style={{ color: "#5d6680" }}>01</span>
                                <span style={{ color: col(0).c }}>{col(0).label}</span>
                            </div>
                            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center mb-4 bg-white/10 border border-white/10 text-white shadow-lg">
                                <span className="text-2xl">{p0.emoji}</span>
                            </div>
                            <h3 className="text-2xl font-bold leading-snug mb-3 text-white" style={{ fontFamily: "var(--font-syne)" }}>{p0.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-400 max-w-[440px]">{p0.desc}</p>
                        </div>
                    </motion.div>
                )}

                {/* Card 2 — top-right horizontal card */}
                {p1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="relative rounded-[24px] flex flex-row overflow-hidden border border-white/10 bg-[#0c1120] shadow-2xl min-h-[240px] group transition-all duration-500 hover:scale-[1.01]"
                        style={{ gridColumn: "8 / 13", gridRow: "1 / 2" }}
                    >
                        {p1.image && (
                            <div className="relative w-[150px] shrink-0 overflow-hidden hidden xl:block">
                                <Image
                                    src={p1.image}
                                    alt={p1.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c1120] opacity-80" />
                            </div>
                        )}
                        <div className="p-7 relative z-10 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-3" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                                <span style={{ color: "#5d6680" }}>02</span>
                                <span style={{ color: col(1).c }}>{col(1).label}</span>
                            </div>
                            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center mb-3 bg-white/10 border border-white/10 text-white shadow-lg">
                                <span className="text-lg">{p1.emoji}</span>
                            </div>
                            <h3 className="text-[17px] font-bold mb-2 leading-snug text-white" style={{ fontFamily: "var(--font-syne)" }}>{p1.title}</h3>
                            <p className="text-[13px] leading-relaxed text-slate-400">{p1.desc}</p>
                        </div>
                    </motion.div>
                )}

                {/* Card 3 — bottom-right horizontal card */}
                {p2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="relative rounded-[24px] flex flex-row overflow-hidden border border-white/10 bg-[#0c1120] shadow-2xl min-h-[240px] group transition-all duration-500 hover:scale-[1.01]"
                        style={{ gridColumn: "8 / 13", gridRow: "2 / 3" }}
                    >
                        {p2.image && (
                            <div className="relative w-[150px] shrink-0 overflow-hidden hidden xl:block">
                                <Image
                                    src={p2.image}
                                    alt={p2.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c1120] opacity-80" />
                            </div>
                        )}
                        <div className="p-7 relative z-10 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-3" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                                <span style={{ color: "#5d6680" }}>03</span>
                                <span style={{ color: col(2).c }}>{col(2).label}</span>
                            </div>
                            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center mb-3 bg-white/10 border border-white/10 text-white shadow-lg">
                                <span className="text-lg">{p2.emoji}</span>
                            </div>
                            <h3 className="text-[17px] font-bold mb-2 leading-snug text-white" style={{ fontFamily: "var(--font-syne)" }}>{p2.title}</h3>
                            <p className="text-[13px] leading-relaxed text-slate-400">{p2.desc}</p>
                        </div>
                    </motion.div>
                )}

                {/* Card 4 — bottom-left vertical card */}
                {p3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="relative rounded-[24px] flex flex-col justify-between overflow-hidden border border-white/10 bg-[#0c1120] shadow-2xl min-h-[360px] group transition-all duration-500 hover:scale-[1.01]"
                        style={{ gridColumn: "1 / 6", gridRow: "3 / 4", marginTop: -26 }}
                    >
                        {p3.image && (
                          <div className="relative w-full aspect-video overflow-hidden">
                            <Image
                              src={p3.image}
                              alt={p3.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1120] to-transparent opacity-80" />
                          </div>
                        )}
                        <div className="p-8 relative z-10 flex-1 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-4" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                                <span style={{ color: "#5d6680" }}>04</span>
                                <span style={{ color: col(3).c }}>{col(3).label}</span>
                            </div>
                            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center mb-4 bg-white/10 border border-white/10 text-white shadow-lg">
                                <span className="text-lg">{p3.emoji}</span>
                            </div>
                            <h3 className="text-[18px] font-bold mb-2 leading-snug text-white" style={{ fontFamily: "var(--font-syne)" }}>{p3.title}</h3>
                            <p className="text-[13px] leading-relaxed text-slate-400">{p3.desc}</p>
                        </div>
                    </motion.div>
                )}

                {/* Card 5 — bottom-right wide flex-row card */}
                {p4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                        className="relative rounded-[24px] flex flex-row overflow-hidden border border-white/10 bg-[#0c1120] shadow-2xl min-h-[360px] group transition-all duration-500 hover:scale-[1.01]"
                        style={{ gridColumn: "6 / 13", gridRow: "3 / 4", marginTop: -26 }}
                    >
                        {p4.image && (
                            <div className="relative w-[220px] shrink-0 overflow-hidden hidden xl:block">
                                <Image
                                    src={p4.image}
                                    alt={p4.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c1120] opacity-80" />
                            </div>
                        )}
                        <div className="p-8 relative z-10 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                                <span style={{ color: "#5d6680" }}>05</span>
                                <span style={{ color: col(4).c }}>{col(4).label}</span>
                            </div>
                            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center mb-4 bg-white/10 border border-white/10 text-white shadow-lg">
                                <span className="text-lg">{p4.emoji}</span>
                            </div>
                            <h3 className="text-[18px] font-bold mb-2 leading-snug text-white" style={{ fontFamily: "var(--font-syne)" }}>{p4.title}</h3>
                            <p className="text-[13px] leading-relaxed text-slate-400 max-w-[500px]">{p4.desc}</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* ── Mobile stack ── */}
            <div className="lg:hidden flex flex-col gap-4">
                {painPoints.map((p, i) => {
                    const clr = PAIN_COLORS[i % PAIN_COLORS.length];
                    return (
                        <motion.div key={p.title}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                            className="relative rounded-[20px] p-7 flex flex-col overflow-hidden min-h-[240px] justify-end"
                            style={{ background: "#0c1120", border: "1px solid #1c2336" }}
                        >
                            {p.image && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080d19] via-[#080d19]/85 to-[#080d19]/40" />
                                </div>
                            )}
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                                    <span style={{ color: "#5d6680" }}>{String(i + 1).padStart(2, "0")}</span>
                                    <span style={{ color: clr.c }}>{clr.label}</span>
                                </div>
                                <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center mb-4 bg-white/10 border border-white/10 text-white shadow-lg">
                                    <span className="text-xl">{p.emoji}</span>
                                </div>
                                <h3 className="text-[18px] font-semibold mb-2 leading-snug" style={{ fontFamily: "var(--font-syne)", color: "#f3f5f9" }}>{p.title}</h3>
                                <p className="text-[13.5px] leading-relaxed" style={{ color: "#9aa3b8" }}>{p.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </>
    );
}

/* ─── Solution icon set (maps solution index → SVG) ─────────────── */
function SolutionIcon({ index, accent }: { index: number; accent: string }) {
    const icons = [
        // 0 — house / website
        <svg key={0} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={23} height={23}>
            <path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" /><path d="M10 20v-6h4v6" />
        </svg>,
        // 1 — chat / CRM
        <svg key={1} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={23} height={23}>
            <path d="M4 5h16v11H8l-4 4z" /><path d="M8 9h8M8 12.5h5" />
        </svg>,
        // 2 — robot / automation
        <svg key={2} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={23} height={23}>
            <rect x="5" y="9" width="14" height="11" rx="2" /><path d="M12 9V5" /><circle cx="12" cy="4" r="1.2" fill={accent} stroke="none" />
            <circle cx="9" cy="14.5" r="1.2" fill={accent} stroke="none" /><circle cx="15" cy="14.5" r="1.2" fill={accent} stroke="none" /><path d="M9 18h6" />
        </svg>,
        // 3 — calendar / scheduler
        <svg key={3} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={23} height={23}>
            <rect x="4" y="5.5" width="16" height="15" rx="2" /><path d="M4 10h16M8 3.5v3M16 3.5v3" /><path d="M8.5 14l1.5 1.5L13.5 12" />
        </svg>,
        // 4 — folder / docs
        <svg key={4} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={23} height={23}>
            <path d="M4 7a1.5 1.5 0 0 1 1.5-1.5h4l1.5 2H19a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 18.5H5.5A1.5 1.5 0 0 1 4 17z" />
        </svg>,
        // 5 — money / commission
        <svg key={5} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={23} height={23}>
            <circle cx="12" cy="13" r="7.5" /><path d="M12 9.5v7M9.8 11.3c0-1 1-1.6 2.2-1.6s2.2.6 2.2 1.5c0 2.2-4.4 1.1-4.4 3.3 0 .9 1 1.6 2.2 1.6s2.2-.6 2.2-1.5" /><path d="M10 3.5h4" />
        </svg>,
    ];
    return icons[index % icons.length];
}

/* ─── Animated node ──────────────────────────────────────────────── */
function TimelineNode({ index, accent, inView }: { index: number; accent: string; inView: boolean }) {
    // stagger delay matching the pulse travel: 9s cycle, 6 nodes → ~1.5s apart
    const delay = index * 1.5;
    return (
        <motion.div
            className="w-[54px] h-[54px] rounded-full border-2 bg-white flex items-center justify-center shrink-0"
            style={{ borderColor: "#e3e7ee" }}
            animate={inView ? {
                borderColor: ["#e3e7ee", accent, "#e3e7ee"],
                boxShadow: ["0 0 0 0px transparent", `0 0 0 8px ${accent}18`, "0 0 0 0px transparent"],
                scale: [1, 1.12, 1],
            } : {}}
            transition={{
                duration: 9,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.05, 0.12],
            }}
        >
            <SolutionIcon index={index} accent={accent} />
        </motion.div>
    );
}

/* ─── Desktop horizontal timeline ───────────────────────────────── */
function SolutionTimeline({ solutions, accent }: { solutions: IndustrySolution[]; accent: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className="relative" style={{ display: "grid", gridTemplateColumns: `repeat(${solutions.length}, 1fr)` }}>

            {/* Track */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0"
                style={{ background: "#d6dded" }}>
                {/* Travelling pulse */}
                {inView && (
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full"
                        style={{
                            background: accent,
                            boxShadow: `0 0 0 4px ${accent}28, 0 0 16px 3px ${accent}66`,
                        }}
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: ["0%", "0%", "100%", "100%"], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear", times: [0, 0.04, 0.96, 1] }}
                    />
                )}
            </div>

            {/* Stations */}
            {solutions.map((s, i) => {
                const isTop = i % 2 === 0; // even → card on top, odd → card on bottom
                return (
                    <div key={s.title} className="relative z-10"
                        style={{ display: "grid", gridTemplateRows: "1fr 64px 1fr" }}>

                        {/* Top slot */}
                        <div className="relative flex justify-center items-end pb-[26px]"
                            style={{ borderBottom: "none" }}>
                            {/* connector line down to node */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[26px]"
                                style={{ background: "#d6dded" }} />
                            {isTop && (
                                <motion.div
                                    className="w-[88%] max-w-[230px] text-left"
                                    initial={{ opacity: 0, y: -16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }}
                                >
                                    <p className="text-xs font-bold mb-2.5"
                                        style={{ color: accent, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.08em" }}>
                                        0{i + 1}
                                    </p>
                                    <h3 className="text-[17px] font-semibold mb-2 leading-snug"
                                        style={{ color: "#0c1526" }}>
                                        {s.title}
                                    </h3>
                                    <p className="text-[13.5px] leading-relaxed" style={{ color: "#5b6577" }}>{s.desc}</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Node */}
                        <div className="flex items-center justify-center">
                            <TimelineNode index={i} accent={accent} inView={inView} />
                        </div>

                        {/* Bottom slot */}
                        <div className="relative flex justify-center items-start pt-[26px]">
                            {/* connector line up to node */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[26px]"
                                style={{ background: "#d6dded" }} />
                            {!isTop && (
                                <motion.div
                                    className="w-[88%] max-w-[230px] text-left"
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }}
                                >
                                    <p className="text-xs font-bold mb-2.5"
                                        style={{ color: accent, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.08em" }}>
                                        0{i + 1}
                                    </p>
                                    <h3 className="text-[17px] font-semibold mb-2 leading-snug"
                                        style={{ color: "#0c1526" }}>
                                        {s.title}
                                    </h3>
                                    <p className="text-[13.5px] leading-relaxed" style={{ color: "#5b6577" }}>{s.desc}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ─── Main template ──────────────────────────────────────────────── */
export default function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
    const { accentColor: ac, accentBg: ab } = data;
    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    /* numeric counters — pull first two numeric stats */
    const numericStats = data.heroStats.map(s => parseInt(s.value.replace(/[^0-9]/g, "")) || 0);
    const c0 = useCountUp(numericStats[0] ?? 0, 1600, statsInView);
    const c1 = useCountUp(numericStats[1] ?? 0, 1600, statsInView);
    const counterValues = [c0, c1];

    return (
        <main className="bg-white text-[#111827] min-h-screen flex flex-col overflow-x-hidden">
            <SiteHeader />

            {/* ══ HERO ══════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#060a13] pt-32 pb-20">
                {/* Decorative background grid and glow */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[130px] opacity-40 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${ac}40, transparent 70%)` }} />
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none bg-indigo-500/20" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm self-start">
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ac }} />
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                                Industry Vertical — {data.eyebrow}
                            </span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[1.05] text-white mb-6 uppercase tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}>
                            {data.headline.map((line, i) =>
                                i === data.headline.length - 1
                                    ? <span key={i} className="heading-gradient block">{line}</span>
                                    : <span key={i} className="block">{line}</span>
                            )}
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-[#94a3b8] text-base md:text-lg max-w-xl leading-relaxed mb-10 font-medium">
                            {data.heroSub}
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4 mb-12">
                            <WhatsAppCTA message={data.ctaMessage} text="Book a free audit" />
                            <Link href="#solutions"
                                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition-all">
                                See our solutions <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Hero Image Showcase in Premium Card mockups */}
                    <div className="lg:col-span-5 relative w-full flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.25 }}
                            className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/11] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-3 shadow-2xl shadow-black/80"
                        >
                            {/* Inner image container */}
                            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden group">
                                <Image
                                    src={data.heroImage}
                                    alt={data.eyebrow}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                            {/* Floating decorative elements */}
                            <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full animate-ping" style={{ background: ac }} />
                                <span className="text-[11px] font-bold text-white uppercase tracking-wider">Live System Active</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ HERO STATS STRIP ══════════════════════════════════════════ */}
            <section ref={statsRef} className="py-12 border-y border-slate-200/60 bg-slate-50 relative z-10">
                <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-center">
                    {data.heroStats.map((st, i) => {
                        const isNumeric = /^\d/.test(st.value);
                        const displayVal = isNumeric && i < 2
                            ? st.value.replace(/\d+/, String(counterValues[i]))
                            : st.value;
                        return (
                            <div key={st.label} className="text-center flex flex-col items-center justify-center">
                                <div className="text-4xl md:text-5xl font-black mb-2 leading-none"
                                    style={{ fontFamily: "var(--font-syne)", color: ac }}>
                                    {displayVal}
                                </div>
                                <div className="text-xs md:text-sm text-[#475569] font-bold uppercase tracking-wider">{st.label}</div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ══ CONTEXT CHAPTER ══════════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32
        grid lg:grid-cols-[280px_1fr] gap-16 border-b border-slate-200">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-3">
                        Chapter 01
                    </p>
                    <p className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight uppercase"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {data.contextChapter.label}
                    </p>
                </div>
                <div>
                    {data.contextChapter.paragraphs.map((p, i) => (
                        <p key={i} className="text-lg text-slate-600 leading-relaxed font-normal mb-6"
                            dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                    {/* Pull quote */}
                    <div className="relative my-10 bg-[#060a13] rounded-3xl px-10 py-8 overflow-hidden shadow-xl border border-white/5">
                        <div className="absolute top-0 left-4 text-[120px] leading-none font-serif pointer-events-none select-none text-[#0ea5e9]/10">&ldquo;</div>
                        <p className="relative z-10 text-xl md:text-2xl font-semibold italic text-white leading-snug">
                            {data.contextChapter.pullQuote}
                        </p>
                    </div>
                </div>
            </section>

            {/* ══ PAIN POINTS — BENTO GRID ═════════════════════════════════ */}
            <section className="relative py-28 px-6 lg:px-8 overflow-hidden"
                style={{
                    background: `
                        radial-gradient(900px 500px at 85% 15%, rgba(47,111,242,0.16), transparent 60%),
                        radial-gradient(700px 400px at 0% 100%, rgba(91,141,239,0.08), transparent 60%),
                        #080b14
                    `,
                    color: "#f3f5f9",
                }}>
                <div className="max-w-[1280px] mx-auto relative">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="flex items-center gap-3 mb-7"
                        style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5d6680" }}
                    >
                        <div className="w-7 h-[1.5px]" style={{ background: ac }} />
                        The Problems
                    </motion.div>

                    {/* Headline row */}
                    <div className="relative mb-16">
                        {/* Ghost number */}
                        <span aria-hidden className="absolute top-[-86px] right-[-10px] font-bold leading-none pointer-events-none select-none hidden lg:block"
                            style={{ fontFamily: "var(--font-syne)", fontSize: 340, color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.06)", zIndex: 0 }}>
                            {String(data.painPoints.length).padStart(2, "0")}
                        </span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="relative z-10 font-bold leading-[1.1] max-w-3xl"
                            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.2rem,4.6vw,3.6rem)", letterSpacing: "-0.01em" }}
                            dangerouslySetInnerHTML={{
                                __html: data.painPoints.length > 0
                                    ? `${data.painPoints.length === 5
                                        ? "Five ways deals were dying"
                                        : `${data.painPoints.length} problems holding you back`} <span style="color:#9aa3b8">before they started.</span>`
                                    : "Problems before they started."
                            }}
                        />
                    </div>

                    {/* Bento Grid */}
                    <PainPointBento painPoints={data.painPoints} accent={ac} />
                </div>
            </section>

            {/* ══ SOLUTION STACK — TIMELINE ════════════════════════════════ */}
            <section id="solutions" className="py-24 px-6 lg:px-12 border-b border-[#E5E7EB] overflow-hidden">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-end mb-20">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-7" style={{ background: ac }} />
                                <span className="text-xs font-bold uppercase tracking-[0.22em]"
                                    style={{ color: "#94a0b4", fontFamily: "var(--font-mono, monospace)" }}>
                                    The Solution
                                </span>
                            </div>
                            <h2
                                className="font-bold leading-[1.05] tracking-tight"
                                style={{
                                    fontFamily: "var(--font-syne)",
                                    fontSize: "clamp(2.2rem,4.5vw,4rem)",
                                    color: "#0c1526",
                                }}
                            >
                                Website<span style={{ color: ac, padding: "0 6px" }}>+</span>CRM
                                <span style={{ color: ac, padding: "0 6px" }}>+</span>Lead Automation
                            </h2>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="text-[17px] leading-relaxed font-light"
                            style={{ color: "#5b6577" }}
                        >
                            One integrated system that captures every lead, nurtures them automatically, and hands you a list of warm prospects every morning — instead of a pile of unread messages.
                        </motion.p>
                    </div>

                    {/* ── DESKTOP TIMELINE ── */}
                    <div className="hidden lg:block">
                        <SolutionTimeline solutions={data.solutions} accent={ac} />
                    </div>

                    {/* ── MOBILE STACK ── */}
                    <div className="lg:hidden flex flex-col gap-0">
                        {data.solutions.map((s, i) => (
                            <div key={s.title} className="relative flex gap-5 pb-9">
                                {/* vertical connector */}
                                {i < data.solutions.length - 1 && (
                                    <div className="absolute left-[26px] top-[54px] bottom-0 w-[2px]"
                                        style={{ background: "#d6dded" }} />
                                )}
                                {/* node */}
                                <div className="shrink-0 w-[54px] h-[54px] rounded-full border-2 flex items-center justify-center bg-white"
                                    style={{ borderColor: ac, boxShadow: `0 0 0 6px ${ac}18` }}>
                                    <SolutionIcon index={i} accent={ac} />
                                </div>
                                {/* card */}
                                <div className="pt-1">
                                    <p className="text-xs font-bold mb-2"
                                        style={{ color: ac, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.08em" }}>
                                        0{i + 1}
                                    </p>
                                    <h3 className="text-base font-bold mb-2" style={{ color: "#0c1526" }}>{s.title}</h3>
                                    <p className="text-[13.5px] leading-relaxed" style={{ color: "#5b6577" }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ VISUAL SHOWCASE (before/after slider) — optional ════════ */}
            {data.visualShowcase && (
                <section className="py-24 px-6 lg:px-12 bg-[#F8FAFB] border-b border-[#E5E7EB]">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10 grid lg:grid-cols-2 gap-8 items-end"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="h-px w-6" style={{ background: ac }} />
                                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9CA3AF]">
                                        Visual Impact
                                    </span>
                                </div>
                                <h2
                                    className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-tight text-[#111827]"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {data.visualShowcase.heading}
                                </h2>
                            </div>
                            <p className="text-[17px] text-[#6B7280] leading-relaxed font-light lg:pb-1">
                                {data.visualShowcase.subheading}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <BeforeAfterSlider
                                beforeSrc={data.visualShowcase.beforeSrc}
                                afterSrc={data.visualShowcase.afterSrc}
                                accentColor={ac}
                            />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ══ CLIENT CASE STUDIES ══════════════════════════════════════ */}
            <section className="py-24 px-6 lg:px-12 border-b border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mb-14">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px w-6" style={{ background: ac }} />
                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9CA3AF]">Real Results</span>
                        </div>
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#111827] leading-tight"
                            style={{ fontFamily: "var(--font-syne)" }}>
                            Real results for real clients.
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {data.clients.map((client, idx) => (
                            <motion.div key={client.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                                className={`group relative rounded-3xl overflow-hidden border border-[#E5E7EB] bg-white
                  shadow-sm hover:shadow-lg transition-all duration-500
                  flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>

                                {/* Image panel */}
                                <div className="md:w-2/5 relative min-h-[280px] overflow-hidden">
                                    <Image src={client.image} alt={client.name} fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                    {/* Solid gradient — no text overlap */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    {/* Accent hover tint */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(135deg, ${ac}25 0%, transparent 55%)` }} />
                                    {/* Tag badge */}
                                    {client.tag && (
                                        <div className="absolute top-4 left-4">
                                            <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                                                style={{ background: ac }}>
                                                {client.tag}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content panel */}
                                <div className="md:w-3/5 p-8 lg:p-12 flex flex-col justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: ac }}>
                                            Case Study 0{idx + 1} — {client.role}
                                        </p>
                                        <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2 leading-tight"
                                            style={{ fontFamily: "var(--font-syne)" }}>
                                            {client.name}
                                        </h3>
                                        {client.site && (
                                            <a href={`https://${client.site}`} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-medium mb-5 hover:underline transition-colors"
                                                style={{ color: ac }}>
                                                {client.site} <ExternalLink size={10} />
                                            </a>
                                        )}
                                        <p className="text-sm text-[#4B5563] leading-relaxed mb-8 max-w-lg"
                                            dangerouslySetInnerHTML={{ __html: client.desc }} />
                                    </div>

                                    <div className="flex items-center flex-wrap gap-8 pt-6 border-t border-[#E5E7EB]">
                                        {client.stats.map((st) => (
                                            <div key={st.l}>
                                                <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)", color: ac }}>
                                                    {st.v}
                                                </div>
                                                <p className="text-[11px] text-[#9CA3AF] font-medium mt-0.5 uppercase tracking-wide">
                                                    {st.l}
                                                </p>
                                            </div>
                                        ))}
                                        <div className="ml-auto w-10 h-10 rounded-full border border-[#E5E7EB] flex items-center
                      justify-center shrink-0 transition-all group-hover:text-white group-hover:border-current"
                                            style={{ color: ac }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = ac)}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ TRANSFORMATION METRICS ═══════════════════════════════════ */}
            <section className="py-24 px-6 lg:px-12 bg-[#F8FAFB] border-b border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mb-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-px w-6" style={{ background: ac }} />
                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9CA3AF]">By the numbers</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]"
                                style={{ fontFamily: "var(--font-syne)" }}>
                                From chaos to conversion<br />in 4 steps.
                            </h2>
                        </motion.div>
                        {data.transformations.map((t, i) => (
                            <TransformBar key={t.label} {...t} delay={i * 0.15} accent={ac} />
                        ))}
                    </div>

                    {/* Process timeline */}
                    <div className="space-y-6">
                        {[
                            { emoji: "🔍", step: "Step 01", title: "Free Audit", desc: "We audit your current lead flow, website, and process. You get a clear picture of where revenue is leaking — free of charge." },
                            { emoji: "⚙️", step: "Step 02", title: "Custom Build", desc: "Website, CRM, automations — built specifically for your workflow. No templates, no shortcuts." },
                            { emoji: "🚀", step: "Step 03", title: "Launch & Train", desc: "We launch, migrate your contacts, and train your team. Go live with a full pipeline, not a blank system." },
                            { emoji: "📈", step: "Step 04", title: "Grow Together", desc: "Monthly reviews, performance tracking, and continuous improvement. We're invested in your results." },
                        ].map((step, i) => (
                            <motion.div key={step.step} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="group flex gap-5 p-6 rounded-2xl border border-[#E5E7EB] bg-white
                  hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl border border-[#E5E7EB] flex items-center justify-center
                  text-xl shrink-0 transition-all duration-300 group-hover:border-current group-hover:scale-110"
                                    style={{ color: ac }}>
                                    {step.emoji}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1" style={{ color: ac }}>
                                        {step.step}
                                    </p>
                                    <h4 className="text-sm font-bold text-[#111827] mb-1">{step.title}</h4>
                                    <p className="text-xs text-[#6B7280] leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FAQ ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 lg:px-12 border-b border-[#E5E7EB]">
                <div className="max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] block mb-4" style={{ color: ac }}>
                            FAQ
                        </span>
                        <h2 className="text-2xl font-bold text-[#111827]" style={{ fontFamily: "var(--font-syne)" }}>
                            Common questions answered
                        </h2>
                    </motion.div>
                    <div className="space-y-3">
                        {data.faqs.map((faq, i) => (
                            <div key={i} className="rounded-2xl border border-[#E5E7EB] overflow-hidden bg-white">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F8FAFB] transition-colors">
                                    <span className="font-semibold text-[#111827] text-sm">{faq.q}</span>
                                    <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                                        style={{ color: ac }} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                                            <div className="px-6 pb-6 text-sm text-[#6B7280] leading-relaxed">{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FINAL CTA ════════════════════════════════════════════════ */}
            <section className="relative py-28 px-6 lg:px-12 overflow-hidden bg-[#060d1f]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none"
                    style={{ background: `radial-gradient(ellipse, ${ac}18 0%, transparent 70%)` }} />

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: ac }}>
                            Get Started
                        </p>
                        <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-white leading-tight mb-5"
                            style={{ fontFamily: "var(--font-syne)" }}>
                            {data.ctaTitle}
                        </h2>
                        <p className="text-[#64748b] text-lg leading-relaxed font-light">{data.ctaSub}</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="flex flex-col gap-4 lg:items-start">
                        <WhatsAppCTA message={data.ctaMessage} text="Book free 30-min audit" />
                        <Link href="/portfolio/solutions"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/[0.06] transition-all">
                            View all solutions <ArrowRight size={14} />
                        </Link>
                        <p className="text-xs text-[#475569] mt-2">
                            No pitch deck. No commitment. Just an honest 30-minute audit.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

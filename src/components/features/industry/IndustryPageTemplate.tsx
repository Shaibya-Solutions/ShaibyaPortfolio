"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";

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
    painPoints: Array<{ emoji: string; title: string; desc: string }>;
    solutions: IndustrySolution[];
    clients: IndustryClient[];
    transformations: IndustryTransformation[];
    ctaTitle: string;
    ctaSub: string;
    ctaMessage: string;
    faqs: IndustryFAQ[];
    accentColor: string;         // e.g. "#0ea5e9"
    accentBg: string;            // e.g. "rgba(14,165,233,0.08)"
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
            <section ref={heroRef} className="relative min-h-[80vh] flex items-end overflow-hidden">
                <motion.div style={{ y: heroImgY }} className="absolute inset-0 z-0">
                    <Image src={data.heroImage} alt={data.eyebrow} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f] via-[#060d1f]/65 to-[#060d1f]/15" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#060d1f]/60 to-transparent" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-20 pt-40">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ac }} />
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                            Industry — {data.eyebrow}
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-white mb-6"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {data.headline.map((line, i) =>
                            i === data.headline.length - 1
                                ? <span key={i} className="heading-gradient block">{line}</span>
                                : <span key={i} className="block">{line}</span>
                        )}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-[#94a3b8] text-lg max-w-xl leading-relaxed mb-10">
                        {data.heroSub}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4">
                        <WhatsAppCTA message={data.ctaMessage} text="Book a free audit" />
                        <Link href="#solutions"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition-all">
                            See our solutions <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ══ HERO STATS STRIP ══════════════════════════════════════════ */}
            <section ref={statsRef} className="py-10 border-y border-[#E5E7EB] bg-[#F8FAFB]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-wrap justify-center gap-10 lg:gap-16">
                    {data.heroStats.map((st, i) => {
                        const isNumeric = /^\d/.test(st.value);
                        const displayVal = isNumeric && i < 2
                            ? st.value.replace(/\d+/, String(counterValues[i]))
                            : st.value;
                        return (
                            <div key={st.label} className="text-center">
                                <div className="text-3xl font-bold mb-1"
                                    style={{ fontFamily: "var(--font-syne)", color: ac }}>
                                    {displayVal}
                                </div>
                                <div className="text-xs text-[#6B7280] font-medium">{st.label}</div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ══ CONTEXT CHAPTER ══════════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28
        grid lg:grid-cols-[260px_1fr] gap-16 border-b border-[#E5E7EB]">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-2">
                        Chapter 01
                    </p>
                    <p className="text-3xl font-bold text-[#111827] leading-tight"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {data.contextChapter.label}
                    </p>
                </div>
                <div>
                    {data.contextChapter.paragraphs.map((p, i) => (
                        <p key={i} className="text-[17px] text-[#4B5563] leading-relaxed font-light mb-5"
                            dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                    {/* Pull quote */}
                    <div className="relative my-10 bg-[#060d1f] rounded-2xl px-10 py-9 overflow-hidden">
                        <div className="absolute top-0 left-4 text-[120px] leading-none font-serif pointer-events-none select-none"
                            style={{ color: ac, opacity: 0.35 }}>&ldquo;</div>
                        <p className="relative text-2xl font-light italic text-white leading-snug">
                            {data.contextChapter.pullQuote}
                        </p>
                    </div>
                </div>
            </section>

            {/* ══ PAIN POINTS ══════════════════════════════════════════════ */}
            <section className="bg-[#060d1f] py-24 px-6 lg:px-12 relative overflow-hidden">
                <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${ac}26, transparent 70%)` }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mb-14">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px w-6 bg-white/20" />
                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">The Problems</span>
                        </div>
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white leading-tight max-w-2xl"
                            style={{ fontFamily: "var(--font-syne)" }}>
                            Five ways deals were dying<br />before they started.
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                        {data.painPoints.map((p, i) => (
                            <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-300 cursor-default">
                                <div className="text-3xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 inline-block">
                                    {p.emoji}
                                </div>
                                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{p.title}</h3>
                                <p className="text-xs text-white/40 leading-relaxed font-light">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ SOLUTION STACK ═══════════════════════════════════════════ */}
            <section id="solutions" className="py-24 px-6 lg:px-12 border-b border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 mb-16 items-end">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-px w-6" style={{ background: ac }} />
                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9CA3AF]">The Solution</span>
                            </div>
                            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-tight text-[#111827]"
                                style={{ fontFamily: "var(--font-syne)" }}>
                                Website{" "}
                                <span className="italic" style={{ color: ac }}>+</span>
                                {" "}CRM{" "}
                                <span className="italic" style={{ color: ac }}>+</span>
                                {" "}Lead Automation
                            </h2>
                        </motion.div>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="text-[17px] text-[#6B7280] leading-relaxed font-light">
                            One integrated system that captures every lead, nurtures them automatically, and hands you a list of warm prospects every morning — instead of a pile of unread messages.
                        </motion.p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {data.solutions.map((s, i) => (
                            <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                className="group relative p-8 rounded-2xl border border-[#E5E7EB] bg-white hover:-translate-y-1.5
                  shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                                    style={{ background: `linear-gradient(135deg, ${ab}, transparent)` }} />
                                <div className="relative z-10">
                                    <span className="text-4xl mb-5 block">{s.emoji}</span>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: ac }}>
                                        0{i + 1}
                                    </p>
                                    <h3 className="text-base font-bold text-[#111827] mb-2">{s.title}</h3>
                                    <p className="text-sm text-[#6B7280] leading-relaxed font-light">{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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

            <SiteFooter />
        </main>
    );
}

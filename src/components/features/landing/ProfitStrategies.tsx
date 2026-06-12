"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const strategies = [
    {
        number: "01",
        title: "Real Estate",
        headline: "Nagpur's property market is booming. Most agencies still run on WhatsApp.",
        pillars: ["Website + CRM + Lead Automation", "Site visit scheduling with auto-reminders", "Document management & commission tracking", "WhatsApp lead routing"],
        stat: { value: "3x", label: "Lead capture increase" },
        link: "/industry/real-estate",
        image: "/images/solutions/pushkarna.png",
    },
    {
        number: "02",
        title: "Fitness",
        headline: "Revolution Fitness grew 120→350 members. The system is ready for your gym.",
        pillars: ["Membership + auto renewal reminders", "Attendance tracking & trainer scheduling", "Payment dashboard & WhatsApp bot", "Multi-branch support"],
        stat: { value: "80%", label: "Admin time eliminated" },
        link: "/industry/fitness",
        image: "/images/solutions/gym.png",
    },
    {
        number: "03",
        title: "Healthcare",
        headline: "VIMS Hospital went from zero digital presence to 10k+ monthly visits.",
        pillars: ["SEO-optimized hospital website", "Online appointment booking", "Doctor profile directory", "Automated patient reminders"],
        stat: { value: "2.5x", label: "New patient inquiries" },
        link: "/portfolio/websites",
        image: "/images/solutions/vims.png",
    },
    {
        number: "04",
        title: "Startups & MVPs",
        headline: "A student had a plan. We built the platform. Snyppit went live in 4 weeks.",
        pillars: ["Concept to prototype in weeks", "Full-stack development", "AI & automation integration", "Founder-first approach"],
        stat: { value: "4wk", label: "Idea to launch" },
        link: "/portfolio/rnd",
        image: "/images/solutions/memorybox.png",
    },
];

export default function ProfitStrategies() {
    const [active, setActive] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const s = strategies[active];

    return (
        <section ref={ref} className="py-28 bg-[#faf9f7]" id="industries">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="max-w-xl mb-16"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B4E61] mb-4">
                        Investment strategies
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.08]">
                        Deep expertise across
                        <br />
                        four verticals.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    {/* Tab list */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
                    >
                        {strategies.map((st, i) => (
                            <button
                                key={st.number}
                                onClick={() => setActive(i)}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all shrink-0 lg:shrink ${i === active
                                        ? "bg-[#0B4E61] text-white shadow-lg shadow-[#0B4E61]/20"
                                        : "bg-white border border-[#e5e7eb] text-[#010D18] hover:border-[#0B4E61]/30"
                                    }`}
                            >
                                <span className={`text-xs font-mono font-bold ${i === active ? "text-white/60" : "text-[#0B4E61]/40"}`}>
                                    {st.number}
                                </span>
                                <span className="font-semibold text-sm">{st.title}</span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Content panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}
                            className="bg-white rounded-3xl border border-[#e5e7eb] overflow-hidden"
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Text */}
                                <div className="p-10 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#010D18] leading-snug mb-6">
                                            {s.headline}
                                        </h3>
                                        <div className="mb-8">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-[#0B4E61] mb-4">
                                                Strategy pillars
                                            </p>
                                            <ul className="space-y-3">
                                                {s.pillars.map((p) => (
                                                    <li key={p} className="flex items-start gap-3 text-sm text-[#4a5568]">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0B4E61] shrink-0" />
                                                        {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-3xl font-black text-[#0B4E61]">{s.stat.value}</span>
                                            <p className="text-xs text-[#4a5568] mt-0.5">{s.stat.label}</p>
                                        </div>
                                        <Link
                                            href={s.link}
                                            className="group inline-flex items-center gap-2 bg-[#0B4E61] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#034078] transition-colors"
                                        >
                                            Learn more <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="relative min-h-[280px] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={s.image}
                                        alt={s.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#010D18]/30 to-transparent" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const featured = [
    {
        tag: "AI Automation",
        title: "CoalTrack AI",
        desc: "7-day billing process → 4 hours. One AI tool replaced 4 employees.",
        stats: [{ v: "95%", l: "Faster" }, { v: "4→1", l: "Staff" }],
        image: "/images/solutions/coal.png",
        href: "/portfolio/solutions#coaltrack-ai",
        accent: "#0B4E61",
    },
    {
        tag: "Fitness SaaS",
        title: "FitManage 360",
        desc: "Complete gym management. Renewals, attendance, payments — all automated.",
        stats: [{ v: "120→350", l: "Members" }, { v: "80%", l: "Time saved" }],
        image: "/images/solutions/fitlife.png",
        href: "/portfolio/solutions#fitmanage-360",
        accent: "#034078",
    },
    {
        tag: "Healthcare",
        title: "VIMS Hospital",
        desc: "Zero to 10k monthly visits. Online booking for 150+ doctors.",
        stats: [{ v: "10k+", l: "Monthly visits" }, { v: "2.5x", l: "Patients" }],
        image: "/images/solutions/vims.png",
        href: "/portfolio/websites",
        accent: "#1282A2",
    },
    {
        tag: "Startup MVP",
        title: "Snyppit",
        desc: "Fashion delivered in minutes. Student had a plan — we built the platform.",
        stats: [{ v: "4wk", l: "Launch time" }, { v: "Live", l: "Status" }],
        image: "/images/solutions/memorybox.png",
        href: "/snyppit",
        accent: "#0B4E61",
    },
];

export default function ProfitPortfolio() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="py-28 bg-[#faf9f7]" id="portfolio">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
                >
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B4E61] mb-4">
                            Curated ventures
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.08]">
                            Top quality work for
                            <br />
                            exceptional results.
                        </h2>
                    </div>
                    <Link
                        href="/portfolio/solutions"
                        className="group inline-flex items-center gap-2 text-[#0B4E61] font-semibold text-sm border-b-2 border-[#0B4E61]/20 hover:border-[#0B4E61] pb-0.5 transition-colors shrink-0"
                    >
                        View all projects <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* 2-column grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {featured.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 28 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.08 + i * 0.08 }}
                        >
                            <Link href={item.href} className="group block h-full">
                                <div className="bg-white rounded-3xl overflow-hidden border border-[#e5e7eb] hover:shadow-2xl hover:shadow-black/8 hover:border-[#0B4E61]/15 transition-all duration-500 h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative overflow-hidden aspect-[16/9]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#010D18]/50 to-transparent" />
                                        <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#010D18]">
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-7 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-[#010D18] mb-2 group-hover:text-[#0B4E61] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[#4a5568] text-sm leading-relaxed mb-6 flex-grow">
                                            {item.desc}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-6">
                                                {item.stats.map((s) => (
                                                    <div key={s.l}>
                                                        <span className="text-xl font-black text-[#010D18]">{s.v}</span>
                                                        <p className="text-xs text-[#4a5568] mt-0.5">{s.l}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center group-hover:bg-[#0B4E61] group-hover:border-[#0B4E61] group-hover:text-white text-[#0B4E61] transition-all">
                                                <FaArrowRight size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const faqs = [
    {
        q: "How do you select the right solution for my business?",
        a: "We start with a 30-minute conversation to understand your current workflow, pain points, and goals. From there we map out exactly what technology can fix — and what it can't. No upselling, just honest recommendations.",
    },
    {
        q: "What makes Shaibya Solutions suitable for local businesses?",
        a: "We're based in Nagpur and have built systems for gyms, hospitals, real estate agencies, and manufacturers here. We understand the local market, the budget constraints, and the operational realities that enterprise software ignores.",
    },
    {
        q: "How long does it take to build a website or system?",
        a: "Most websites are live within 2–4 weeks. Full automation systems like FitManage 360 or CoalTrack AI take 4–8 weeks depending on complexity. We'll give you a clear timeline before we start.",
    },
    {
        q: "How do you ensure reliable results?",
        a: "Every project includes a discovery phase, a working prototype for feedback, and 30 days of free post-launch support. We measure success by your business outcomes — not just delivery.",
    },
    {
        q: "Can you guide first-time tech adopters?",
        a: "Absolutely. Most of our clients weren't tech-savvy when they came to us. We design systems simple enough that if you can use WhatsApp, you can use our tools. We also train your team.",
    },
    {
        q: "What is the expected growth potential?",
        a: "Results vary by project, but our clients have seen 3x lead capture increases, 80% reduction in admin time, and 2.5x patient inquiry growth. We'll share relevant case studies before you commit.",
    },
    {
        q: "Do you provide ongoing support after launch?",
        a: "Yes. Every project includes 30 days of free support. After that, we offer affordable monthly maintenance plans. Most clients stay with us long-term because we keep improving their systems.",
    },
    {
        q: "How do you maintain quality standards?",
        a: "We work on a limited number of projects at a time so every client gets our full attention. We don't outsource core development, and every system is tested against real business scenarios before handover.",
    },
];

export default function ProfitFAQ() {
    const [open, setOpen] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="py-28 bg-white" id="faq">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-[380px_1fr] gap-16">
                    {/* Left — sticky header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="lg:sticky lg:top-28 self-start"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B4E61] mb-4">
                            FAQ
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.08] mb-6">
                            Answers to what
                            <br />
                            matters most.
                        </h2>
                        <p className="text-[#4a5568] leading-relaxed mb-8">
                            Essential insights on our process, timelines, pricing, and how we
                            deliver results for businesses like yours.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[#0B4E61] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#034078] transition-colors"
                        >
                            Contact us
                        </Link>
                    </motion.div>

                    {/* Right — accordion */}
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 14 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.05 + i * 0.05 }}
                                className="rounded-2xl border border-[#e5e7eb] overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left bg-[#faf9f7] hover:bg-white transition-colors"
                                >
                                    <span className="font-semibold text-[#010D18] text-sm leading-snug">
                                        {faq.q}
                                    </span>
                                    <FaChevronDown
                                        size={13}
                                        className={`text-[#0B4E61] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.28 }}
                                        >
                                            <div className="px-6 pb-6 pt-2 text-[#4a5568] text-sm leading-relaxed bg-white">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

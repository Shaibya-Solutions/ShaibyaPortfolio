"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import Link from "next/link";

export default function ProfitCTA() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Decorative border top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0B4E61]/20 to-transparent" />

            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B4E61] mb-5"
                >
                    Start now
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-extrabold text-[#010D18] leading-[1.05] mb-6"
                >
                    Ready to eliminate
                    <br />
                    the manual work?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.18 }}
                    className="text-lg text-[#4a5568] leading-relaxed max-w-xl mx-auto mb-10"
                >
                    No pressure, no sales pitch. Just a 30-minute conversation about your
                    business and what technology can fix.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.26 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <WhatsAppCTA
                        text="Start a conversation"
                        message="Hi, I'd like to discuss a project with Shaibya Solutions."
                    />
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[#0B4E61] text-[#0B4E61] font-semibold text-sm hover:bg-[#0B4E61] hover:text-white transition-all"
                    >
                        Talk to an expert
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import { FaArrowRight } from "react-icons/fa";

const TRUSTED = [
    "Revolution Fitness",
    "VIMS Hospital",
    "Bridgestone",
    "Mirragio",
    "Manish Group",
    "Snyppit",
];

export default function ProfitHero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#010D18]">
            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                    backgroundSize: "72px 72px",
                }}
            />

            {/* Teal glow blobs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0B4E61]/20 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1282A2]/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}
                    <div>
                        {/* Eyebrow */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#64B0C6] mb-6"
                        >
                            Nagpur&apos;s Digital Solutions Studio
                        </motion.p>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="text-[clamp(2.8rem,5.5vw,5rem)] font-extrabold leading-[1.04] tracking-tight text-white mb-6"
                        >
                            Elevate your business
                            <br />
                            <span className="text-brand-glow">with real technology.</span>
                        </motion.h1>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.2 }}
                            className="text-lg text-[#64B0C6] leading-relaxed max-w-lg mb-10"
                        >
                            We build custom websites, automation systems, and MVPs that
                            eliminate manual work and drive measurable growth for your
                            business.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap items-center gap-4 mb-14"
                        >
                            <WhatsAppCTA text="Start a project" />
                            <Link
                                href="/portfolio/solutions"
                                className="group inline-flex items-center gap-2 text-white/70 font-semibold text-sm border-b border-white/20 hover:border-white/60 hover:text-white pb-0.5 transition-all"
                            >
                                View our work <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Trust badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-3">
                                Trusted by 14+ businesses — from local gyms to enterprise
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {TRUSTED.map((name) => (
                                    <span
                                        key={name}
                                        className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/50 text-xs font-medium"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT — image collage */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="hidden lg:grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4">
                            <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl shadow-black/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/solutions/fitlife.png"
                                    alt="FitManage 360"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden aspect-square shadow-xl shadow-black/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/solutions/coal.png"
                                    alt="CoalTrack AI"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 mt-10">
                            <div className="rounded-2xl overflow-hidden aspect-square shadow-xl shadow-black/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/solutions/vims.png"
                                    alt="VIMS Hospital"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl shadow-black/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/solutions/sonarkilla.png"
                                    alt="Sonar Killa Tours"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </section>
    );
}

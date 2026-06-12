"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/data/team";
import { FaArrowRight } from "react-icons/fa";

export default function ProfitTeam() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section ref={ref} className="py-28 bg-white" id="team">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
                >
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B4E61] mb-4">
                            Our team
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.08]">
                            Expert guidance from a
                            <br />
                            trusted engineering team.
                        </h2>
                    </div>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-[#0B4E61] font-semibold text-sm border-b-2 border-[#0B4E61]/20 hover:border-[#0B4E61] pb-0.5 transition-colors shrink-0"
                    >
                        Work with us <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Team grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TEAM_MEMBERS.map((member, i) => {
                        const Icon = member.icon as React.ElementType<{ size?: number }>;
                        return (
                            <motion.div
                                key={member.codename}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.08 + i * 0.07 }}
                                className="group bg-[#faf9f7] rounded-3xl p-7 border border-[#e5e7eb] hover:border-[#0B4E61]/25 hover:shadow-xl hover:shadow-black/5 transition-all duration-400"
                            >
                                {/* Avatar + name */}
                                <div className="flex items-center gap-4 mb-5">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
                                        style={{ backgroundColor: `${member.color}18`, color: member.color }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#010D18] text-sm leading-tight">{member.codename}</h4>
                                        <p className="text-xs text-[#4a5568] mt-0.5">{member.dayJob}</p>
                                    </div>
                                </div>

                                {/* Skill */}
                                <p className="text-xs font-semibold text-[#0B4E61] mb-2 uppercase tracking-wider">
                                    {member.nightSkill}
                                </p>

                                {/* Location */}
                                <p className="text-xs text-[#4a5568] mb-4">📍 {member.location}</p>

                                {/* Quote */}
                                <p className="text-sm text-[#4a5568] italic leading-relaxed border-t border-[#e5e7eb] pt-4">
                                    &ldquo;{member.hoverQuote}&rdquo;
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

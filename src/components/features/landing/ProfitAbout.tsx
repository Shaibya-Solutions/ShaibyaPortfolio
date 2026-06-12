"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProfitAbout() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="py-24 bg-white border-b border-[#e5e7eb]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — label + statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B4E61] mb-5">
                            Market leaders
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.08] mb-6">
                            Defining growth through
                            <br />
                            intelligent digital systems.
                        </h2>
                        <p className="text-[#4a5568] text-lg leading-relaxed max-w-lg">
                            Our tailored solutions focus on real business problems — replacing
                            manual work with automation, building platforms that scale, and
                            shipping MVPs that validate ideas fast.
                        </p>
                    </motion.div>

                    {/* Right — two-column feature list */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[
                            { title: "Custom Websites", desc: "SEO-optimized, mobile-first sites that convert visitors into leads." },
                            { title: "Automation Systems", desc: "CRM pipelines, WhatsApp bots, and dashboards that replace manual work." },
                            { title: "MVPs & R&D", desc: "From concept to working prototype in weeks, not months." },
                            { title: "Industry Expertise", desc: "Deep focus on real estate, fitness, healthcare, and logistics." },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                className="p-5 rounded-2xl bg-[#faf9f7] border border-[#e5e7eb] hover:border-[#0B4E61]/20 hover:shadow-md transition-all"
                            >
                                <h4 className="font-bold text-[#010D18] mb-2 text-sm">{item.title}</h4>
                                <p className="text-[#4a5568] text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

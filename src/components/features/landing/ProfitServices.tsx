"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FaArrowRight, FaCode, FaRobot, FaLightbulb } from "react-icons/fa";

const services = [
    {
        number: "01",
        title: "Custom Websites",
        description:
            "SEO-optimized, mobile-first websites that serve as the digital foundation for your business. Property listing sites, hospital portals, booking platforms, and more.",
        link: "/portfolio/websites",
        icon: FaCode,
        tags: ["Next.js", "SEO", "Mobile-first"],
    },
    {
        number: "02",
        title: "Systems & Automation",
        description:
            "CRM pipelines, WhatsApp bots, payment automation, and management dashboards. We replace your Excel sheets and manual processes with intelligent systems.",
        link: "/portfolio/solutions",
        icon: FaRobot,
        tags: ["WhatsApp API", "CRM", "Automation"],
    },
    {
        number: "03",
        title: "MVPs & R&D",
        description:
            "From concept to working prototype in weeks. We partner with founders and enterprises to build and validate ideas before committing to full-scale development.",
        link: "/portfolio/rnd",
        icon: FaLightbulb,
        tags: ["AI", "Prototyping", "Consulting"],
    },
];

export default function ProfitServices() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section ref={ref} className="py-28 bg-white" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6"
                >
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B4E61] mb-4">
                            Investment opportunities
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.08]">
                            Discover digital solutions
                            <br />
                            tailored for growth.
                        </h2>
                    </div>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 bg-[#0B4E61] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#034078] transition-colors shrink-0"
                    >
                        Start a project <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Service cards */}
                <div className="space-y-5">
                    {services.map((svc, i) => {
                        const Icon = svc.icon;
                        return (
                            <motion.div
                                key={svc.number}
                                initial={{ opacity: 0, y: 28 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link href={svc.link} className="group block">
                                    <div className="grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 items-center p-8 rounded-3xl border border-[#e5e7eb] bg-[#faf9f7] hover:bg-white hover:shadow-xl hover:shadow-black/5 hover:border-[#0B4E61]/20 transition-all duration-400">
                                        {/* Number */}
                                        <span className="text-5xl font-black text-[#e5e7eb] group-hover:text-[#0B4E61]/15 transition-colors leading-none hidden md:block">
                                            {svc.number}
                                        </span>

                                        {/* Content */}
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-9 h-9 rounded-xl bg-[#E0F5FC] flex items-center justify-center text-[#0B4E61] group-hover:bg-[#0B4E61] group-hover:text-white transition-colors">
                                                    <Icon size={16} />
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold text-[#010D18] group-hover:text-[#0B4E61] transition-colors">
                                                    {svc.title}
                                                </h3>
                                            </div>
                                            <p className="text-[#4a5568] leading-relaxed text-sm max-w-2xl mb-4">
                                                {svc.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {svc.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 rounded-full bg-[#E0F5FC] text-[#0B4E61] text-xs font-semibold"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="w-11 h-11 rounded-full border border-[#e5e7eb] flex items-center justify-center group-hover:bg-[#0B4E61] group-hover:border-[#0B4E61] group-hover:text-white text-[#0B4E61] transition-all shrink-0">
                                            <FaArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

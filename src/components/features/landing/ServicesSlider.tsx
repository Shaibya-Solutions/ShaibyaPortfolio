"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FaArrowRight, FaCode, FaRobot, FaLightbulb } from "react-icons/fa";

const services = [
  {
    number: "01",
    title: "Custom Websites",
    description: "SEO-optimized, mobile-first websites that serve as the digital foundation for your business. Property listing sites, hospital portals, booking platforms, and more.",
    link: "/portfolio/websites",
    icon: FaCode,
    accent: "#0B4E61",
  },
  {
    number: "02",
    title: "Systems & Automation",
    description: "CRM pipelines, WhatsApp bots, payment automation, and management dashboards. We replace your Excel sheets and manual processes with intelligent systems.",
    link: "/portfolio/solutions",
    icon: FaRobot,
    accent: "#034078",
  },
  {
    number: "03",
    title: "MVPs & R&D",
    description: "From concept to working prototype in weeks. We partner with founders and enterprises to build and validate ideas before committing to full-scale development.",
    link: "/portfolio/rnd",
    icon: FaLightbulb,
    accent: "#1282A2",
  },
];

export default function ServicesSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-28 bg-white relative overflow-hidden" id="services">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#faf9f7] -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header — left-aligned, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-xl mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B4E61] mb-4">What we do</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.1] mb-5">
            Three things,<br />done exceptionally.
          </h2>
          <p className="text-lg text-[#4a5568] leading-relaxed">
            We don&apos;t do everything. We do websites, automation, and MVPs — and we do them better than anyone in Nagpur.
          </p>
        </motion.div>

        {/* Services — asymmetric stacked cards */}
        <div className="space-y-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <Link href={service.link} className="group block">
                  <div className="flex items-start gap-8 md:gap-12 py-10 border-t border-[#e5e7eb] hover:bg-[#faf9f7]/50 transition-colors px-4 -mx-4 rounded-lg">
                    {/* Number */}
                    <span className="text-5xl md:text-6xl font-black text-[#e5e7eb] group-hover:text-[#0B4E61]/20 transition-colors shrink-0 leading-none mt-1">
                      {service.number}
                    </span>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon size={20} className="text-[#0B4E61]" />
                        <h3 className="text-2xl md:text-3xl font-bold text-[#010D18] group-hover:text-[#0B4E61] transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-[#4a5568] leading-relaxed max-w-2xl text-base">
                        {service.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0 mt-3 w-10 h-10 rounded-full border border-[#e5e7eb] flex items-center justify-center group-hover:bg-[#0B4E61] group-hover:border-[#0B4E61] group-hover:text-white text-[#0B4E61] transition-all">
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

"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Zap, Rocket, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Websites",
    description:
      "SEO-optimized, mobile-first websites that convert visitors into clients. Built for performance, not just aesthetics — with CMS integration, fast load times, and responsive layouts.",
    link: "/portfolio/websites",
    color: "#0ea5e9",
  },
  {
    icon: Zap,
    title: "Systems & Automation",
    description:
      "CRM integrations, WhatsApp bots, billing automation, and custom dashboards. We find the manual work costing you hours — and eliminate it.",
    link: "/portfolio/solutions",
    color: "#818cf8",
  },
  {
    icon: Rocket,
    title: "MVPs & R&D",
    description:
      "From concept to live prototype in weeks. We validate your idea fast, build lean, and iterate based on real user feedback. Founder-friendly from day zero.",
    link: "/portfolio/rnd",
    color: "#06b6d4",
  },
];

/* CSS-variable spotlight handler */
function useSpotlight() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);
  return handleMouseMove;
}

export default function GLServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const handleSpotlight = useSpotlight();

  return (
    <section ref={ref} id="services" className="relative py-32 lg:py-44 overflow-hidden" style={{ background: "#F8FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-20 max-w-xl">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="accent-line w-12 mb-10 origin-left"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-5"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#111827] leading-[1.15]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Three things, <span className="heading-gradient">done exceptionally.</span>
          </motion.h2>
        </div>

        {/* Asymmetric card grid: 7/5 split */}
        <div className="grid lg:grid-cols-12 gap-5">

          {/* Large card — spans 7 */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-7"
          >
            <div
              className="card-spotlight p-8 lg:p-10 h-full cursor-default"
              onMouseMove={handleSpotlight}
            >
              {/* Accent top border */}
              <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full" style={{ background: services[0].color }} />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-8"
                  style={{ background: `${services[0].color}12` }}
                >
                  <Globe size={22} style={{ color: services[0].color }} />
                </div>

                <h3
                  className="text-2xl font-bold text-[#111827] mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {services[0].title}
                </h3>

                <p className="text-[15px] text-[#4B5563] leading-[1.8] mb-8 max-w-lg">
                  {services[0].description}
                </p>

                <a
                  href={services[0].link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0ea5e9] hover:text-[#0284c7] transition-colors group"
                >
                  View our websites
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right column — 2 stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {services.slice(1).map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.35 + idx * 0.12 }}
                  className="flex-1"
                >
                  <div
                    className="card-spotlight p-7 lg:p-8 h-full cursor-default"
                    onMouseMove={handleSpotlight}
                  >
                    <div className="absolute top-0 left-7 right-7 h-[2px] rounded-full" style={{ background: service.color }} />

                    <div className="relative z-10">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                        style={{ background: `${service.color}12` }}
                      >
                        <Icon size={20} style={{ color: service.color }} />
                      </div>

                      <h3
                        className="text-xl font-bold text-[#111827] mb-3"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {service.title}
                      </h3>

                      <p className="text-[14px] text-[#4B5563] leading-[1.7] mb-6">
                        {service.description}
                      </p>

                      <a
                        href={service.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#0284c7] transition-colors group"
                        style={{ color: service.color }}
                      >
                        Learn more
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

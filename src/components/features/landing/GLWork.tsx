"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  allProjects,
  collaborators,
} from "@/data/projects";

/* ─── Featured cards (curated) ──────────────────────────────────────────── */
const featured = [
  {
    id: "coaltrack",
    tags: ["AI", "Featured"],
    tagColors: ["#0ea5e9", "#0ea5e9"],
    title: "CoalTrack AI — Smart Billing Automation",
    desc: "4 employees. 7 days per billing cycle. One photo upload later — 1 person. 4 hours. AI changed everything for a coal distributor in Nagpur.",
    stats: [
      { value: "95%", label: "Faster billing" },
      { value: "75%", label: "Manpower cut" },
      { value: "500+", label: "Bills/day" },
    ],
    tech: ["Python", "OCR", "FastAPI"],
    href: "/portfolio",
  },
  {
    id: "revolution",
    tags: ["Mobile", "Marketing"],
    tagColors: ["#0284c7", "#0284c7"],
    title: "Revolution Fitness",
    desc: "End-to-end gym solution + brand growth strategy.",
    stats: [
      { value: "30%", label: "Growth in 3 months" },
    ],
    tech: [],
    href: "/industry/fitness",
  },
  {
    id: "mg-infra",
    tags: ["Web", "Software"],
    tagColors: ["#0ea5e9", "#0ea5e9"],
    title: "MG Infra Properties",
    desc: "Website + property management + HRMS in 3 days.",
    stats: [
      { value: "80%", label: "Tasks faster" },
    ],
    tech: [],
    href: "/portfolio",
  },
  {
    id: "vims",
    tags: ["Web", "SEO"],
    tagColors: ["#0284c7", "#0284c7"],
    title: "VIMS Hospital Nagpur",
    desc: "SEO ranking jumped from position 50 to 13 at launch.",
    stats: [
      { value: "2.5x", label: "New patients in 3 months" },
    ],
    tech: [],
    href: "/portfolio",
  },
  {
    id: "goldharvest",
    tags: ["AI", "Fintech"],
    tagColors: ["#0ea5e9", "#0ea5e9"],
    title: "GoldHarvest Pro",
    desc: "From 300 to 1200+ customers on a digital platform.",
    stats: [
      { value: "3x", label: "Customer enrollment growth" },
    ],
    tech: [],
    href: "/portfolio",
  },
];

/* ─── Marquee items ─────────────────────────────────────────────────────── */
const marqueeItems = [
  "VIMS HOSPITAL — SEO RANK 50 → 13",
  "COALTRACK AI — 7 DAYS TO 4 HOURS",
  "GOLDHARVEST — 300 TO 1,200 CUSTOMERS",
  "MG INFRA — HRMS IN 3 DAYS",
  "REVOLUTION FITNESS — 120 → 350 MEMBERS",
  "FITMANAGE 360 — 80% ADMIN TIME SAVED",
];

/* ─── Industry categories ───────────────────────────────────────────────── */
const industries = [
  { name: "Coal & Energy", count: "1 product" },
  { name: "Fitness", count: "4 clients" },
  { name: "Healthcare", count: "2 projects" },
  { name: "Real Estate", count: "3 clients" },
  { name: "Retail & FMCG", count: "3+ projects" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function GLWork() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      id="work"
      className="relative py-28 lg:py-40 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="accent-line w-12 mb-8 origin-left"
            />
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-5"
            >
              Our Work
            </motion.span>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] text-[#111827]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Problems solved.
              <br />
              <span className="heading-gradient">
                Results proven.
              </span>
            </motion.h2>
          </div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:text-right lg:pt-4"
          >
            <p className="text-sm text-[#6B7280] mb-3 max-w-[240px] lg:ml-auto leading-relaxed">
              {allProjects.length}+ projects across 10 industries
              <br />
              — from Nagpur to the USA.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#111827] hover:text-[#0ea5e9] transition-colors group"
            >
              View all projects
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── Featured project cards — bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-[#E5E7EB]">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={`group border-b border-r border-[#E5E7EB] p-7 lg:p-9 flex flex-col justify-between hover:bg-[#F8FAFB] transition-colors duration-300 ${i === 0 ? "md:col-span-1 lg:row-span-2 lg:col-span-1" : ""
                }`}
              style={i === 0 ? { minHeight: "420px" } : { minHeight: "260px" }}
            >
              {/* Tags */}
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, ti) => (
                    <span
                      key={tag + ti}
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border"
                      style={{
                        color: project.tagColors[ti],
                        borderColor: project.tagColors[ti] + "30",
                        background: project.tagColors[ti] + "0a",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className="text-lg lg:text-xl font-extrabold text-[#111827] mb-1 leading-tight group-hover:text-[#0ea5e9] transition-colors"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  <Link href={project.href} className="hover:underline decoration-1 underline-offset-4">
                    {project.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-[13px] text-[#6B7280] leading-relaxed mt-3 line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Stats */}
              {project.stats.length > 0 && (
                <div className="mt-6">
                  <div className="flex flex-wrap gap-6">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <span
                          className="text-2xl lg:text-3xl font-bold text-[#111827]"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {stat.value}
                        </span>
                        <div className="text-[11px] text-[#9CA3AF] mt-1 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  {project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] text-[#9CA3AF] font-medium"
                        >
                          {t}
                          {project.tech.indexOf(t) < project.tech.length - 1 && (
                            <span className="ml-2 text-[#E5E7EB]">|</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}

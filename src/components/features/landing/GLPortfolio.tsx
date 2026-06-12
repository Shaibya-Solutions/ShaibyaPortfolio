"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  allProjects,
  featuredProjects,
  websiteProjects,
  solutionProjects,
  rndProjects,
  collaborators,
} from "@/data/projects";
import type { Project } from "@/data/projects";

/* ─── Filter categories ───────────────────────────────────────────────────── */
const FILTERS = [
  { label: "All Projects", value: "all" },
  { label: "AI & Automation", value: "ai" },
  { label: "Websites", value: "website" },
  { label: "Mobile Apps", value: "mobile" },
  { label: "Systems", value: "solution" },
  { label: "Marketing", value: "marketing" },
  { label: "R&D / MVP", value: "rnd" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

/* ─── Tag helpers ──────────────────────────────────────────────────────── */
function getProjectTags(project: Project): string[] {
  const tags: string[] = [];
  if (project.type === "solution") {
    if (project.tags.some(t => t.includes("ai") || t.includes("ocr") || t.includes("automation"))) {
      tags.push("AI"); tags.push("Automation");
    } else { tags.push("Software"); }
  } else if (project.type === "website") {
    tags.push("Web");
    if (project.servicesDelivered.some(s => s.includes("SEO"))) tags.push("SEO");
  } else {
    tags.push("R&D");
  }
  return tags.slice(0, 2);
}

const tagColorMap: Record<string, { text: string; bg: string; border: string }> = {
  "AI": { text: "#1A1A1A", bg: "transparent", border: "#D9CFC4" },
  "Automation": { text: "#1A1A1A", bg: "transparent", border: "#D9CFC4" },
  "Web": { text: "#fff", bg: "#0B7A4F", border: "#0B7A4F" },
  "SEO": { text: "#fff", bg: "#C65D07", border: "#C65D07" },
  "Software": { text: "#fff", bg: "#C65D07", border: "#C65D07" },
  "R&D": { text: "#1A1A1A", bg: "transparent", border: "#D9CFC4" },
};

function getTagStyle(tag: string) {
  return tagColorMap[tag] || { text: "#1A1A1A", bg: "transparent", border: "#D9CFC4" };
}

/* ─── Filter logic ──────────────────────────────────────────────────────── */
function filterProjects(projects: Project[], filter: FilterValue): Project[] {
  switch (filter) {
    case "all": return projects;
    case "ai": return projects.filter(p =>
      p.tags.some(t => t.includes("ai") || t.includes("ocr") || t.includes("automation")) ||
      p.servicesDelivered.some(s => s.includes("AI") || s.includes("Automation"))
    );
    case "website": return projects.filter(p => p.type === "website");
    case "mobile": return projects.filter(p =>
      p.tags.some(t => t.includes("mobile") || t.includes("app"))
    );
    case "solution": return projects.filter(p => p.type === "solution");
    case "marketing": return projects.filter(p =>
      p.servicesDelivered.some(s => s.includes("Marketing") || s.includes("Social Media") || s.includes("SEO"))
    );
    case "rnd": return projects.filter(p => p.type === "rnd");
    default: return projects;
  }
}

/* ─── Animation variants ───────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ─── Individual project card (editorial grid cell) ────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const displayTags = getProjectTags(project);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-r border-[#D9CFC4] p-7 lg:p-9 flex flex-col justify-between hover:bg-[#F5EDE4] transition-colors duration-300"
      style={{ minHeight: "280px" }}
    >
      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {displayTags.map((tag) => {
            const style = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border"
                style={{ color: style.text, borderColor: style.border, background: style.bg }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Title */}
        <h3
          className="text-lg lg:text-xl font-extrabold text-[#1A1A1A] mb-1 leading-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {project.name}
        </h3>

        {/* Client */}
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999] mb-3">
          {project.client}
        </p>

        {/* Description */}
        <p className="text-[13px] text-[#6B6B6B] leading-relaxed line-clamp-3">
          {project.solution}
        </p>
      </div>

      {/* Stats + tech */}
      <div className="mt-6">
        {project.stats.length > 0 && (
          <div className="flex flex-wrap gap-6 mb-4">
            {project.stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <span className="text-2xl lg:text-3xl font-black text-[#1A1A1A]" style={{ fontFamily: "var(--font-syne)" }}>
                  {stat.value}
                </span>
                <div className="text-[11px] text-[#999] mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {project.techStack.slice(0, 4).map((t, ti) => (
            <span key={t} className="text-[11px] text-[#999] font-medium">
              {t}{ti < Math.min(project.techStack.length, 4) - 1 && <span className="ml-2 text-[#D9CFC4]">|</span>}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════ */
export default function GLPortfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const displayProjects = filterProjects(
    activeFilter === "all" ? featuredProjects : allProjects,
    activeFilter
  );

  // Fallback: if filter returns nothing, show featured
  const projects = displayProjects.length > 0 ? displayProjects : featuredProjects;

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "#FBF7F2" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ color: "#C65D07" }}
            >
              Portfolio
            </motion.span>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.08] text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Every project.
              <br />
              <span style={{ color: "#C65D07", fontStyle: "italic" }}>
                Every story.
              </span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-4 text-[15px] text-[#999] max-w-lg leading-relaxed"
            >
              Filter by industry or service type. Click any project for the full story.
            </motion.p>
          </div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden lg:block shrink-0 pt-4"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C65D07] transition-colors group"
            >
              View all projects
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex overflow-x-auto gap-0 mb-0 scrollbar-hide border-b border-[#D9CFC4] -mb-px"
          role="tablist"
          aria-label="Filter projects by type"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`relative px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 uppercase tracking-wider ${
                activeFilter === f.value
                  ? "text-[#1A1A1A]"
                  : "text-[#999] hover:text-[#6B6B6B]"
              }`}
            >
              {f.label}
              {activeFilter === f.value && (
                <motion.div
                  layoutId="portfolioTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "#1A1A1A" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Project grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[#D9CFC4]"
          >
            {projects.slice(0, 6).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
            {/* Balance odd count */}
            {projects.slice(0, 6).length % 2 !== 0 && (
              <div className="border-b border-r border-[#D9CFC4]" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Mobile CTA ── */}
        <div className="mt-10 text-center lg:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C65D07]"
          >
            View all projects <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

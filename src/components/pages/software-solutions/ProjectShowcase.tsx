"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { solutionProjects, websiteProjects } from "@/data/projects";

const projects = [
  ...solutionProjects.slice(0, 3),
  ...websiteProjects.slice(0, 2),
];

export default function ProjectShowcase() {
  const [selected, setSelected] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = projects[selected];
  return (
    <div
      className="grid min-w-0 gap-8 lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]"
      data-project-showcase
    >
      <div className="min-w-0">
        <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">
          Selected projects / 0{selected + 1}
        </p>
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 lg:flex-col"
          role="tablist"
          aria-label="Featured projects"
          aria-orientation="horizontal"
        >
          {projects.map((item, index) => (
            <button
              key={item.slug}
              id={`project-tab-${index}`}
              role="tab"
              aria-selected={selected === index}
              aria-controls="featured-project-panel"
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                const offset =
                  event.key === "ArrowRight" || event.key === "ArrowDown"
                    ? 1
                    : event.key === "ArrowLeft" || event.key === "ArrowUp"
                      ? -1
                      : 0;
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? projects.length - 1
                      : offset
                        ? (index + offset + projects.length) % projects.length
                        : null;
                if (next !== null) {
                  event.preventDefault();
                  setSelected(next);
                  document.getElementById(`project-tab-${next}`)?.focus();
                }
              }}
              className={`flex shrink-0 items-center justify-between gap-5 rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-sky-500 ${selected === index ? "border-sky-400 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              <span>{item.name}</span>
              <span className="text-xs opacity-60">0{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        id="featured-project-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${selected}`}
        tabIndex={0}
        className="min-w-0"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <AnimatePresence initial={false}>
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", duration: reduceMotion ? 0 : 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={project.thumbnail}
                alt={
                  project.thumbnailAlt ??
                  `${project.name} ${project.type === "website" ? "website" : "software"} project preview`
                }
                fill
                sizes="(max-width: 1023px) 100vw, 65vw"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">
            {project.industry}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {project.name}
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">
            {project.tagline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            {project.keyFeatures?.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check size={14} className="shrink-0 text-sky-500" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href={
              project.type === "website"
                ? "/portfolio/websites"
                : "/portfolio/solutions"
            }
            className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-700 hover:underline"
          >
            Explore our portfolio <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

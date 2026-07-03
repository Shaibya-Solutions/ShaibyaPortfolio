"use client";
import { useRef } from "react";
import { projects } from "@/data";
import CardSwap from "@/components/ui/CardSwap";
import { motion } from "framer-motion";

export default function StackCaseStudies() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative mb-8 sm:mb-16 bg-white px-4 overflow-hidden py-16 sm:py-20"
    >
      {/* Section label */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-2">
          Case Studies
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Our Projects
        </h2>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
          Real businesses, real results — measurable impact delivered
        </p>
      </div>

      <div className="w-full relative max-w-8xl mx-auto">
        {/* Desktop View */}
        <div className="hidden lg:block relative h-[560px] xl:h-[540px]">
          <CardSwap
            onCardClick={undefined}
            easing="elastic"
            pauseOnHover={true}
            delay={3000}
            width={600}
            height={490}
          >
            {projects.map((project) => {
              return (
                <div
                  key={project.title}
                  className="absolute top-0 inset-0 bg-white border border-slate-200 rounded-3xl shadow-xl p-10 flex flex-col gap-4 justify-between items-start hover:border-amber-300 transition-colors"
                >
                  {/* Amber accent top bar */}
                  <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />

                  <h3 className="text-2xl max-w-lg font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-sm max-w-lg text-slate-500 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>

                  <div className="mt-2 grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
                    {project.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-1 rounded-xl bg-amber-50 border border-amber-100 p-3"
                      >
                        <span className="text-2xl font-extrabold text-amber-600">
                          {stat.value}
                        </span>
                        <span className="text-slate-500 text-xs leading-snug">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardSwap>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col gap-5 mt-4 w-full">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="w-full flex flex-col gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-amber-300 transition-colors"
            >
              <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
              <h3 className="text-xl font-bold text-slate-900">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {project.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {project.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-0.5 rounded-xl bg-amber-50 border border-amber-100 p-3"
                  >
                    <span className="text-xl font-extrabold text-amber-600">
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

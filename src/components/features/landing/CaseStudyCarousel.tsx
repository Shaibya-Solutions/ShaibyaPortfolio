"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const cases = [
  { tag: "AI Automation", title: "CoalTrack AI", desc: "7-day billing process → 4 hours. One AI tool replaced 4 employees.", stats: [{ v: "95%", l: "Faster" }, { v: "4→1", l: "Staff" }], image: "/images/solutions/coal.png", href: "/portfolio/solutions#coaltrack-ai" },
  { tag: "Fitness", title: "FitManage 360", desc: "Complete gym management. Renewals, attendance, payments — all automated.", stats: [{ v: "120→350", l: "Members" }, { v: "80%", l: "Time saved" }], image: "/images/solutions/fitlife.png", href: "/portfolio/solutions#fitmanage-360" },
  { tag: "Healthcare", title: "VIMS Hospital", desc: "Zero to 10k monthly visits. Online booking for 150+ doctors.", stats: [{ v: "10k+", l: "Monthly visits" }, { v: "2.5x", l: "Patients" }], image: "/images/solutions/vims.png", href: "/portfolio/websites" },
  { tag: "Startup", title: "Snyppit", desc: "Fashion delivered in minutes. Student had a plan — we built the platform.", stats: [{ v: "4wk", l: "Launch time" }, { v: "Live", l: "Status" }], image: "/images/solutions/memorybox.png", href: "/snyppit" },
];

export default function CaseStudyCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-28 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B4E61] mb-4">Featured Work</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.1]">Projects that<br />moved the needle.</h2>
          </div>
          <Link href="/portfolio/solutions" className="group inline-flex items-center gap-2 text-[#0B4E61] font-semibold text-sm border-b-2 border-[#0B4E61]/20 hover:border-[#0B4E61] pb-0.5 transition-colors shrink-0">
            View all projects <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Alternating layout cards */}
        <div className="space-y-8">
          {cases.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}>
              <Link href={c.href} className="group block">
                <div className={`bg-white rounded-3xl overflow-hidden border border-[#e5e7eb] hover:shadow-xl hover:shadow-black/5 transition-all duration-500 flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Image */}
                  <div className="md:w-2/5 relative min-h-[280px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#010D18]">{c.tag}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#010D18] mb-3 group-hover:text-[#0B4E61] transition-colors">{c.title}</h3>
                    <p className="text-[#4a5568] leading-relaxed mb-8 text-base max-w-lg">{c.desc}</p>
                    <div className="flex items-center gap-8">
                      {c.stats.map(s => (
                        <div key={s.l}>
                          <span className="text-2xl font-black text-[#010D18]">{s.v}</span>
                          <p className="text-xs text-[#4a5568] mt-0.5">{s.l}</p>
                        </div>
                      ))}
                      <div className="ml-auto w-10 h-10 rounded-full border border-[#e5e7eb] flex items-center justify-center group-hover:bg-[#0B4E61] group-hover:border-[#0B4E61] group-hover:text-white text-[#0B4E61] transition-all shrink-0">
                        <FaArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

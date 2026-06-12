"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const industries = [
  {
    id: "real-estate",
    label: "Real Estate",
    headline: "Nagpur's property market is booming. Most agencies still run on WhatsApp.",
    points: [
      "Website + CRM + Lead Automation",
      "Site visit scheduling with auto-reminders",
      "Document management & commission tracking",
    ],
    stat: { value: "3", label: "Live clients in Nagpur" },
    link: "/industry/real-estate",
    image: "/images/solutions/pushkarna.png",
  },
  {
    id: "fitness",
    label: "Fitness",
    headline: "Revolution Fitness grew 120→350 members. The system is ready for your gym.",
    points: [
      "Membership + auto renewal reminders",
      "Attendance tracking & trainer scheduling",
      "Payment dashboard & WhatsApp bot",
    ],
    stat: { value: "5", label: "Gym brands automated" },
    link: "/industry/fitness",
    image: "/images/solutions/gym.png",
  },
];

export default function IndustryTabs() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const ind = industries[active];

  return (
    <section ref={ref} className="py-28 bg-[#faf9f7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B4E61] mb-4">Industries</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.1]">
            Deep expertise in<br />two verticals.
          </h2>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-14">
          {industries.map((ind, i) => (
            <button key={ind.id} onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${i === active ? "bg-[#0B4E61] text-white" : "bg-white text-[#010D18] border border-[#e5e7eb] hover:border-[#0B4E61]/30"}`}>
              {ind.label}
            </button>
          ))}
        </div>

        {/* Content — asymmetric split */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">

            {/* Left — text (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-2xl md:text-3xl font-bold text-[#010D18] leading-snug mb-8">{ind.headline}</h3>

              <ul className="space-y-4 mb-10">
                {ind.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#0B4E61] shrink-0" />
                    <span className="text-[#4a5568] text-base">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-8 mb-8">
                <div>
                  <span className="text-4xl font-black text-[#0B4E61]">{ind.stat.value}</span>
                  <p className="text-sm text-[#4a5568] mt-1">{ind.stat.label}</p>
                </div>
                <Link href={ind.link} className="group inline-flex items-center gap-2 bg-[#0B4E61] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#034078] transition-colors">
                  Learn more <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right — image (2 cols) */}
            <div className="lg:col-span-2 relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl shadow-black/5"
                style={{ clipPath: "polygon(0% 5%, 100% 0%, 95% 100%, 5% 95%)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ind.image} alt={ind.label} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-[#0B4E61]/10 rounded-xl -z-10" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

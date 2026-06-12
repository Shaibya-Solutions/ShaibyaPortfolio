"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "@/data";

function TestimonialCard({ item }: { item: (typeof testimonials)[0] }) {
  return (
    <div className="w-[400px] shrink-0 mx-3">
      <div className="h-full bg-white rounded-2xl p-8 border border-[#e5e7eb] hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group">
        <FaQuoteLeft className="text-[#0B4E61]/15 mb-4" size={24} />
        <p className="text-[#010D18] leading-relaxed mb-6 text-[15px]">{item.text}</p>
        <div className="pt-5 border-t border-[#f0f0ee]">
          <p className="font-bold text-[#010D18] text-sm">{item.author}</p>
          <p className="text-[#4a5568] text-xs mt-0.5">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="py-28 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B4E61] mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#010D18] leading-[1.1]">
            What our clients<br />actually say.
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — left scroll */}
      <div className="overflow-hidden mb-4">
        <div className="marquee-track">{doubled.map((t, i) => <TestimonialCard key={`a-${i}`} item={t} />)}</div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="overflow-hidden">
        <div className="marquee-track-reverse">{doubled.map((t, i) => <TestimonialCard key={`b-${i}`} item={t} />)}</div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    </section>
  );
}

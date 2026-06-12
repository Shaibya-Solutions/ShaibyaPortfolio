"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from "react-icons/fa";
import { testimonials } from "@/data";

export default function ProfitTestimonials() {
    const [idx, setIdx] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const prev = () => setIdx((p) => (p - 1 + testimonials.length) % testimonials.length);
    const next = () => setIdx((p) => (p + 1) % testimonials.length);

    const t = testimonials[idx];

    return (
        <section ref={ref} className="py-28 bg-[#010D18] relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0B4E61]/12 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64B0C6] mb-4">
                        Testimonials
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.08]">
                        What our clients
                        <br />
                        are saying.
                    </h2>
                </motion.div>

                {/* Carousel */}
                <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/[0.05] border border-white/[0.1] rounded-3xl p-10 md:p-14 text-center backdrop-blur-sm"
                        >
                            <FaQuoteLeft className="text-[#0B4E61] mx-auto mb-6" size={28} />

                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-6">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar key={i} className="text-[#1282A2]" size={14} />
                                ))}
                            </div>

                            <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            <div>
                                <p className="font-bold text-white">{t.author}</p>
                                <p className="text-[#64B0C6] text-sm mt-1">{t.role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            aria-label="Previous testimonial"
                            className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <FaArrowLeft size={14} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIdx(i)}
                                    aria-label={`Testimonial ${i + 1}`}
                                    className={`rounded-full transition-all ${i === idx
                                            ? "w-6 h-2 bg-[#1282A2]"
                                            : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            aria-label="Next testimonial"
                            className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <FaArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Project timelines vary based on complexity. Most business websites are delivered within 2–4 weeks, while more advanced platforms—such as CRM systems, booking platforms, or custom web applications—typically take 4–8 weeks. Following our initial consultation, we'll provide a detailed project roadmap with clear milestones and delivery timelines."
  },
  {
    q: "Can you handle RERA requirements for real estate?",
    a: "Yes. We build real estate platforms with RERA compliance considerations, including required disclosures, project registration details, and compliant advertisement formats. Our solutions are designed to help you present property information accurately while meeting industry requirements."
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Absolutely. Every project includes 30 days of complimentary post-launch support to ensure a smooth transition. Beyond that, we offer flexible maintenance plans tailored to your needs. Many clients continue working with us long-term as we help optimize, maintain, and continuously improve their systems."
  },
  {
    q: "I'm not tech-savvy. Can I still use your systems?",
    a: "Absolutely. Our solutions are designed for business owners and teams—not just technical users. We focus on creating simple, intuitive experiences that are easy to adopt. If you can use everyday tools like WhatsApp, you can confidently use our systems. We also provide hands-on training to help your team get started."
  }
];

export default function GLFAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} id="faq" className="relative bg-white py-32 lg:py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 lg:gap-24">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
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
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[clamp(2rem,3.5vw,2.5rem)] font-bold text-[#111827] mb-5 leading-[1.15]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Questions we <span className="heading-gradient">get asked.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[15px] text-[#6B7280] leading-relaxed"
            >
              Can&apos;t find what you&apos;re looking for? Reach out on WhatsApp — we respond fast.
            </motion.p>
          </div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-xl border transition-all duration-300 overflow-hidden"
                  style={{
                    borderColor: isOpen ? "rgba(14,165,233,0.2)" : "#E5E7EB",
                    background: isOpen ? "#FAFCFF" : "#ffffff",
                    boxShadow: isOpen ? "0 4px 24px rgba(14,165,233,0.05)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="text-[15px] font-semibold transition-colors duration-200 pr-4"
                      style={{ color: isOpen ? "#111827" : "#4B5563" }}
                    >
                      {faq.q}
                    </span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: isOpen ? "#0ea5e9" : "#F1F5F9",
                      }}
                    >
                      {isOpen
                        ? <Minus size={13} className="text-white" />
                        : <Plus size={13} className="text-[#9CA3AF]" />
                      }
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <div className="h-px bg-[#E5E7EB] mb-4" />
                          <p className="text-[14px] text-[#6B7280] leading-[1.8]">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  /** Title shown on the left side. Defaults to "Questions & Answers" */
  title?: string;
  /** Subtitle shown below the title */
  subtitle?: string;
  /** Phone number to display */
  phone?: string;
  /** Email to display */
  email?: string;
  /** Accent color. Defaults to "#0ea5e9" */
  accentColor?: string;
  /** Section id attribute */
  id?: string;
  /** Background style variant */
  variant?: "light" | "white";
}

export default function FAQSection({
  items,
  title = "Questions & Answers",
  subtitle = "Have more questions? Don't hesitate to reach out:",
  phone = "+91 7498341146",
  email = "shaibyasolutions@gmail.com",
  accentColor = "#0ea5e9",
  id = "faq",
  variant = "light",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={id}
      className={`relative py-24 lg:py-32 overflow-hidden ${variant === "light" ? "bg-[#f4f7fa]" : "bg-white"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 lg:gap-20 items-start">

          {/* ── Left column ── */}
          <div className="lg:sticky lg:top-32 lg:self-start relative">
            {/* Watermark */}
            <div
              className="absolute -bottom-4 left-0 text-[clamp(6rem,14vw,11rem)] font-black leading-none select-none pointer-events-none tracking-tight"
              style={{
                fontFamily: "var(--font-syne)",
                color: variant === "light" ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.025)",
              }}
            >
              FAQ
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-[#111827] mb-4 leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[15px] text-[#6B7280] leading-relaxed mb-10"
              >
                {subtitle}
              </motion.p>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-5"
              >
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: `${accentColor}12` }}
                  >
                    <FaPhone size={14} style={{ color: accentColor }} />
                  </div>
                  <span className="text-[15px] text-[#374151] font-medium group-hover:text-[#111827] transition-colors">
                    {phone}
                  </span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: `${accentColor}12` }}
                  >
                    <FaEnvelope size={14} style={{ color: accentColor }} />
                  </div>
                  <span className="text-[15px] text-[#374151] font-medium group-hover:text-[#111827] transition-colors">
                    {email}
                  </span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* ── Right column — accordion ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            {items.map((faq, i) => {
              const isOpen = openIndex === i;
              const num = String(i + 1).padStart(2, "0");

              return (
                <div
                  key={i}
                  className="rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isOpen ? `${accentColor}30` : "#E5E7EB",
                    background: isOpen ? "#ffffff" : "#fdfdfe",
                    boxShadow: isOpen
                      ? `0 4px 24px ${accentColor}08`
                      : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f8fafb] group"
                    aria-expanded={isOpen}
                  >
                    {/* Number */}
                    <span
                      className="text-lg font-bold shrink-0 tabular-nums transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-syne)",
                        color: isOpen ? accentColor : "#CBD5E1",
                      }}
                    >
                      {num}
                    </span>

                    {/* Question */}
                    <span
                      className="flex-1 text-[15px] font-semibold transition-colors duration-200"
                      style={{ color: isOpen ? "#111827" : "#4B5563" }}
                    >
                      {faq.q}
                    </span>

                    {/* Chevron */}
                    <ChevronDown
                      size={18}
                      className="shrink-0 transition-transform duration-300"
                      style={{
                        color: isOpen ? accentColor : "#9CA3AF",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-16">
                          <div className="h-px bg-[#E5E7EB] mb-4" />
                          <p className="text-[14px] text-[#6B7280] leading-[1.85]">
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

"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaMedium, FaWhatsapp } from "react-icons/fa";
import { Section } from "@/components/shared/section";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    desc: "Behind-the-scenes, project reveals & team moments",
    cta: "Follow Us",
    href: "https://www.instagram.com/shaibya.solutions?igsh=emE3dTg4NHVjd243",
    icon: FaInstagram,
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-600",
    glow: "bg-pink-400",
  },
  {
    label: "LinkedIn",
    desc: "Company news, hiring updates & professional insights",
    cta: "Connect",
    href: "https://www.linkedin.com/company/shaibyasolutions/about/",
    icon: FaLinkedin,
    gradient: "from-blue-600 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    glow: "bg-blue-400",
  },
  {
    label: "Blog",
    desc: "Technical deep-dives, tutorials & case studies",
    cta: "Read Now",
    href: "https://medium.com/@shaibyasolutions",
    icon: FaMedium,
    gradient: "from-slate-700 to-slate-900",
    bg: "bg-slate-100",
    border: "border-slate-200",
    text: "text-slate-700",
    glow: "bg-slate-400",
  },
  {
    label: "WhatsApp",
    desc: "Quick questions? Message us directly — we're fast",
    cta: "Chat Now",
    href: "https://wa.me/917498341146?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20services.",
    icon: FaWhatsapp,
    gradient: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    glow: "bg-green-400",
  },
];

export default function SocialGrid({ className = "mb-0" }: { className?: string }) {
  return (
    <Section className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-2">
          Stay Connected
        </p>
        <h2 className="text-4xl font-bold text-slate-900">
          Find Us Everywhere
        </h2>
        <p className="mt-3 text-slate-500 max-w-lg mx-auto text-sm">
          Follow us for behind-the-scenes, case studies, and all the latest from the crew.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {SOCIAL_LINKS.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`group relative flex flex-col gap-4 rounded-2xl border ${s.border} p-6 overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer ${s.bg}`}
          >
            {/* Glow blob */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none ${s.glow}`} />

            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-md`}>
              <s.icon size={22} />
            </div>

            <div className="relative z-10">
              <p className={`font-bold text-lg ${s.text}`}>{s.label}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
            </div>

            <div className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold ${s.text} opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0`}>
              {s.cta} <span className="text-sm">↗</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Quick-connect bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl bg-slate-950 p-6 sm:p-8"
      >
        <div className="text-center sm:text-left">
          <p className="text-white font-bold text-lg">Got a project in mind?</p>
          <p className="text-slate-400 text-sm">Drop us a message — we reply fast.</p>
        </div>
        <div className="flex gap-3">
          <a
            href="mailto:shaibyasolutions@gmail.com?subject=Enquiry"
            className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400 hover:scale-105"
          >
            Email Us
          </a>
          <a
            href="https://wa.me/917498341146?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 hover:scale-105"
          >
            WhatsApp
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

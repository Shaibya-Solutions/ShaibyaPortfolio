// components/site-footer.tsx
"use client";
import Link from "next/link";
import {
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaMedium,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const socials = [
  {
    href: "https://www.linkedin.com/company/shaibyasolutions/about/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    href: "https://www.instagram.com/shaibya.solutions?igsh=emE3dTg4NHVjd243",
    icon: FaInstagram,
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  {
    href: "https://medium.com/@shaibyasolutions",
    icon: FaMedium,
    label: "Blog / Medium",
    color: "hover:text-white",
  },
  {
    href: "https://wa.me/917498341146",
    icon: FaWhatsapp,
    label: "WhatsApp",
    color: "hover:text-green-400",
  },
];

export function SiteFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.footer
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-slate-950 border-t border-slate-800 relative overflow-hidden"
    >
      {/* Subtle teal glow top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-64 w-64 opacity-10 rounded-full"
        style={{
          background: "radial-gradient(circle, #0B4E61, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Main footer grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-10 sm:pb-14 pt-12 sm:pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-slate-400">

        {/* Company Identity */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1"
        >
          <Link href="/" className="mb-4 block">
            <span className="text-xl font-bold text-white">Shaibya</span>
            <span className="ml-1 rounded-full bg-teal-500/20 px-2 py-0.5 text-sm font-semibold text-teal-400">
              Solutions
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-5">
            We build digital systems that actually work for your business.
            Custom websites, automation, and tech solutions.
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all hover:border-slate-500 hover:scale-110 ${s.color}`}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Industries */}
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            Industries
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/industry/real-estate" className="transition hover:text-teal-400">
                Real Estate
              </Link>
            </li>
            <li>
              <Link href="/industry/fitness" className="transition hover:text-teal-400">
                Fitness Studios
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Portfolio */}
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            Portfolio
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/portfolio/websites" className="transition hover:text-teal-400">
                Websites
              </Link>
            </li>
            <li>
              <Link href="/portfolio/solutions" className="transition hover:text-teal-400">
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/portfolio/rnd" className="transition hover:text-teal-400">
                R&D / MVPs
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Connect */}
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/snyppit" className="flex items-center gap-2 transition hover:text-teal-400">
                Our Story (Snyppit)
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/917498341146"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-green-400"
              >
                <FaWhatsapp size={13} /> WhatsApp Us
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contact + Locations */}
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            Contact
          </h3>
          <div className="space-y-2.5 text-sm mb-6">
            <a
              href="tel:+917498341146"
              className="flex items-center gap-2 hover:text-teal-400 transition"
            >
              <FaPhone className="text-teal-500/80 flex-shrink-0" size={12} />
              +91 7498341146
            </a>
            <a
              href="mailto:shaibyasolutions@gmail.com?cc=shaibyadevs@gmail.com&subject=Enquiry"
              className="flex items-start gap-2 hover:text-teal-400 transition break-all"
            >
              <IoMail className="text-teal-500/80 flex-shrink-0 mt-0.5" size={14} />
              shaibyasolutions@gmail.com
            </a>
          </div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
            Locations
          </h4>
          <ul className="space-y-1.5 text-sm">
            {["Nagpur (India)", "Texas (USA)", "Noida (India)"].map((loc) => (
              <li key={loc} className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-teal-500/70 flex-shrink-0" size={11} />
                {loc}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/80 py-5 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Shaibya Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-5">
            <a
              href="https://medium.com/@shaibyasolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition"
            >
              Blog
            </a>
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition whitespace-nowrap">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

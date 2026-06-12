"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    FaPhone,
    FaLinkedin,
    FaInstagram,
    FaMedium,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaArrowRight,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const socials = [
    { href: "https://www.linkedin.com/company/shaibyasolutions/about/", icon: FaLinkedin, label: "LinkedIn" },
    { href: "https://www.instagram.com/shaibya.solutions?igsh=emE3dTg4NHVjd243", icon: FaInstagram, label: "Instagram" },
    { href: "https://medium.com/@shaibyasolutions", icon: FaMedium, label: "Blog" },
    { href: "https://wa.me/917498341146", icon: FaWhatsapp, label: "WhatsApp" },
];

const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Industries", href: "/#industries" },
    { label: "Our Team", href: "/#team" },
    { label: "Portfolio", href: "/portfolio/solutions" },
];

const infoLinks = [
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Our Story", href: "/snyppit" },
];

export function ProfitFooter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail("");
        }
    };

    return (
        <footer ref={ref} className="bg-[#010D18] border-t border-white/[0.06] relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0B4E61]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Main grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] gap-12">

                    {/* Brand + address + subscribe */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.05 }}
                    >
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center gap-1 mb-5 group">
                            <span className="text-xl font-bold text-white">Shaibya</span>
                            <span className="ml-1 rounded-full bg-[#0B4E61]/40 px-2.5 py-0.5 text-sm font-semibold text-[#64B0C6] ring-1 ring-[#0B4E61]/40">
                                Solutions
                            </span>
                        </Link>

                        {/* Address */}
                        <div className="flex items-start gap-3 mb-6 text-white/50 text-sm">
                            <FaMapMarkerAlt className="text-[#64B0C6] mt-0.5 shrink-0" size={13} />
                            <span>Nagpur, Maharashtra, India<br />Also in Noida &amp; Texas, USA</span>
                        </div>

                        {/* Email subscribe */}
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                            Stay updated
                        </p>
                        {submitted ? (
                            <p className="text-[#64B0C6] text-sm font-medium">Thanks for subscribing!</p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#0B4E61] transition-colors"
                                />
                                <button
                                    type="submit"
                                    aria-label="Subscribe"
                                    className="w-10 h-10 rounded-full bg-[#0B4E61] flex items-center justify-center text-white hover:bg-[#1282A2] transition-colors shrink-0"
                                >
                                    <FaArrowRight size={13} />
                                </button>
                            </form>
                        )}
                        <p className="text-white/25 text-[10px] mt-2 leading-relaxed">
                            By subscribing you agree to our Privacy Policy and consent to receive updates.
                        </p>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-5">
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            {navLinks.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15 }}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-5">
                            Information
                        </h3>
                        <ul className="space-y-3">
                            {infoLinks.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact + socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-5">
                            Contact
                        </h3>
                        <div className="space-y-3 mb-8">
                            <a
                                href="tel:+917498341146"
                                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                            >
                                <FaPhone className="text-[#64B0C6] shrink-0" size={12} />
                                +91 7498341146
                            </a>
                            <a
                                href="mailto:shaibyasolutions@gmail.com"
                                className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors break-all"
                            >
                                <IoMail className="text-[#64B0C6] shrink-0 mt-0.5" size={14} />
                                shaibyasolutions@gmail.com
                            </a>
                            <a
                                href="https://wa.me/917498341146"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-white/60 hover:text-green-400 transition-colors"
                            >
                                <FaWhatsapp className="text-[#64B0C6] shrink-0" size={14} />
                                WhatsApp us
                            </a>
                        </div>

                        {/* Socials */}
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                            Socials
                        </h3>
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
                                        className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center text-white/50 hover:border-[#0B4E61] hover:text-[#64B0C6] hover:bg-[#0B4E61]/20 transition-all"
                                    >
                                        <Icon size={14} />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.06] py-5 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
                    <p>© {new Date().getFullYear()} Shaibya Solutions — All rights reserved.</p>
                    <p className="text-center text-white/20 text-[10px] max-w-lg leading-relaxed hidden lg:block">
                        Shaibya Solutions is a digital products studio registered in India. All information is provided for general purposes only.
                        We do not provide legal, financial, or regulatory advice.
                    </p>
                    <div className="flex gap-5">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <a href="https://medium.com/@shaibyasolutions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

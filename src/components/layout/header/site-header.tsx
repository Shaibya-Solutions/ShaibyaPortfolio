"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/data";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import NavHeader from "@/components/ui/nav-header";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMobileDropdown = (label: string) =>
    setMobileDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));

  useEffect(() => {
    const handleScroll = () => {
      // Shrink over the first 300px of scroll, then stay compact
      const progress = Math.min(window.scrollY / 300, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interpolate padding: py-8 (32px) → py-3 (12px)
  const verticalPadding = 32 - scrollProgress * 20;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      {/* 
        Use a full-width relative container.
        The nav pill is absolutely centered; nothing else on desktop.
      */}
      <div
        className="relative w-full px-6 lg:px-12 flex items-center justify-center md:justify-center"
        style={{
          paddingTop: `${verticalPadding}px`,
          paddingBottom: `${verticalPadding}px`,
          transition: "padding 0.1s ease-out",
        }}
      >

        {/* Desktop: nav pill absolutely centered */}
        <div className="hidden md:block">
          <NavHeader items={nav} scrollProgress={scrollProgress} />
        </div>

        {/* Mobile: logo left + hamburger right */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" aria-label="Shaibya Solutions Home">
            <Image
              src="/images/Screenshot 2026-07-05 011613.png"
              alt="Shaibya Solutions"
              width={200}
              height={67}
              className="h-16 w-auto object-contain"
              style={{
                transform: `scale(${1 - scrollProgress * 0.15})`,
                transformOrigin: "left center",
                filter: "drop-shadow(0 2px 6px rgba(14,165,233,0.15))",
                mixBlendMode: "multiply",
                transition: "all 0.1s ease-out",
              }}
              priority
            />
          </Link>

          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2 text-white transition hover:bg-white/[0.1]"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-1 px-6 py-4">
              {nav.map((item) =>
                item.hasDropdown && item.dropdownItems ? (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <FaChevronDown
                        size={11}
                        className={`text-gray-400 transition-transform ${mobileDropdowns[item.label] ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileDropdowns[item.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-4 mt-1 flex flex-col gap-0.5 overflow-hidden border-l border-gray-200 pl-3"
                        >
                          {item.dropdownItems.slice(0, 3).map((dropItem) => (
                            <Link
                              key={dropItem.href}
                              href={dropItem.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                            >
                              {dropItem.icon && (
                                <dropItem.icon className="text-[#0ea5e9]" size={13} />
                              )}
                              <span>{dropItem.label}</span>
                            </Link>
                          ))}
                          {item.dropdownItems.length > 3 && (
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-end gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-[#0ea5e9] hover:bg-[#0ea5e9]/8 transition-colors"
                            >
                              View more
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6h7m0 0L6.5 3m3 3L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Mobile CTA */}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}
              >
                Get in Touch
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

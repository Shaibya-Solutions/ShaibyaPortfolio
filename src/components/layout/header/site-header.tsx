"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { triggerHaptic } from "@/lib/haptics";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/data";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import NavHeader from "@/components/ui/nav-header";

export function SiteHeader() {
  const menuToggle = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuToggle.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  // Interpolate padding: py-8 (32px) → py-3 (12px)
  const verticalPadding = 32 - scrollProgress * 20;

  return (
    <header
      data-mobile-menu-open={open}
      className="fixed inset-x-0 top-0 z-50 isolate border-b border-slate-200 bg-white shadow-xs xl:border-b-0 xl:bg-transparent xl:shadow-none"
    >
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-x-0 bottom-0 top-[81px] -z-10 bg-slate-950/40 xl:hidden"
        />
      )}
      {/* 
        Use a full-width relative container.
        The nav pill is absolutely centered; nothing else on desktop.
      */}
      <div
        className="relative flex w-full items-center justify-center px-4 py-3 sm:px-6 lg:px-12 xl:py-(--desktop-nav-padding) xl:transition-[padding] xl:duration-100"
        style={{
          "--desktop-nav-padding": `${verticalPadding}px`,
        } as React.CSSProperties}
      >

        {/* Desktop: nav pill absolutely centered */}
        <div className="hidden xl:block">
          <NavHeader items={nav} scrollProgress={scrollProgress} />
        </div>

        {/* Mobile: logo left + hamburger right */}
        <div className="flex w-full items-center justify-between xl:hidden">
          <Link href="/" prefetch={true} onPointerDown={() => triggerHaptic(8)} onClick={() => setOpen(false)} aria-label="Shaibya Solutions Home">
            <Image
              src="/images/logo-mobile-400.webp"
              alt="Shaibya Solutions"
              width={200}
              height={67}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <button
            ref={menuToggle}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onPointerDown={() => triggerHaptic(8)}
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-slate-200 bg-white min-w-[48px] min-h-[48px] flex items-center justify-center p-2 text-slate-900 transition-all duration-75 active:scale-90 hover:bg-slate-50"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            data-lenis-prevent
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="max-h-[calc(100dvh-81px)] overflow-x-hidden overflow-y-auto overscroll-contain border-t border-gray-200 bg-white xl:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl gap-1 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {nav.map((item) =>
                item.hasDropdown && item.dropdownItems ? (
                  <div key={item.label}>
                    <button
                      onClick={() => {
                        triggerHaptic(6);
                        toggleMobileDropdown(item.label);
                      }}
                      aria-expanded={!!mobileDropdowns[item.label]}
                      className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2.5 text-gray-700 active:scale-[0.98] transition-all duration-75 hover:bg-gray-100 hover:text-black"
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
                          {item.dropdownItems.map((dropItem) => (
                            <Link
                              key={dropItem.href}
                              href={dropItem.href}
                              prefetch={true}
                              onPointerDown={() => triggerHaptic(8)}
                              onClick={() => setOpen(false)}
                              className="flex min-h-11 items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-600 active:scale-[0.98] transition-all duration-75 hover:bg-gray-100 hover:text-black"
                            >
                              {dropItem.icon && (
                                <dropItem.icon className="text-[#0ea5e9]" size={13} />
                              )}
                              <span>{dropItem.label}</span>
                            </Link>
                          ))}

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onPointerDown={() => triggerHaptic(8)}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 active:scale-[0.98] transition-all duration-75 hover:bg-gray-100 hover:text-black"
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Mobile CTA */}
              <Link
                href="/contact"
                prefetch={true}
                onPointerDown={() => triggerHaptic(8)}
                onClick={() => setOpen(false)}
                className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white active:scale-95 transition-transform duration-75 shadow-sm select-none"
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

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { triggerHaptic } from "@/lib/haptics";

/* ─── Types ─── */
export interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: { href: string; label: string; icon?: React.ComponentType<{ size?: number | string; className?: string }> }[];
}

interface NavHeaderProps {
  items: NavItem[];
  scrollProgress?: number;
}

function NavHeader({ items, scrollProgress = 0 }: NavHeaderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [animComplete, setAnimComplete] = useState(false);
  const pathname = usePathname();

  // Find index of currently active route
  const currentPathIndex = items.findIndex((item) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    if (item.dropdownItems?.some((sub) => pathname.startsWith(sub.href))) return true;
    return false;
  });

  const activeIndex = hoveredIndex !== null ? hoveredIndex : (currentPathIndex !== -1 ? currentPathIndex : null);

  // Trigger smooth expanding animation 600ms after load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Split items around the logo: first half before logo, second half after
  const mid = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, mid);
  const rightItems = items.slice(mid);

  const resetCursor = () => {
    setHoveredIndex(null);
  };

  // Dynamic scaling: 1.0 → 0.92 (gentle shrink)
  const navScale = 1 - scrollProgress * 0.08;
  // Dynamic logo height: 140px → 90px
  const logoHeight = 38 - scrollProgress * 10;
  // Dynamic pill padding: 12px → 6px
  const pillPadding = 12 - scrollProgress * 6;

  return (
    <div
      style={{
        transform: `scale(${navScale})`,
        transformOrigin: "top center",
        transition: "transform 0.15s ease-out",
      }}
    >
      <motion.ul
        className="relative mx-auto flex w-fit items-center justify-center rounded-full border-2 border-[#0ea5e9] bg-white px-2"
        animate={{
          width: isExpanded ? "auto" : "200px",
        }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 18,
          mass: 1.1,
        }}
        style={{
          paddingTop: `${pillPadding}px`,
          paddingBottom: `${pillPadding}px`,
          transition: "padding 0.15s ease-out",
          overflow: animComplete ? "visible" : "hidden",
        }}
        onAnimationComplete={() => {
          if (isExpanded) {
            setAnimComplete(true);
          }
        }}
        onMouseLeave={resetCursor}
      >
        {/* Left nav items wrapper with clip/width animation */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            width: {
              type: "spring",
              stiffness: 85,
              damping: 18,
              mass: 1.1,
            },
            opacity: { delay: 0.35, duration: 0.55, ease: "easeOut" },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexShrink: 0,
            overflow: animComplete ? "visible" : "hidden",
          }}
        >
          {leftItems.map((item, index) => (
            <Tab
              key={item.label}
              href={item.href}
              hasDropdown={item.hasDropdown}
              dropdownItems={item.dropdownItems}
              isActive={activeIndex === index}
              onHover={() => setHoveredIndex(index)}
              scrollProgress={scrollProgress}
            >
              {item.label}
            </Tab>
          ))}
        </motion.div>

        {/* Logo in the center */}
        <li className="relative z-10 px-5 md:px-7 flex items-center justify-center shrink-0">
          <Link href="/" prefetch={true} onPointerDown={() => triggerHaptic(8)} aria-label="Shaibya Solutions Home">
            <Image
              src="/shaibya-logo-nav.webp"
              alt="Shaibya Solutions"
              width={160}
              height={45}
              className="h-auto w-auto object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                height: `${logoHeight}px`,
                filter: "drop-shadow(0 2px 8px rgba(14,165,233,0.15))",
                mixBlendMode: "multiply",
                transition: "height 0.15s ease-out",
              }}
              priority
            />
          </Link>
        </li>

        {/* Right nav items wrapper with clip/width animation */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            width: {
              type: "spring",
              stiffness: 85,
              damping: 18,
              mass: 1.1,
            },
            opacity: { delay: 0.35, duration: 0.55, ease: "easeOut" },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexShrink: 0,
            overflow: animComplete ? "visible" : "hidden",
          }}
        >
          {rightItems.map((item, index) => (
            <Tab
              key={item.label}
              href={item.href}
              hasDropdown={item.hasDropdown}
              dropdownItems={item.dropdownItems}
              isActive={activeIndex === mid + index}
              onHover={() => setHoveredIndex(mid + index)}
              scrollProgress={scrollProgress}
            >
              {item.label}
            </Tab>
          ))}
        </motion.div>
      </motion.ul>
    </div>
  );
}

const Tab = ({
  children,
  href,
  hasDropdown,
  dropdownItems,
  isActive,
  onHover,
  scrollProgress = 0,
}: {
  children: React.ReactNode;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavItem["dropdownItems"];
  isActive: boolean;
  onHover: () => void;
  scrollProgress?: number;
}) => {
  const router = useRouter();

  // Dynamic text sizing: 20px → 15px
  const fontSize = 20 - scrollProgress * 5;
  // Dynamic padding: px-6 py-5 → px-4 py-3
  const paddingX = 22 - scrollProgress * 6;
  const paddingY = 20 - scrollProgress * 8;

  return (
    <li
      onMouseEnter={() => {
        onHover();
        if (href && !href.startsWith("#")) {
          router.prefetch(href);
        }
      }}
      className="relative z-10 block cursor-pointer group/tab rounded-full"
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="nav-cursor-pill"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      <Link
        href={href}
        prefetch={true}
        onPointerDown={() => triggerHaptic(8)}
        className={`relative z-10 flex items-center justify-center gap-2 uppercase font-semibold tracking-wide whitespace-nowrap active:scale-[0.97] transition-colors duration-150 select-none ${
          isActive ? "text-white" : "text-black hover:text-[#0ea5e9]"
        }`}
        style={{
          fontSize: `${fontSize}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
          paddingTop: `${paddingY}px`,
          paddingBottom: `${paddingY}px`,
          transition: "font-size 0.15s ease-out, padding 0.15s ease-out",
        }}
      >
        <span>{children}</span>
        {hasDropdown && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 10 10"
            className={`mt-px transition-transform duration-200 group-hover/tab:rotate-180 ${
              isActive ? "text-white" : "text-black"
            }`}
          >
            <path d="M2 4L5 7L8 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Link>

      {/* Dropdown */}
      {hasDropdown && dropdownItems && (
        <div className="absolute left-1/2 top-full hidden w-[240px] -translate-x-1/2 pt-3 group-hover/tab:block group-focus-within/tab:block z-50">
          <div className="rounded-2xl p-1.5 shadow-2xl border border-gray-200 bg-white">
            {dropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onPointerDown={() => triggerHaptic(8)}
                onMouseEnter={() => {
                  if (item.href && !item.href.startsWith("#")) router.prefetch(item.href);
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 active:scale-[0.98] transition-all duration-75 hover:bg-gray-100 group/item"
              >
                {item.icon && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover/item:bg-[#0ea5e9]/10 transition-colors">
                    <item.icon size={12} className="text-gray-500 group-hover/item:text-[#0ea5e9] transition-colors" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 group-hover/item:text-black transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

export default NavHeader;

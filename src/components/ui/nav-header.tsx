"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ─── Types ─── */
export interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: { href: string; label: string; icon?: React.ElementType }[];
}

interface NavHeaderProps {
  items: NavItem[];
  scrollProgress?: number;
}

function NavHeader({ items, scrollProgress = 0 }: NavHeaderProps) {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [animComplete, setAnimComplete] = useState(false);

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
    setPosition((pv) => ({ ...pv, opacity: 0 }));
    setActiveIndex(null);
  };

  // Dynamic scaling: 1.0 → 0.92 (gentle shrink)
  const navScale = 1 - scrollProgress * 0.08;
  // Dynamic logo height: h-20 (80px) → h-15 (60px)
  const logoHeight = 80 - scrollProgress * 20;
  // Dynamic pill padding: p-2.5 (10px) → p-1.5 (6px)
  const pillPadding = 10 - scrollProgress * 4;

  return (
    <div
      style={{
        transform: `scale(${navScale})`,
        transformOrigin: "top center",
        transition: "transform 0.15s ease-out",
      }}
    >
      <motion.ul
        className="relative mx-auto flex w-fit items-center justify-evenly rounded-full border-2 border-[#0ea5e9] bg-white px-2"
        animate={{
          width: isExpanded ? "auto" : "210px",
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
            flexShrink: 0,
            overflow: animComplete ? "visible" : "hidden",
          }}
        >
          {leftItems.map((item, index) => (
            <Tab
              key={item.label}
              setPosition={setPosition}
              href={item.href}
              hasDropdown={item.hasDropdown}
              dropdownItems={item.dropdownItems}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              scrollProgress={scrollProgress}
            >
              {item.label}
            </Tab>
          ))}
        </motion.div>

        {/* Logo in the center */}
        <li className="relative z-10 px-6 md:px-10 flex items-center shrink-0">
          <Link href="/" aria-label="Shaibya Solutions Home">
            <Image
              src="/images/Screenshot 2026-07-05 011613.png"
              alt="Shaibya Solutions"
              width={240}
              height={88}
              className="w-auto object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                height: `${logoHeight}px`,
                marginTop: `${-(logoHeight - (72 - scrollProgress * 16)) / 2}px`,
                marginBottom: `${-(logoHeight - (72 - scrollProgress * 16)) / 2}px`,
                filter: "drop-shadow(0 2px 8px rgba(14,165,233,0.15))",
                mixBlendMode: "multiply",
                transition: "all 0.15s ease-out",
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
            flexShrink: 0,
            overflow: animComplete ? "visible" : "hidden",
          }}
        >
          {rightItems.map((item, index) => (
            <Tab
              key={item.label}
              setPosition={setPosition}
              href={item.href}
              hasDropdown={item.hasDropdown}
              dropdownItems={item.dropdownItems}
              isActive={activeIndex === mid + index}
              onHover={() => setActiveIndex(mid + index)}
              scrollProgress={scrollProgress}
            >
              {item.label}
            </Tab>
          ))}
        </motion.div>

        <Cursor
          position={position}
          scrollProgress={scrollProgress}
          logoHeight={logoHeight}
          pillPadding={pillPadding}
        />
      </motion.ul>
    </div>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  hasDropdown,
  dropdownItems,
  isActive,
  onHover,
  scrollProgress = 0,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { href: string; label: string; icon?: React.ElementType }[];
  isActive: boolean;
  onHover: () => void;
  scrollProgress?: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  // Dynamic text sizing: text-base (16px) → ~14.5px
  const fontSize = 16 - scrollProgress * 1.5;
  // Dynamic padding: px-8 py-4 → px-6 py-3
  const paddingX = 32 - scrollProgress * 8;
  const paddingY = 16 - scrollProgress * 4;

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        onHover();
      }}
      className="relative z-10 block cursor-pointer group/tab"
    >
      <Link
        href={href}
        className={`flex items-center gap-2 uppercase font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
          isActive ? "text-white" : "text-black"
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
        {children}
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
        <div className="absolute left-1/2 top-full hidden w-[240px] -translate-x-1/2 pt-3 group-hover/tab:block z-50">
          <div className="rounded-2xl p-1.5 shadow-2xl border border-gray-200 bg-white">
            {dropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-gray-100 group/item"
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

const Cursor = ({
  position,
  scrollProgress = 0,
  logoHeight = 80,
  pillPadding = 10,
}: {
  position: { left: number; width: number; opacity: number };
  scrollProgress?: number;
  logoHeight?: number;
  pillPadding?: number;
}) => {
  const cursorHeight = 64 - scrollProgress * 24;
  const cursorTop = (logoHeight + pillPadding * 2 - cursorHeight) / 2;

  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute z-0 rounded-full pointer-events-none"
      style={{
        height: `${cursorHeight}px`,
        top: `${cursorTop}px`,
        background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
        transition: "height 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
};

export default NavHeader;

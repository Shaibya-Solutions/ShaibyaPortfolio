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
  // Dynamic logo height: h-14 (56px) → h-11 (46px)
  const logoHeight = 56 - scrollProgress * 10;
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
      <ul
        className="relative mx-auto flex w-fit items-center justify-evenly rounded-full border-2 border-[#0ea5e9] bg-white px-2"
        style={{
          paddingTop: `${pillPadding}px`,
          paddingBottom: `${pillPadding}px`,
          transition: "padding 0.15s ease-out",
        }}
        onMouseLeave={resetCursor}
      >
        {/* Left nav items */}
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

        {/* Logo in the center */}
        <li className="relative z-10 px-6 md:px-10 flex items-center">
          <Link href="/" aria-label="Shaibya Solutions Home">
            <Image
              src="/shaibya-logo-nav.png"
              alt="Shaibya Solutions"
              width={200}
              height={72}
              className="w-auto object-contain"
              style={{
                height: `${logoHeight}px`,
                transition: "height 0.15s ease-out",
              }}
              priority
            />
          </Link>
        </li>

        {/* Right nav items — offset index so cursor positions correctly */}
        {rightItems.map((item, index) => (
          <Tab
            key={item.label}
            setPosition={setPosition}
            href={item.href}
            hasDropdown={item.hasDropdown}
            dropdownItems={item.dropdownItems}
            isActive={activeIndex === mid + 1 + index}
            onHover={() => setActiveIndex(mid + 1 + index)}
            scrollProgress={scrollProgress}
          >
            {item.label}
          </Tab>
        ))}

        <Cursor position={position} scrollProgress={scrollProgress} />
      </ul>
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
        className={`flex items-center gap-2 uppercase font-semibold tracking-wide transition-colors duration-200 ${isActive ? "text-white" : "text-black"
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
            className={`mt-px transition-transform duration-200 group-hover/tab:rotate-180 ${isActive ? "text-white" : "text-black"
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

const Cursor = ({ position, scrollProgress = 0 }: { position: { left: number; width: number; opacity: number }; scrollProgress?: number }) => {
  // Dynamic cursor height: h-16 (64px) → h-10 (40px)
  const cursorHeight = 64 - scrollProgress * 24;

  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute z-0 rounded-full pointer-events-none"
      style={{
        height: `${cursorHeight}px`,
        background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
        transition: "height 0.15s ease-out",
      }}
    />
  );
};

export default NavHeader;

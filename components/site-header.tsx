"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className='sticky top-0 z-50 bg-slate-950/70 backdrop-blur'>
      <div className='relative mx-auto flex max-w-6xl items-center justify-center px-4 py-3'>
        <Link
          href='/'
          className='absolute left-4 font-semibold tracking-tight text-white'
        >
          <span className='rounded bg-cyan-500/20 px-2 py-1 text-cyan-300'>
            Shaibya
          </span>{" "}
          <span className='text-slate-200'>Solutions</span>
        </Link>
        {/* <div></div> */}
        <nav className='hidden border-2 rounded-4xl shadow-md shadow-gray-500 py-2 px-4 items-center gap-6 md:flex'>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm text-slate-300 transition-colors hover:text-white'
            >
              {item.label}
            </Link>
          ))}
          <Link
            href='/#contact'
            className='rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400'
          >
            Get in Touch
          </Link>
        </nav>

        <button
          aria-label='Toggle navigation'
          onClick={() => setOpen((v) => !v)}
          className='rounded p-2 text-slate-200 md:hidden'
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className='border-t border-slate-800/60 md:hidden'>
          <nav className='mx-auto grid max-w-6xl gap-2 px-4 py-3'>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className='rounded px-2 py-2 text-slate-300 hover:bg-slate-900 hover:text-white'
              >
                {item.label}
              </Link>
            ))}
            <Link
              href='/#contact'
              onClick={() => setOpen(false)}
              className='rounded-full bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-slate-950 transition hover:bg-cyan-400'
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaBullhorn,
  FaChevronDown,
  FaChevronUp, // Added for mobile dropdown icon
  FaCube,
  FaLaptopCode,
  FaLock,
  FaMobileAlt,
  FaPalette,
  FaRobot,
  FaSitemap,
  FaTimes,
} from "react-icons/fa";

const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/projects", label: "Portfolio" },
  { href: "/portfolio", label: "Solutions" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
];

const services = [
  {
    href: "/web",
    label: "Web Development",
    icon: <FaLaptopCode className='text-cyan-400' />,
  },
  {
    href: "/mobile",
    label: "Mobile Development",
    icon: <FaMobileAlt className='text-cyan-400' />,
  },
  {
    href: "/ai",
    label: "AI Solutions",
    icon: <FaRobot className='text-cyan-400' />,
  },
  {
    href: "/3d",
    label: "3D Modeling & Animation",
    icon: <FaCube className='text-cyan-400' />,
  },
  {
    href: "/cybersecurity",
    label: "Cybersecurity",
    icon: <FaLock className='text-cyan-400' />,
  },
  {
    href: "/marketing",
    label: "Digital Marketing",
    icon: <FaBullhorn className='text-cyan-400' />,
  },
  {
    href: "/ui-ux",
    label: "UI/UX Design",
    icon: <FaPalette className='text-cyan-400' />,
  },
  {
    href: "/rd",
    label: "R&D and Innovation",
    icon: <FaSitemap className='text-cyan-400' />,
  },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  // State for the mobile services dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 mt-2 bg-slate-950/70 backdrop-blur'>
      <div className='relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
        <Link href='/' className='font-semibold tracking-tight text-white'>
          <span className='text-slate-200'>Shaibya</span>
          <span className='rounded bg-cyan-500/20 px-2 py-1 text-cyan-300'>
            {" "}
            Solutions
          </span>{" "}
        </Link>

        <nav className='hidden items-center gap-8 rounded-full py-3 px-6 shadow-md shadow-gray-500 md:flex'>
          {nav.map((item) => (
            <div key={item.href} className='group relative'>
              <Link
                key={item.href}
                href={item.href}
                className='flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white'
              >
                {item.label}
                {item.hasDropdown && (
                  <FaChevronDown
                    className={`transform transition-transform duration-200 group-hover:rotate-180`}
                  />
                )}
              </Link>
              {item.hasDropdown && (
                <>
                  <div className='absolute left-1/2 top-full hidden w-96 -translate-x-1/2 transform rounded-2xl border border-slate-800 bg-slate-950/80 px-4 pb-4 pt-8 shadow-lg backdrop-blur-lg group-hover:block'>
                    <div className='grid grid-cols-2 gap-2'>
                      {services.map((service) => (
                        <Link
                          key={service.label}
                          href={service.href}
                          className='rounded-lg p-3 transition-colors hover:bg-slate-800'
                        >
                          <div className='flex items-center gap-3'>
                            {service.icon}
                            <div className='flex flex-col'>
                              <p className='font-semibold text-white'>
                                {service.label}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
        <Link
          href='/#contact'
          className='rounded-full bg-gradient-to-r from-cyan-500 to-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400'
        >
          Get in Touch
        </Link>

        <button
          aria-label='Toggle navigation'
          onClick={() => setOpen((v) => !v)}
          className='rounded p-2 text-slate-200 md:hidden'
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* === MOBILE NAVIGATION WITH DROPDOWN === */}
      {open && (
        <div className='border-t border-slate-800/60 md:hidden'>
          <nav className='mx-auto grid max-w-6xl gap-2 px-4 py-3'>
            {nav.map((item) =>
              item.hasDropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className='flex w-full items-center justify-between rounded px-2 py-2 text-slate-300 hover:bg-slate-900 hover:text-white'
                  >
                    <span>{item.label}</span>
                    {mobileServicesOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {mobileServicesOpen && (
                    <div className='mt-2 flex flex-col gap-1 border-l-2 border-slate-700 pl-4'>
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setOpen(false)}
                          className='flex items-center gap-3 rounded px-2 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white'
                        >
                          {service.icon}
                          <span>{service.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className='rounded px-2 py-2 text-slate-300 hover:bg-slate-900 hover:text-white'
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href='/#contact'
              onClick={() => setOpen(false)}
              className='mt-2 rounded-full bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-slate-950 transition hover:bg-cyan-400'
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
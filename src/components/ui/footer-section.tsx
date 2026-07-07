'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  LinkedinIcon, InstagramIcon, BookOpenIcon, MessageCircleIcon,
  PhoneIcon, MailIcon, MapPinIcon,
} from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Overview', href: '/' },
      { title: 'Services', href: '/#services' },
      { title: 'Industries', href: '/#industries' },
      { title: 'Our Team', href: '/#team' },
      { title: 'Careers', href: '/careers' },
      { title: 'Community', href: '/community' },
      { title: 'Portfolio', href: '/portfolio/solutions' },
    ],
  },
  {
    label: 'Information',
    links: [
      { title: 'FAQ', href: '/#faq' },
      { title: 'Contact', href: '/contact' },
      { title: 'Privacy Policy', href: '#' },
      { title: 'Our Story', href: '/snyppit' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { title: '+91 74983 41146', href: 'tel:+917498341146', icon: PhoneIcon },
      { title: 'Email us', href: 'mailto:shaibyasolutions@gmail.com', icon: MailIcon },
      { title: 'WhatsApp us', href: 'https://wa.me/917498341146', icon: MessageCircleIcon, external: true },
      { title: 'Nagpur · Noida · Texas', href: '#', icon: MapPinIcon },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { title: 'LinkedIn', href: 'https://www.linkedin.com/company/shaibyasolutions/about/', icon: LinkedinIcon, external: true },
      { title: 'Instagram', href: 'https://www.instagram.com/deepoffduty/', icon: InstagramIcon, external: true },
      { title: 'Blog', href: 'https://medium.com/@shaibyasolutions', icon: BookOpenIcon, external: true },
      { title: 'WhatsApp', href: 'https://wa.me/917498341146', icon: MessageCircleIcon, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative w-full flex flex-col items-center justify-center border-t border-gray-300/60"
      style={{ backgroundColor: '#e8edf2', backgroundImage: 'radial-gradient(35% 128px at 50% 0%, rgba(14,165,233,0.1), transparent)' }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-sky-400/50" />

      <div className="w-full max-w-7xl px-6 lg:px-12 pt-12 lg:pt-16 pb-12">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          {/* Brand column */}
          <AnimatedContainer className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-1 group">
              <span
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Shaibya
              </span>
              <span className="ml-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-sm font-semibold text-sky-700 ring-1 ring-sky-300/50">
                Solutions
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Digital products studio building custom websites, CRMs, and automation tools for businesses that want to grow.
            </p>
            <p className="text-gray-500 mt-6 text-sm">
              © {new Date().getFullYear()} Shaibya Solutions. All rights reserved.
            </p>
          </AnimatedContainer>

          {/* Link columns */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0 min-w-0 overflow-hidden">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-800">
                    {section.label}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {section.links.map((link) => {
                      const isExternal = link.external;
                      const Wrapper = isExternal ? 'a' : Link;
                      const extraProps = isExternal
                        ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                        : {};

                      return (
                        <li key={link.title} className="min-w-0">
                          <Wrapper
                            href={link.href}
                            className="text-gray-500 hover:text-sky-600 inline-flex items-center gap-1.5 transition-all duration-300 max-w-full"
                            {...extraProps}
                          >
                            {link.icon && <link.icon className="size-4 text-gray-400 shrink-0" />}
                            <span className="truncate">{link.title}</span>
                          </Wrapper>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom disclaimer: full-width black section */}
      <div className="w-full bg-black py-16 px-6 lg:px-12 text-center border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Shadowed wordmark */}
          <div
            className="w-full select-none pointer-events-none mb-6 flex justify-center"
            aria-hidden
          >
            <div className="relative inline-block" style={{ fontSize: "clamp(3.2rem, 11.5vw, 10rem)" }}>
              {/* SVG tilde — curved stroke positioned exactly over the letter 'S' */}
              <svg
                viewBox="0 0 40 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: "-0.16em",
                  left: "0.14em",
                  width: "0.38em",
                  height: "0.18em",
                  overflow: "visible",
                }}
                aria-hidden
              >
                <path
                  d="M2 10 C8 2, 14 2, 20 7 C26 12, 32 12, 38 4"
                  stroke="#475569"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <p
                className="shaibya-shine"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "1em",
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: "-0.05em",
                  textTransform: "uppercase",
                  userSelect: "none",
                  paddingLeft: "0.06em",
                  paddingRight: "0.06em",
                  overflow: "visible",
                  filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.15))",
                }}
              >
                SHAIBYA
              </p>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Shaibya Solutions is a digital products studio registered in India.
            All information is provided for general purposes only.
            We do not provide legal, financial, or regulatory advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

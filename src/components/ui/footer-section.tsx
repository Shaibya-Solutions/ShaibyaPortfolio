'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
      { title: 'Instagram', href: 'https://www.instagram.com/shaibya.solutions?igsh=emE3dTg4NHVjd243', icon: InstagramIcon, external: true },
      { title: 'Blog', href: 'https://medium.com/@shaibyasolutions', icon: BookOpenIcon, external: true },
      { title: 'WhatsApp', href: 'https://wa.me/917498341146', icon: MessageCircleIcon, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl md:rounded-t-[3rem] border-t border-gray-300/60 px-6 py-12 lg:py-16"
      style={{ backgroundColor: '#e8edf2', backgroundImage: 'radial-gradient(35% 128px at 50% 0%, rgba(14,165,233,0.1), transparent)' }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-sky-400/50" />

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

      {/* Bottom disclaimer */}
      <div className="mt-12 pt-6 border-t border-gray-300/50 w-full text-center">
        <p className="text-[11px] text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Shaibya Solutions is a digital products studio registered in India.
          All information is provided for general purposes only.
          We do not provide legal, financial, or regulatory advice.
        </p>
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

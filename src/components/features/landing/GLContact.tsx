"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/imagekit";

export default function GLContact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-slate-200 bg-white py-16 sm:py-24 lg:scroll-mt-32 lg:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">

          {/* Left: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-4 block">
              Start Building
            </span>

            <h2
              id="contact-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Have a Project in Mind?
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Let&apos;s build something exceptional together. From AI-driven automations
              to full-stack platforms, we turn ambitious ideas into scalable products.
            </p>

            <div className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <WhatsAppCTA
                text="Chat on WhatsApp"
                message="Hi, I'd like to discuss a project with Shaibya Solutions."
                className="!justify-center !rounded-xl !border-sky-700 !bg-sky-700 !px-5 !py-4 !text-[15px] !font-semibold !transition-all hover:!bg-sky-800"
              />

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-4 text-[15px] font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Book a consultation
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-slate-200 pt-6 sm:gap-4">
              {[
                { value: "15+", label: "Projects delivered" },
                { value: "100%", label: "On-time launch" },
                { value: "24/7", label: "Direct support" },
              ].map((stat) => (
                <div key={stat.label} className="border-slate-200 not-first:border-l not-first:pl-2 sm:not-first:pl-4">
                  <span className="font-mono text-xl font-bold text-slate-900 sm:text-2xl">{stat.value}</span>
                  <p className="mt-0.5 text-xs leading-tight text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Modern Smartphone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div
              className="relative w-full max-w-[640px]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image
                src={getImageUrl("/images/landing/phones-cta.webp")}
                alt="Two smartphones showing digital solutions built by Shaibya Solutions"
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-contain object-center"
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

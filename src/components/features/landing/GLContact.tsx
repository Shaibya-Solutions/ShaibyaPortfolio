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
      className="scroll-mt-32 relative py-28 lg:py-36 overflow-hidden bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

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

            <div className="flex flex-wrap gap-4 items-center mb-10">
              <WhatsAppCTA
                text="Chat on WhatsApp"
                message="Hi, I'd like to discuss a project with Shaibya Solutions."
                className="!rounded-xl !px-8 !py-4 !text-[15px] !font-semibold !bg-[#0ea5e9] !border-[#0ea5e9] hover:!bg-[#0284c7] hover:!shadow-[0_4px_20px_rgba(14,165,233,0.3)] !transition-all"
              />

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-[15px] font-semibold text-slate-800 transition hover:bg-slate-50 hover:border-slate-400"
              >
                Book a consultation
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
              <div>
                <span className="text-2xl font-bold text-slate-900 font-mono">15+</span>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Projects Delivered</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl font-bold text-slate-900 font-mono">100%</span>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">On-Time Launch</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl font-bold text-slate-900 font-mono">24/7</span>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Direct Support</p>
              </div>
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

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GLContact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden" style={{ background: "#020817" }}>

      {/* Subtle gradient wash — not a mesh, just one soft radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(14,165,233,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#38bdf8] mb-6 inline-block">
            Get In Touch
          </span>

          <h2
            className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="text-white">Ready to build </span>
            <span className="shimmer-text">something real?</span>
          </h2>

          <p className="text-[17px] text-[#6B7280] max-w-lg mx-auto leading-relaxed mb-14 font-light">
            One conversation is all it takes. Tell us what&apos;s slowing you down —
            we&apos;ll show you exactly how to fix it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <WhatsAppCTA
            text="Chat on WhatsApp"
            message="Hi, I'd like to discuss a project with Shaibya Solutions."
            className="!rounded-xl !px-8 !py-4 !text-[15px] !font-semibold !bg-[#0ea5e9] !border-[#0ea5e9] hover:!bg-[#0284c7] hover:!shadow-[0_4px_20px_rgba(14,165,233,0.3)] !transition-all"
          />

          <Link href="/contact" className="btn-dark group">
            Talk to an expert
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-[#6B7280]"
        >
          <a href="tel:+917498341146" className="hover:text-[#38bdf8] transition-colors">
            +91 7498341146
          </a>
          <span className="text-white/10">·</span>
          <a href="mailto:shaibyasolutions@gmail.com" className="hover:text-[#38bdf8] transition-colors">
            shaibyasolutions@gmail.com
          </a>
          <span className="text-white/10">·</span>
          <span>Nagpur, India</span>
        </motion.div>
      </div>
    </section>
  );
}

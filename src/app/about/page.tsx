"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { FaWhatsapp } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import dynamic from "next/dynamic";

const ThreeDGallery = dynamic(
  () => import("@/components/ui/three-d-gallery"),
  { ssr: false }
);

/* ───── Client Website Images ───── */
const clientImages = [
  "/images/screenshots/client-1.png",
  "/images/screenshots/client-2.png",
  "/images/screenshots/client-3.png",
  "/images/screenshots/client-4.png",
  "/images/screenshots/client-5.png",
  "/images/screenshots/client-6.png",
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
    <main className="bg-white text-[#111827] min-h-screen flex flex-col overflow-x-hidden">
      <SiteHeader />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-6"
              >
                Our Story
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.05] mb-6"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Ahead of
                <br />
                the curve,
                <br />
                <span className="heading-gradient italic font-normal">
                  always.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm text-[#6B7280] leading-relaxed max-w-sm"
              >
                A technology company born in Nagpur, built for the world. AI,
                full-stack, mobile — all under one roof.
              </motion.p>
            </div>

            {/* Right — 3D Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <ThreeDGallery
                images={clientImages}
                imageWidth={220}
                imageHeight={138}
                rotateSpeed={18}
                pauseOnHover={true}
                translateZ={260}
                borderRadius={12}
                showBackface={true}
                width={480}
                height={360}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="bg-[#022648] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold text-white leading-[1.15]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to build
            <br />
            the future,{" "}
            <span className="heading-gradient italic font-normal">
              together?
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://wa.me/+917498341146"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm font-bold uppercase tracking-widest transition-colors"
            >
              <FaWhatsapp size={18} />
              WhatsApp Us
            </a>
            <a
              href="mailto:shaibyasolutions@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <IoMail size={18} />
              Send an Email
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

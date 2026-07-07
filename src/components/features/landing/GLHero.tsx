"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import DecryptedText from "@/components/ui/DecryptedText";
import dynamic from "next/dynamic";

const CelestialSphere = dynamic(
  () => import("@/components/ui/celestial-sphere").then((mod) => mod.CelestialSphere),
  { ssr: false }
);

export default function GLHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#020817" }}
    >
      {/* WebGL Celestial Sphere Background */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <CelestialSphere
            hue={210}
            speed={0.35}
            zoom={1.3}
            particleSize={3.5}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}

      {/* Gradient overlay — lets the nebula show through but ensures text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(2,8,23,0.35) 0%, rgba(2,8,23,0.5) 50%, rgba(2,8,23,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-16 lg:pt-40 lg:pb-0">
          <div className="max-w-4xl">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
                Digital Engineering Studio
              </span>
            </motion.div>

            {/* Headline with DecryptedText */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-8"
            >
              <h1
                className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {!mounted ? (
                  <>
                    We Engineer
                    <br />
                    <span className="text-[#38bdf8]">Digital Impact.</span>
                  </>
                ) : (
                  <>
                    <DecryptedText
                      text="We Engineer"
                      speed={40}
                      maxIterations={12}
                      animateOn="view"
                      className="text-white"
                      encryptedClassName="encrypted-char"
                    />
                    <br />
                    <DecryptedText
                      text="Digital Impact."
                      speed={40}
                      maxIterations={12}
                      animateOn="view"
                      className="text-[#38bdf8]"
                      encryptedClassName="encrypted-char"
                    />
                  </>
                )}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg lg:text-xl text-[#9CA3AF] max-w-xl leading-relaxed mb-12 font-light"
            >
              We build systems that eliminate manual work and drive measurable
              growth — for businesses ready to scale.
            </motion.p>

            {/* CTAs with Magnet */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <WhatsAppCTA
                text="Start a project"
                message="Hi, I'd like to discuss a project with Shaibya Solutions."
                className="!rounded-xl !px-8 !py-4 !text-[15px] !font-semibold !bg-[#0ea5e9] !border-[#0ea5e9] hover:!bg-[#0284c7] hover:!shadow-[0_4px_20px_rgba(14,165,233,0.3)] !transition-all"
              />

              <Link
                href="#work"
                className="btn-dark group"
              >
                See our work
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 flex flex-col items-center pb-10 gap-2"
      >
        <span className="text-[10px] text-[#6B7280] uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <div className="scroll-indicator">
          <ChevronDown size={16} className="text-[#38bdf8]" />
        </div>
      </motion.div>
    </section>
  );
}

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
  const [canLoadSphere, setCanLoadSphere] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Defer heavy WebGL canvas slightly so FCP and Speed Index finalize on the initial frame
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          () => setCanLoadSphere(true),
          { timeout: 800 }
        );
        return () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      } else {
        const timer = setTimeout(() => setCanLoadSphere(true), 400);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#020817" }}
    >
      {/* WebGL Celestial Sphere Background — gracefully deferred */}
      {canLoadSphere && (
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
                Digital Engineering Studio
              </span>
            </motion.div>

            {/* Headline with DecryptedText - Renders immediately for zero LCP delay */}
            <div className="mb-8">
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
                      animateOn="hover"
                      className="text-white"
                      encryptedClassName="encrypted-char"
                    />
                    <br />
                    <DecryptedText
                      text="Digital Impact."
                      speed={40}
                      maxIterations={12}
                      animateOn="hover"
                      className="text-[#38bdf8]"
                      encryptedClassName="encrypted-char"
                    />
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="text-lg lg:text-xl text-[#9CA3AF] max-w-xl leading-relaxed mb-12 font-light"
            >
              We build systems that eliminate manual work and drive measurable
              business growth. From bespoke internal tools to high-converting
              client portals, engineered for performance and scale.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <WhatsAppCTA
                text="Start a project"
                message="Hi, I'd like to discuss a project with Shaibya Solutions."
                className="!rounded-full !px-8 !py-4 !text-[15px] !font-semibold !bg-[#0ea5e9] !border-[#0ea5e9] hover:!bg-[#0284c7] hover:!shadow-[0_4px_20px_rgba(14,165,233,0.3)] !transition-all text-center justify-center"
              />
              <Link
                href="/portfolio"
                prefetch={true}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-200 text-sm tracking-wide"
              >
                <span>View Our Work</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8 pointer-events-none">
        <div className="flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase">
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

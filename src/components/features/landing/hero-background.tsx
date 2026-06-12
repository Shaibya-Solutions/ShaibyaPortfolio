"use client";
import { motion } from "framer-motion";

/**
 * Animated light-mode hero background:
 * - Floating amber/gold gradient blobs
 * - Subtle dot-grid overlay
 */
export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #d97706 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Blob 1 — top-left amber */}
      <div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, transparent 70%)",
          animation: "blob-float 9s ease-in-out infinite",
          filter: "blur(48px)",
        }}
      />

      {/* Blob 2 — top-right soft amber */}
      <div
        className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, #fde68a 0%, #fbbf24 50%, transparent 70%)",
          animation: "blob-float-alt 11s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />

      {/* Blob 3 — bottom-center warm */}
      <div
        className="absolute -bottom-20 left-1/2 h-[300px] w-[520px] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, #fde68a 0%, #f59e0b 60%, transparent 80%)",
          animation: "blob-float 13s ease-in-out infinite reverse",
          filter: "blur(56px)",
        }}
      />

      {/* Radial vignette overlay to fade edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(255,255,255,0.85) 100%)",
        }}
      />
    </div>
  );
}

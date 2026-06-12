"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface MaskedImageProps {
  src: string;
  alt: string;
  className?: string;
  maskType?: "slantRight" | "slantLeft" | "revealUp" | "polygon";
}

export function MaskedImage({ src, alt, className = "", maskType = "slantRight" }: MaskedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Calculate dynamic clip-paths based on scroll progress
  // Slant Right: from a narrow sliver on the left, opening up to full width with a slanted right edge
  const slantRightClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["polygon(0% 0%, 20% 0%, 0% 100%, 0% 100%)", "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)"]
  );

  // Slant Left: from a narrow sliver on the right, opening up
  const slantLeftClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["polygon(100% 0%, 100% 0%, 80% 100%, 100% 100%)", "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)"]
  );

  const revealUpClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"]
  );

  // A fixed aggressive geometric mask, expands slightly on scroll
  const polygonClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["polygon(20% 0%, 100% 20%, 80% 100%, 0% 80%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"]
  );

  const getClipPath = () => {
    switch (maskType) {
      case "slantRight": return slantRightClip;
      case "slantLeft": return slantLeftClip;
      case "revealUp": return revealUpClip;
      case "polygon": return polygonClip;
      default: return slantRightClip;
    }
  };

  // Parallax effect on the image itself
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          clipPath: getClipPath(),
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
        className="bg-slate-200"
      >
        <motion.div style={{ y, scale, width: "100%", height: "100%" }}>
          {/* Using img for simplicity if it's a generic placeholder, or next/image if configured */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

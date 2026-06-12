"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Carousel3DProps {
  images: { src: string; alt: string }[];
  autoPlayInterval?: number;
  width?: number;
  height?: number;
  perspective?: number;
  className?: string;
}

export default function Carousel3D({
  images,
  autoPlayInterval = 3000,
  width = 320,
  height = 220,
  perspective = 1000,
  className = "",
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;
  const angleStep = 360 / count;
  const radius = Math.round(width / (2 * Math.tan(Math.PI / count)));

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  /* ── Auto-play: runs when NOT hovered ── */
  useEffect(() => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Only start a new timer when not hovered
    if (!isHovered) {
      timerRef.current = setInterval(next, autoPlayInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [next, autoPlayInterval, isHovered]);

  /* ── Handlers: hovering ANY card pauses the carousel ── */
  const handlePointerEnter = useCallback(() => setIsHovered(true), []);
  const handlePointerLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: "50% 50%",
        width: `${width + 80}px`,
        height: `${height + 120}px`,
      }}
    >
      {/* Rotating drum */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${-currentIndex * angleStep}deg)`,
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {images.map((image, index) => {
          const angle = index * angleStep;
          return (
            <div
              key={index}
              onMouseEnter={handlePointerEnter}
              onMouseLeave={handlePointerLeave}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl shadow-2xl border border-white/10 cursor-pointer transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(14,165,233,0.35)]"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                sizes={`${width}px`}
              />
              {/* Glass sheen */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
                }}
              />
              {/* Pause indicator — fades in on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-300 group">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-[#0ea5e9] w-6"
                : "bg-white/30 hover:bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Status indicator */}
      {isHovered && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/40 uppercase tracking-widest font-medium whitespace-nowrap">
          Paused
        </div>
      )}
    </div>
  );
}

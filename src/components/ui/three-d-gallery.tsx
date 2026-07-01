"use client";

import React, { useMemo, useId } from "react";

/* ═══════════════════════════════════════════════
   ThreeDGallery — CSS-only 3D rotating carousel
   ═══════════════════════════════════════════════ */

interface ThreeDGalleryProps {
  /** Array of image URLs */
  images?: string[];
  /** Array of link URLs corresponding to each image (opens in new tab) */
  links?: string[];
  /** Card width in px  (50–300, default 186) */
  imageWidth?: number;
  /** Card height in px (50–300, default 116) */
  imageHeight?: number;
  /** Full-rotation duration in seconds (1–60, default 20) */
  rotateSpeed?: number;
  /** Pause the spin when the user hovers (default true) */
  pauseOnHover?: boolean;
  /** Distance from centre in px (100–800, default 288) */
  translateZ?: number;
  /** Border-radius in px (0–50, default 5) */
  borderRadius?: number;
  /** Render card back-faces (default true) */
  showBackface?: boolean;
  /** Outer wrapper width */
  width?: number;
  /** Outer wrapper height */
  height?: number;
  /** Optional extra className on the outer wrapper */
  className?: string;
}

const DEFAULT_IMAGES = [
  "https://picsum.photos/200/120?random=1",
  "https://picsum.photos/200/120?random=2",
  "https://picsum.photos/200/120?random=3",
  "https://picsum.photos/200/120?random=4",
  "https://picsum.photos/200/120?random=5",
  "https://picsum.photos/200/120?random=6",
];

export default function ThreeDGallery({
  images = DEFAULT_IMAGES,
  links = [],
  imageWidth = 186,
  imageHeight = 116,
  rotateSpeed = 20,
  pauseOnHover = true,
  translateZ = 288,
  borderRadius = 5,
  showBackface = true,
  width = 1200,
  height = 400,
  className = "",
}: ThreeDGalleryProps) {
  // Unique id so multiple instances don't clash on @keyframes names
  const uid = useId().replace(/:/g, "");

  // Filter empties & enforce min 3
  const validImages = useMemo(() => {
    const filtered = (images ?? []).filter(Boolean);
    // Pad to 3 by repeating if needed
    while (filtered.length < 3) {
      filtered.push(filtered[filtered.length - 1] || DEFAULT_IMAGES[0]);
    }
    return filtered;
  }, [images]);

  const totalItems = validImages.length;
  const anglePer = 360 / totalItems;

  // Clamp helper
  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const w = clamp(imageWidth, 50, 300);
  const h = clamp(imageHeight, 50, 300);
  const speed = clamp(rotateSpeed, 1, 60);
  const tz = clamp(translateZ, 100, 800);
  const br = clamp(borderRadius, 0, 50);

  const bfv = showBackface ? "visible" : "hidden";
  const keyframesName = `tdg_spin_${uid}`;

  return (
    <>
      {/* Scoped keyframes + styles */}
      <style>{`
        @keyframes ${keyframesName} {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }

        .tdg-wrap-${uid} {
          width: ${width}px;
          height: ${height}px;
          position: relative;
          perspective: 1000px;
          overflow: visible;
          z-index: 0;
          pointer-events: auto;
        }

        .tdg-carousel-${uid} {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          transform-origin: center center;
          animation: ${keyframesName} ${speed}s linear infinite;
          animation-play-state: running;
        }

        ${pauseOnHover ? `.tdg-carousel-${uid}:hover { animation-play-state: paused; }` : ""}

        .tdg-figure-${uid} {
          position: absolute;
          top: 50%;
          left: 50%;
          width: ${w}px;
          height: ${h}px;
          margin: ${-h / 2}px 0 0 ${-w / 2}px;
          transform-origin: center center;
          overflow: hidden;
          border-radius: ${br}px;
          backface-visibility: ${bfv};
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
          transition: box-shadow 0.4s ease;
        }

        .tdg-figure-${uid}:hover {
          box-shadow: 0 12px 48px rgba(14, 165, 233, 0.4);
        }

        .tdg-figure-${uid} img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: ${br}px;
          backface-visibility: ${bfv};
          transition: all 0.5s ease;
        }

        .tdg-figure-${uid}:hover img {
          transform: scale(1.2);
        }

        .tdg-overlay-${uid} {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 2;
          border-radius: ${br}px;
          cursor: pointer;
        }

        .tdg-figure-${uid}:hover .tdg-overlay-${uid} {
          opacity: 1;
        }

        .tdg-overlay-${uid} span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: none;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 6px;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .tdg-overlay-${uid} span:hover {
          transform: scale(1.08);
        }
      `}</style>

      <div className={`tdg-wrap-${uid} ${className}`}>
        <div className={`tdg-carousel-${uid}`}>
          {validImages.map((src, i) => {
            const link = links[i];
            return (
              <figure
                key={i}
                className={`tdg-figure-${uid}`}
                style={{
                  transform: `rotateY(${i * anglePer}deg) translateZ(${tz}px)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Gallery image ${i + 1}`} draggable={false} />
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`tdg-overlay-${uid}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visit Site →</span>
                  </a>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </>
  );
}

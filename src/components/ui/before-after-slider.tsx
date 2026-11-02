"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  accentColor?: string;
  revealOnScroll?: boolean;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel,
  afterLabel,
  accentColor = "#0ea5e9",
  revealOnScroll = false,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activePointer = useRef<number | null>(null);
  const manualControl = useRef(false);
  const [sliderPct, setSliderPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = useReducedMotion();
  const target = useMotionValue(50);
  const smoothed = useSpring(target, { stiffness: 180, damping: 32, mass: 0.5 });
  const position = reduceMotion ? target : smoothed;
  // Clip a full-size layer: changing its width would resize and misalign the image.
  const clipPath = useTransform(position, (value) => `inset(0 ${100 - value}% 0 0)`);
  const dividerLeft = useTransform(position, (value) => `${value}%`);
  const handleLeft = useTransform(position, (value) => `clamp(24px, ${value}%, calc(100% - 24px))`);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 85%", "end 25%"] });

  const setPosition = (value: number) => {
    const next = Math.min(100, Math.max(0, value));
    target.set(next);
    setSliderPct(Math.round(next));
  };

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (revealOnScroll && !reduceMotion && !manualControl.current) {
      // Reveal the rendered layer as the visitor scrolls through the comparison.
      setPosition(100 - progress * 100);
    }
  });

  const updateFromPointer = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && rect.width > 0) setPosition(((clientX - rect.left) / rect.width) * 100);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    manualControl.current = true;
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromPointer(event.clientX);
    event.currentTarget.querySelector<HTMLButtonElement>("[role=slider]")?.focus({ preventScroll: true });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.shiftKey ? 10 : 2;
    const next = {
      ArrowLeft: sliderPct - delta,
      ArrowDown: sliderPct - delta,
      ArrowRight: sliderPct + delta,
      ArrowUp: sliderPct + delta,
      Home: 0,
      End: 100,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    manualControl.current = true;
    setPosition(next);
  };

  return (
    <div
      ref={containerRef}
      data-comparison
      onPointerDown={onPointerDown}
      onPointerMove={(event) => {
        if (activePointer.current === event.pointerId) updateFromPointer(event.clientX);
      }}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={() => { activePointer.current = null; setDragging(false); }}
      className="relative w-full overflow-hidden rounded-2xl select-none"
      style={{ aspectRatio: "16/9", touchAction: "pan-y", cursor: "ew-resize", boxShadow: "0 24px 64px rgba(0,0,0,0.14)" }}
    >
      <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 1280px) 100vw, 1100px" className="object-cover object-center pointer-events-none" draggable={false} />
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <Image src={beforeSrc} alt={beforeAlt} fill sizes="(max-width: 1280px) 100vw, 1100px" className="object-cover object-center pointer-events-none" draggable={false} />
      </motion.div>
      {beforeLabel && <span className="absolute left-4 top-4 rounded-full bg-slate-950/75 px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-white pointer-events-none">{beforeLabel}</span>}
      {afterLabel && <span className="absolute right-4 top-4 rounded-full bg-slate-950/75 px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-white pointer-events-none">{afterLabel}</span>}
      <motion.div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: dividerLeft, x: "-50%" }} />
      <motion.button
        type="button"
        role="slider"
        aria-label="Compare before and after images"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPct}
        aria-valuetext={`${sliderPct}% ${beforeLabel ?? "before"} visible`}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        onFocus={() => { manualControl.current = true; }}
        className="absolute top-1/2 z-20 w-12 h-12 rounded-full border-2 border-white shadow-xl flex items-center justify-center cursor-ew-resize focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
        style={{ left: handleLeft, x: "-50%", y: "-50%", background: accentColor }}
        animate={{ scale: dragging ? 1.1 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.15 }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
          <path d="M7 2L2 8L7 14M13 2L18 8L13 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </div>
  );
}

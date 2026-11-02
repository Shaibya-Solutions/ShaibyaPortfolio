"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  onActiveChange?: (id: number | null) => void;
  activeId?: number | null;
  activeStepId?: number;
}

export default function RadialOrbitalTimeline({
  timelineData,
  onActiveChange,
  activeId = null,
  activeStepId = 4,
}: RadialOrbitalTimelineProps) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const currentId = activeId ?? selectedId ?? timelineData[0]?.id;
  const current = timelineData.find((item) => item.id === currentId);
  const selectedIndex = timelineData.findIndex((item) => item.id === currentId);
  const controlled = activeId !== null || selectedId !== null;
  const angleOffset = controlled ? 180 - (selectedIndex / timelineData.length) * 360 : rotation;
  const isLight = activeStepId === 2 || activeStepId === 5;
  const accent = isLight ? "#0ea5e9" : activeStepId === 3 || activeStepId === 6 ? "#38bdf8" : "#ffffff";

  useEffect(() => {
    const element = diagramRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      // Reserve room for every node, label, and focus ring on all four sides.
      const available = Math.min(entry.contentRect.width, entry.contentRect.height);
      setRadius(Math.max(36, Math.min(190, (available - 112) / 2)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (controlled || reduceMotion) return;
    const timer = setInterval(() => setRotation((value) => (value + 0.35) % 360), 50);
    return () => clearInterval(timer);
  }, [controlled, reduceMotion]);

  const select = (id: number) => {
    if (activeId === null) setSelectedId(id);
    onActiveChange?.(id);
  };

  return (
    <div data-orbital-timeline className="grid h-full min-h-0 w-full grid-rows-[minmax(160px,1fr)_auto] gap-3">
      <div ref={diagramRef} data-orbit-diagram className="relative flex min-h-0 w-full items-center justify-center">
        <div className="absolute h-48 w-48 rounded-full blur-3xl pointer-events-none" style={{ background: accent, opacity: 0.08 }} />
        <div className="absolute rounded-full border-2" style={{ width: radius * 2, height: radius * 2, borderColor: accent, opacity: 0.35 }} />
        <div className="absolute flex h-16 w-16 items-center justify-center rounded-full shadow-xl" style={{ background: isLight ? "#0ea5e9" : "#ffffff" }}>
          <div className="h-8 w-8 rounded-full border" style={{ borderColor: isLight ? "#bae6fd" : "#e2e8f0", background: isLight ? "#ffffff" : "#e0f2fe" }} />
        </div>
        {timelineData.map((item, index) => {
          const angle = ((index / timelineData.length) * 360 + angleOffset) * Math.PI / 180;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const active = item.id === currentId;
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, transition: reduceMotion || !controlled ? "none" : "transform 600ms ease", zIndex: active ? 2 : 1 }}
            >
              <button
                type="button"
                onClick={() => select(item.id)}
                aria-label={`View ${item.title} stage`}
                aria-pressed={active}
                className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: active ? "#0ea5e9" : accent, background: active ? "#ffffff" : isLight ? "#ffffff" : "rgba(255,255,255,0.08)", borderColor: active ? "#ffffff" : accent, outlineColor: accent }}
              >
                <Icon size={21} aria-hidden="true" />
                <span className="absolute left-1/2 top-14 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold" style={{ color: accent }}>{item.title}</span>
              </button>
            </div>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {current && (
          <motion.div
            key={current.id}
            data-process-detail
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            className="relative mx-auto w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#0a1628]/95 p-4 sm:p-5 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-sky-300">
              <span>{current.date}</span><span>{current.category}</span>
            </div>
            <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-white mb-2">{current.title}</h3>
            <p className="text-xs text-white/75 leading-relaxed">{current.content}</p>
            <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500" style={{ width: `${current.energy}%` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

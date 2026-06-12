"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TargetCursorProps {
  /** CSS selector for elements that trigger the targeting lock */
  targetSelector?: string;
  /** CSS selector for the container — cursor is only shown inside this element */
  containerSelector?: string;
  /** Color of the cursor ring/crosshair lines */
  color?: string;
  /** Spin duration in seconds when idle */
  spinDuration?: number;
  /** Transition duration in seconds when locking onto a target */
  hoverDuration?: number;
  /** Whether to hide the native cursor only when over a target */
  hideDefaultCursorOnTarget?: boolean;
  /** Size of the cursor circle in px */
  size?: number;
}

export default function TargetCursor({
  targetSelector = ".cursor-target",
  containerSelector,
  color = "#d97706",
  spinDuration = 3,
  hoverDuration = 0.15,
  hideDefaultCursorOnTarget = true,
  size = 44,
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -300, y: -300 });
  const targetRectRef = useRef<{ cx: number; cy: number } | null>(null);
  const rafRef = useRef<number>(0);
  const lxRef = useRef(-300);
  const lyRef = useRef(-300);
  const [locked, setLocked] = useState(false);
  // Only show cursor when mouse is inside the container
  const [inContainer, setInContainer] = useState(false);

  const LERP = 0.13;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(() => {
    const el = cursorRef.current;
    if (!el) return;

    const { cx, cy } = targetRectRef.current ?? {
      cx: posRef.current.x,
      cy: posRef.current.y,
    };

    lxRef.current = lerp(lxRef.current, cx, LERP);
    lyRef.current = lerp(lyRef.current, cy, LERP);

    el.style.transform = `translate(${lxRef.current - size / 2}px, ${lyRef.current - size / 2}px)`;
    rafRef.current = requestAnimationFrame(tick);
  }, [size]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (containerSelector) {
        const container = document.querySelector(containerSelector);
        if (container) {
          const r = container.getBoundingClientRect();
          const inside =
            e.clientX >= r.left &&
            e.clientX <= r.right &&
            e.clientY >= r.top &&
            e.clientY <= r.bottom;

          setInContainer(inside);

          // Hide/restore native cursor based on whether we're inside the section
          const existing = document.getElementById("__target-cursor-hide__");
          if (inside && !existing) {
            const style = document.createElement("style");
            style.id = "__target-cursor-hide__";
            style.textContent = `* { cursor: none !important; }`;
            document.head.appendChild(style);
          } else if (!inside && existing) {
            existing.remove();
          }
        }
      } else {
        setInContainer(true);
      }
    };

    const handleEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      targetRectRef.current = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      setLocked(true);
    };

    const handleLeave = () => {
      targetRectRef.current = null;
      setLocked(false);
    };

    const handleScroll = () => {
      if (!targetRectRef.current) return;
      document.querySelectorAll<HTMLElement>(targetSelector).forEach((el) => {
        if (el.matches(":hover")) {
          const r = el.getBoundingClientRect();
          targetRectRef.current = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
        }
      });
    };

    document.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const targets = document.querySelectorAll<HTMLElement>(targetSelector);
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      cancelAnimationFrame(rafRef.current);
      document.getElementById("__target-cursor-hide__")?.remove();
    };
  }, [targetSelector, containerSelector, hideDefaultCursorOnTarget, tick]);

  const half = size / 2;
  const arm = size * 0.65;
  const corner = size * 0.25;

  // Only render when mouse is inside the container section
  const visible = inContainer;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        willChange: "transform",
        transition: `opacity 0.2s`,
      }}
    >
      <svg
        overflow="visible"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
      >
        {/* ─── spinning dashed ring (idle, inside container) ─── */}
        <circle
          cx={half}
          cy={half}
          r={half - 1.5}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={locked ? 0 : 1}
          strokeDasharray={`${Math.PI * size * 0.28} ${Math.PI * size * 0.72}`}
          style={{
            transformOrigin: `${half}px ${half}px`,
            animation: `__tcSpin ${spinDuration}s linear infinite`,
            transition: `stroke-opacity 0.15s`,
          }}
        />

        {/* ─── solid ring (locked onto target) ─── */}
        <circle
          cx={half}
          cy={half}
          r={half - 1.5}
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeOpacity={locked ? 1 : 0}
          style={{ transition: `stroke-opacity ${hoverDuration}s` }}
        />

        {/* ─── crosshair + corner brackets (locked) ─── */}
        <g opacity={locked ? 1 : 0} style={{ transition: `opacity ${hoverDuration}s` }}>
          <circle cx={half} cy={half} r={2.5} fill={color} />
          {/* top */}
          <line x1={half} y1={-4} x2={half} y2={-4} stroke={color} strokeWidth={1.5} />
          {/* bottom */}
          <line x1={half} y1={size + 4} x2={half} y2={size + arm * 0.55} stroke={color} strokeWidth={1.5} />
          {/* left */}
          <line x1={-4} y1={half} x2={-4} y2={half} stroke={color} strokeWidth={1.5} />
          {/* right */}
          <line x1={size + 4} y1={half} x2={size + arm * 0.55} y2={half} stroke={color} strokeWidth={1.5} />
          {/* top-left */}
          <path d={`M ${-arm * 0.65} ${-arm * 0.65 + corner} L ${-arm * 0.65} ${-arm * 0.65} L ${-arm * 0.65 + corner} ${-arm * 0.65}`}
            fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="square" />
          {/* top-right */}
          <path d={`M ${size + arm * 0.65 - corner} ${-arm * 0.65} L ${size + arm * 0.65} ${-arm * 0.65} L ${size + arm * 0.65} ${-arm * 0.65 + corner}`}
            fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="square" />
          {/* bottom-left */}
          <path d={`M ${-arm * 0.65} ${size + arm * 0.65 - corner} L ${-arm * 0.65} ${size + arm * 0.65} L ${-arm * 0.65 + corner} ${size + arm * 0.65}`}
            fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="square" />
          {/* bottom-right */}
          <path d={`M ${size + arm * 0.65 - corner} ${size + arm * 0.65} L ${size + arm * 0.65} ${size + arm * 0.65} L ${size + arm * 0.65} ${size + arm * 0.65 - corner}`}
            fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="square" />
        </g>
      </svg>

      <style>{`
        @keyframes __tcSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

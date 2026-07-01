"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
    beforeSrc: string;
    afterSrc: string;
    accentColor?: string;
}

export function BeforeAfterSlider({
    beforeSrc,
    afterSrc,
    accentColor = "#0ea5e9",
}: BeforeAfterSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPct, setSliderPct] = useState(50);
    const [dragging, setDragging] = useState(false);

    const updateSlider = useCallback((clientX: number) => {
        const el = containerRef.current;
        if (!el) return;
        const { left, width } = el.getBoundingClientRect();
        const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
        setSliderPct(pct);
    }, []);

    /* ── mouse ── */
    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);
        updateSlider(e.clientX);
    };
    const onMouseMove = useCallback(
        (e: MouseEvent) => { if (dragging) updateSlider(e.clientX); },
        [dragging, updateSlider]
    );
    const onMouseUp = useCallback(() => setDragging(false), []);

    /* ── touch ── */
    const onTouchStart = (e: React.TouchEvent) => {
        setDragging(true);
        updateSlider(e.touches[0].clientX);
    };
    const onTouchMove = useCallback(
        (e: TouchEvent) => { if (dragging) updateSlider(e.touches[0].clientX); },
        [dragging, updateSlider]
    );
    const onTouchEnd = useCallback(() => setDragging(false), []);

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

    const onContainerClick = (e: React.MouseEvent) => {
        updateSlider(e.clientX);
    };

    return (
        <div
            ref={containerRef}
            onClick={onContainerClick}
            className="relative w-full overflow-hidden rounded-2xl select-none"
            style={{
                aspectRatio: "16/9",
                cursor: dragging ? "grabbing" : "grab",
                boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
            }}
        >
            {/* ── AFTER (full width, bottom layer) ── */}
            <div className="absolute inset-0">
                <Image
                    src={afterSrc}
                    alt="After"
                    fill
                    sizes="(max-width: 1280px) 100vw, 1100px"
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* ── BEFORE (clipped to left portion) ── */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPct}%` }}
            >
                <Image
                    src={beforeSrc}
                    alt="Before"
                    fill
                    sizes="(max-width: 1280px) 100vw, 1100px"
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* ── Divider line ── */}
            <div
                className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
                style={{ left: `${sliderPct}%`, background: "#fff", transform: "translateX(-50%)" }}
            />

            {/* ── Drag handle ── */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                style={{ left: `${sliderPct}%` }}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                <motion.div
                    animate={{ scale: dragging ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-11 h-11 rounded-full border-2 border-white shadow-xl flex items-center justify-center"
                    style={{ background: accentColor }}
                >
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <path d="M7 2L2 8L7 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13 2L18 8L13 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}

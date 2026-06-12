"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Types ─── */
export interface CardShowcaseItem {
    number: string;
    title: string;
    description: string;
    tag: string;
    image: string;
}

export interface CardShowcaseProps {
    cards: CardShowcaseItem[];
    /** Hex colour for the progress bar */
    progressColor?: string;
    /** Main text colour */
    textColor?: string;
    /** Large number colour */
    numberColor?: string;
    /** Tag pill colour */
    tagColor?: string;
    /** Seconds each card stays active before auto-advancing */
    animationSpeed?: number;
    /** Whether to loop back to card 1 after the last */
    loop?: boolean;
    /** Border-radius of the image panel in px */
    imageRadius?: number;
    /** Inner padding in px */
    padding?: number;
    /** Gap between text column and image column in px */
    contentImageGap?: number;
    /** Minimum height of the component in px */
    minHeight?: number;
}

export default function CardShowcase({
    cards,
    progressColor = "#2196F3",
    textColor = "#1a1f2e",
    numberColor = "#CCCCCC",
    tagColor = "#2196F3",
    animationSpeed = 5,
    loop = true,
    imageRadius = 12,
    padding = 40,
    contentImageGap = 20,
    minHeight = 600,
}: CardShowcaseProps) {
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fading, setFading] = useState(false);
    const rafRef = useRef<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startRef = useRef<number>(Date.now());

    const goTo = useCallback(
        (index: number) => {
            if (index === active) return;
            setFading(true);
            setTimeout(() => {
                setActive(index);
                setProgress(0);
                startRef.current = Date.now();
                setFading(false);
            }, 260);
        },
        [active]
    );

    /* ── Tick: drive the progress bar and auto-advance ── */
    useEffect(() => {
        startRef.current = Date.now();
        setProgress(0);

        const tick = () => {
            const elapsed = (Date.now() - startRef.current) / 1000;
            const pct = Math.min((elapsed / animationSpeed) * 100, 100);
            setProgress(pct);
            if (pct < 100) {
                rafRef.current = requestAnimationFrame(tick);
            }
        };
        rafRef.current = requestAnimationFrame(tick);

        timerRef.current = setTimeout(() => {
            const next = active + 1 >= cards.length ? (loop ? 0 : active) : active + 1;
            goTo(next);
        }, animationSpeed * 1000);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [active, animationSpeed, cards.length, loop, goTo]);

    const card = cards[active];

    return (
        <div
            className="w-full flex flex-col lg:flex-row"
            style={{ minHeight, gap: contentImageGap, padding }}
        >
            {/* ── Left: vertical card list ── */}
            <div
                className="flex flex-col justify-center w-full lg:w-[45%]"
                style={{ gap: 8 }}
            >
                {cards.map((c, i) => {
                    const isActive = i === active;
                    return (
                        <button
                            key={c.number}
                            onClick={() => goTo(i)}
                            className="text-left w-full rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2"
                            style={{
                                background: isActive ? "#ffffff" : "transparent",
                                boxShadow: isActive ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
                                border: isActive ? "1px solid #E5E7EB" : "1px solid transparent",
                                padding: isActive ? "22px 24px" : "14px 24px",
                                focusRingColor: progressColor,
                            } as React.CSSProperties}
                        >
                            {/* Row: number + title + tag */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <span
                                        className="text-[11px] font-bold tabular-nums shrink-0 w-6"
                                        style={{ color: isActive ? progressColor : numberColor }}
                                    >
                                        {c.number}
                                    </span>
                                    <span
                                        className="font-bold text-[15px] leading-tight"
                                        style={{
                                            color: isActive ? textColor : "#9CA3AF",
                                            fontFamily: "var(--font-syne)",
                                        }}
                                    >
                                        {c.title}
                                    </span>
                                </div>

                                {isActive && (
                                    <span
                                        className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
                                        style={{
                                            color: tagColor,
                                            background: `${tagColor}15`,
                                            border: `1px solid ${tagColor}30`,
                                        }}
                                    >
                                        {c.tag}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            {isActive && (
                                <p
                                    className="text-[13px] leading-[1.8] mt-3"
                                    style={{
                                        color: "#6B7280",
                                        opacity: fading ? 0 : 1,
                                        transform: fading ? "translateY(6px)" : "translateY(0)",
                                        transition: "opacity 0.26s ease, transform 0.26s ease",
                                    }}
                                >
                                    {c.description}
                                </p>
                            )}

                            {/* Progress bar */}
                            {isActive && (
                                <div
                                    className="mt-4 h-[3px] rounded-full overflow-hidden"
                                    style={{ background: `${progressColor}20` }}
                                >
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${progress}%`,
                                            background: progressColor,
                                            transition: "width 0.08s linear",
                                        }}
                                    />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── Right: image panel ── */}
            <div
                className="flex-1 relative overflow-hidden"
                style={{
                    borderRadius: imageRadius,
                    minHeight: 320,
                    background: "#F1F5F9",
                }}
            >
                {cards.map((c, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        key={c.number}
                        src={c.image}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            borderRadius: imageRadius,
                            opacity: i === active && !fading ? 1 : 0,
                            transform: i === active && !fading ? "scale(1)" : "scale(1.04)",
                            transition: "opacity 0.35s ease, transform 0.35s ease",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

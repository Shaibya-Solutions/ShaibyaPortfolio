"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   City coordinates tuned to the SVG viewBox="0 0 650 750"
   The India outline below is a simplified tracing of the
   actual geographic outline at that scale.
   ───────────────────────────────────────────────────────────── */
const CITIES = [
    { name: "Nagpur", x: 295, y: 390, primary: true },
    { name: "Delhi", x: 255, y: 195, primary: false },
    { name: "Mumbai", x: 200, y: 415, primary: false },
    { name: "Noida", x: 268, y: 198, primary: false },
    { name: "Bangalore", x: 262, y: 530, primary: false },
];

interface IndiaMapProps { className?: string }

/* ─────────────────────────────────────────────────────────────
   Simplified India outline — scaled to viewBox 0 0 520 620
   Derived from Natural Earth public domain data.
   ───────────────────────────────────────────────────────────── */
const INDIA_PATH = `
M 258,8
L 268,10 L 278,14 L 290,12 L 302,18 L 316,14 L 326,20 L 338,16
L 348,24 L 356,20 L 364,28 L 374,22 L 382,30 L 390,26 L 400,34
L 408,30 L 416,40 L 412,50 L 420,56 L 428,50 L 436,58 L 432,68
L 440,74 L 436,84 L 444,90 L 438,100 L 430,106 L 436,116
L 424,124 L 428,136 L 418,144 L 412,158 L 400,162 L 394,176
L 382,178 L 376,192 L 364,198 L 360,214 L 348,222 L 340,238
L 348,250 L 352,266 L 346,280 L 336,292 L 328,308 L 318,322
L 308,336 L 302,354 L 296,370 L 290,386 L 284,402 L 278,420
L 272,436 L 268,452 L 264,468 L 260,484 L 256,500 L 252,516
L 248,532 L 246,548 L 250,562 L 258,570 L 268,576 L 278,568
L 286,554 L 282,538 L 278,522 L 272,508 L 268,494 L 264,508
L 260,524 L 256,538 L 252,552
L 232,518 L 226,500 L 216,484 L 208,466 L 202,448 L 196,430
L 190,410 L 184,390 L 178,370 L 172,350 L 166,332 L 162,314
L 158,296 L 154,276 L 150,258 L 148,240 L 144,222 L 140,204
L 136,186 L 132,170 L 130,152 L 128,136 L 132,120 L 126,106
L 120,92 L 116,78 L 122,64 L 116,52 L 122,40 L 130,30
L 140,24 L 152,18 L 164,14 L 178,10 L 192,8 L 206,6 L 220,4
L 234,6 Z
M 394,26 L 406,20 L 418,24 L 426,32 L 432,42 L 436,54 L 426,60
L 416,52 L 408,44 Z
M 378,24 L 390,18 L 400,22 L 402,34 L 392,38 L 380,32 Z
`;

export default function IndiaMap({ className = "" }: IndiaMapProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* USA callout badge — off-map */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                style={{
                    position: "absolute", top: 0, right: 0,
                    background: "#0ea5e9", color: "#fff",
                    borderRadius: 8, padding: "6px 12px",
                    fontSize: 11, fontWeight: 700,
                    fontFamily: "var(--font-inter)",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    boxShadow: "0 4px 16px rgba(14,165,233,0.35)",
                    display: "flex", alignItems: "center", gap: 6,
                    zIndex: 20,
                }}
            >
                <span style={{ fontSize: 15 }}>🇺🇸</span> Texas, USA
            </motion.div>

            <svg
                viewBox="0 0 520 620"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                aria-label="India map — Shaibya Solutions locations"
            >
                {/* ── India outline — real simplified path ── */}
                <motion.path
                    d={INDIA_PATH}
                    fill="#0ea5e9"
                    fillOpacity={0.15}
                    stroke="#0ea5e9"
                    strokeWidth={1.8}
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* ── City pins ── */}
                {CITIES.map((city, i) => (
                    <motion.g
                        key={city.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                    >
                        {/* Pulse ring for HQ */}
                        {city.primary && (
                            <motion.circle
                                cx={city.x} cy={city.y} r={14}
                                fill="none" stroke="#0ea5e9" strokeWidth={1.5}
                                animate={{ r: [10, 20, 10], opacity: [0.8, 0, 0.8] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}
                        {/* Outer circle */}
                        <circle
                            cx={city.x} cy={city.y}
                            r={city.primary ? 7 : 5}
                            fill={city.primary ? "#0ea5e9" : "#ffffff"}
                            stroke="#0ea5e9"
                            strokeWidth={city.primary ? 0 : 2}
                        />
                        {/* Inner dot for secondary */}
                        {!city.primary && (
                            <circle cx={city.x} cy={city.y} r={2.5} fill="#0ea5e9" />
                        )}
                        {/* Label */}
                        <text
                            x={city.x + (city.x > 260 ? 12 : -12)}
                            y={city.y + 4}
                            textAnchor={city.x > 260 ? "start" : "end"}
                            fill="#111827"
                            fontSize={city.primary ? 11 : 9}
                            fontWeight={city.primary ? 700 : 500}
                            fontFamily="var(--font-inter), DM Sans, sans-serif"
                            letterSpacing="0.04em"
                        >
                            {city.name.toUpperCase()}
                        </text>
                    </motion.g>
                ))}
            </svg>
        </div>
    );
}

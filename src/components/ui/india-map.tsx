"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { INDIA_MAP_DATA } from "./india-map-data";

const CITIES = [
  { name: "Nagpur", x: 250, y: 410, primary: true, stateId: "mh" },
  { name: "Delhi", x: 186, y: 210, primary: false, stateId: "dl" },
  { name: "Mumbai", x: 105, y: 440, primary: false, stateId: "mh" },
  { name: "Noida", x: 195, y: 212, primary: false, stateId: "up" },
  { name: "Bangalore", x: 195, y: 560, primary: false, stateId: "ka" },
];

interface IndiaMapProps {
  className?: string;
  activeCity?: string | null;
  onCityHover?: (cityName: string | null) => void;
}

export default function IndiaMap({ className = "", activeCity = null, onCityHover }: IndiaMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const isTexasActive = activeCity === "Texas";
  const isAnyActive = activeCity !== null;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* USA callout badge — off-map */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { 
          opacity: !isAnyActive || isTexasActive ? 1 : 0.4, 
          x: 0, 
          scale: isTexasActive ? 1.05 : 1 
        } : {}}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => onCityHover?.("Texas")}
        onMouseLeave={() => onCityHover?.(null)}
        className="cursor-pointer transition-all duration-300"
        style={{
          position: "absolute", top: 10, right: 10,
          background: "#0ea5e9", color: "#fff",
          borderRadius: 8, padding: "6px 12px",
          fontSize: 11, fontWeight: 700,
          fontFamily: "var(--font-inter)",
          letterSpacing: "0.1em", textTransform: "uppercase",
          boxShadow: isTexasActive ? "0 8px 24px rgba(14,165,233,0.5)" : "0 4px 16px rgba(14,165,233,0.25)",
          display: "flex", alignItems: "center", gap: 6,
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: 15 }}>🇺🇸</span> Texas, USA
      </motion.div>

      <svg
        viewBox="0 0 612 696"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Detailed India Map — Shaibya Solutions footprint"
      >
        {/* ── State boundaries ── */}
        <g>
          {INDIA_MAP_DATA.map((state) => {
            const isStateHighlighted = 
              (state.id === "mh" && (activeCity === "Nagpur" || activeCity === "Mumbai")) ||
              (state.id === "ka" && activeCity === "Bangalore") ||
              (state.id === "dl" && activeCity === "Delhi") ||
              (state.id === "up" && activeCity === "Noida");
            
            return (
              <motion.path
                key={state.id}
                d={state.path}
                fill={isStateHighlighted ? "rgba(249, 115, 22, 0.15)" : "rgba(14, 165, 233, 0.02)"}
                stroke={isStateHighlighted ? "#f97316" : "rgba(145, 158, 171, 0.2)"}
                strokeWidth={isStateHighlighted ? 2.2 : 0.8}
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={inView ? { 
                  opacity: 1,
                  fill: isStateHighlighted ? "rgba(249, 115, 22, 0.14)" : "rgba(14, 165, 233, 0.02)",
                  stroke: isStateHighlighted ? "#f97316" : "rgba(148, 163, 184, 0.25)"
                } : {}}
                transition={{ duration: 0.6 }}
                className="transition-all duration-300 cursor-pointer hover:fill-sky-500/5 hover:stroke-sky-500/30"
                onMouseEnter={() => {
                  if (state.id === "mh") onCityHover?.("Nagpur");
                  else if (state.id === "ka") onCityHover?.("Bangalore");
                  else if (state.id === "dl") onCityHover?.("Delhi");
                  else if (state.id === "up") onCityHover?.("Noida");
                }}
                onMouseLeave={() => onCityHover?.(null)}
              />
            );
          })}
        </g>

        {/* ── City pins ── */}
        {CITIES.map((city, i) => {
          const isHovered = activeCity === city.name;
          const isAnyHovered = activeCity !== null;
          const opacity = !isAnyHovered || isHovered ? 1 : 0.35;

          return (
            <motion.g
              key={city.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity, scale: isHovered ? 1.25 : 1 } : {}}
              transition={{ 
                opacity: { duration: 0.2 },
                scale: { type: "spring", stiffness: 300, damping: 15 },
                delay: inView && !isAnyHovered ? 0.3 + i * 0.08 : 0
              }}
              onMouseEnter={() => onCityHover?.(city.name)}
              onMouseLeave={() => onCityHover?.(null)}
              className="cursor-pointer"
              style={{ transformOrigin: `${city.x}px ${city.y}px` }}
            >
              {/* Pulse ring for Nagpur HQ */}
              {city.primary && (
                <motion.circle
                  cx={city.x} cy={city.y} r={14}
                  fill="none" stroke="#f97316" strokeWidth={1.5}
                  animate={{ r: [10, 22, 10], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {/* Outer circle */}
              <circle
                cx={city.x} cy={city.y}
                r={city.primary ? 7 : 5.5}
                fill={city.primary ? "#f97316" : (isHovered ? "#0ea5e9" : "#ffffff")}
                stroke={city.primary ? "#f97316" : "#0ea5e9"}
                strokeWidth={city.primary ? 0 : 2}
                className="transition-colors duration-300"
              />
              {/* Inner dot for secondary */}
              {!city.primary && (
                <circle 
                  cx={city.x} 
                  cy={city.y} 
                  r={2.2} 
                  fill={isHovered ? "#ffffff" : "#0ea5e9"} 
                  className="transition-colors duration-300"
                />
              )}
              {/* Label */}
              <text
                x={city.x + (city.x > 260 ? 12 : -12)}
                y={city.y + 4}
                textAnchor={city.x > 260 ? "start" : "end"}
                fill={isHovered ? (city.primary ? "#f97316" : "#0ea5e9") : "#111827"}
                fontSize={city.primary ? 11 : 9}
                fontWeight={city.primary || isHovered ? 700 : 500}
                fontFamily="var(--font-inter), DM Sans, sans-serif"
                letterSpacing="0.04em"
                className="transition-colors duration-300 dark:fill-slate-300"
              >
                {city.name.toUpperCase()}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

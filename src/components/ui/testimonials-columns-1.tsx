"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useAnimationControls } from "motion/react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const duration = props.duration || 10;

  // Manage infinite scroll via requestAnimationFrame for pause support
  const rafRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!containerRef.current) return;
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp - progressRef.current * duration * 1000;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = (elapsed / (duration * 1000)) % 1;
      progressRef.current = progress;

      const translateY = -(progress * 50); // -50% over one cycle
      containerRef.current.style.transform = `translateY(${translateY}%)`;

      rafRef.current = requestAnimationFrame(animate);
    },
    [duration]
  );

  useEffect(() => {
    if (!isPaused) {
      startTimeRef.current = null; // Will be recalculated from progressRef
      rafRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, animate]);

  return (
    <div
      className={props.className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className="flex flex-col gap-6 pb-6"
        style={{ willChange: "transform" }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className={`
                    group relative p-10 rounded-3xl border max-w-xs w-full
                    bg-white/80 backdrop-blur-sm
                    shadow-[0_2px_20px_rgba(14,165,233,0.06)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:shadow-[0_12px_40px_rgba(14,165,233,0.15)]
                    hover:border-[#0ea5e9]/30
                    hover:scale-[1.03]
                    hover:-translate-y-1
                  `}
                  key={i}
                >
                  {/* Subtle gradient glow on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#0ea5e9]/[0.03] via-transparent to-[#38bdf8]/[0.03]" />

                  <div className="relative">
                    {/* Quote icon */}
                    <svg
                      className="w-8 h-8 mb-4 text-[#0ea5e9]/20 group-hover:text-[#0ea5e9]/40 transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.998 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.986z" />
                    </svg>

                    <div className="text-[0.925rem] leading-relaxed text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {text}
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                      <img
                        width={44}
                        height={44}
                        src={image}
                        alt={name}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-md group-hover:ring-[#0ea5e9]/20 transition-all duration-300"
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold tracking-tight leading-5 text-gray-900">
                          {name}
                        </div>
                        <div className="text-sm leading-5 text-gray-400 tracking-tight group-hover:text-[#0ea5e9]/70 transition-colors duration-300">
                          {role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};

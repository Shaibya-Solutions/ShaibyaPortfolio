"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0, scale: 0.96 }),
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Card carousel */}
      <div className="relative min-h-[280px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: "easeInOut" }}
              className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={18}
                    className={
                      idx < testimonials[current].rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200 fill-slate-200"
                    }
                  />
                ))}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-3">
                &ldquo;{testimonials[current].title}&rdquo;
              </h3>

              <p className="text-slate-500 leading-relaxed text-sm sm:text-base mb-6">
                {testimonials[current].text}
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-lg">
                  {testimonials[current].author.charAt(0)}
                </div>
                <p className="font-semibold text-slate-800">
                  {testimonials[current].author}
                </p>
                <p className="text-xs text-slate-400">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-amber-500"
                    : "w-2 bg-slate-300 hover:bg-amber-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
    </div>
  );
}

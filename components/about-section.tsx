"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BsCheckCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

const features = [
  "Customized Solutions built around your business needs",
  "AI-enabled growth that delivers measurable results",
  "Trusted by global clients across multiple industries",
  "End-to-end services – from product design to digital marketing",
  "Ahead of the curve, always – future-ready solutions for tomorrow’s challenges",
];

export default function WhyShaibya() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <section className='bg-[#020617] py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden'>
      {/* Optional futuristic background */}
      <div className='absolute inset-0 bg-gradient-to-tr from-[#0f172a] to-[#1e293b] opacity-20 -z-10'></div>
      <div className='max-w-6xl mx-auto text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          ref={ref}
          className='text-4xl md:text-5xl font-bold text-white mb-12'
        >
          🌟 Why Shaibya Solutions?
        </motion.h2>

        <motion.div
          variants={container}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid gap-6 md:grid-cols-2'
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className='flex items-start gap-4 p-6 bg-gradient-to-r from-[#1e293b]/30 to-[#0f172a]/30 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105'
            >
              <BsCheckCircleFill
                size={28}
                className='text-yellow-400 mt-1 flex-shrink-0'
              />
              <p className='text-white font-medium text-lg'>{feature}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Futuristic floating dots */}
      <FloatingDots />
    </section>
  );
}

interface Dot {
  x: number;
  y: number;
  size: number;
  vx: number; // velocity x
  vy: number; // velocity y
}

export function FloatingDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  const animationRef = useRef<number | null>(null);

  // Generate dots
  useEffect(() => {
    const count = 100; // more dots
    const width = window.innerWidth;
    const height = window.innerHeight;

    const newDots: Dot[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2, // size 2–6px
      vx: (Math.random() - 0.5) * 1.5, // speed x
      vy: (Math.random() - 0.5) * 1.5, // speed y
    }));

    setDots(newDots);
  }, []);

  // Animate dots using requestAnimationFrame
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const animate = () => {
      setDots((prev) =>
        prev.map((dot) => {
          let newX = dot.x + dot.vx;
          let newY = dot.y + dot.vy;

          // bounce off edges
          if (newX < 0 || newX > width) dot.vx *= -1;
          if (newY < 0 || newY > height) dot.vy *= -1;

          return { ...dot, x: newX, y: newY };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  return (
    <div className='absolute inset-0 pointer-events-none z-0'>
      {dots.map((dot, idx) => (
        <div
          key={idx}
          className='absolute bg-yellow-400 rounded-full opacity-80'
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            top: `${dot.y}px`,
            left: `${dot.x}px`,
          }}
        />
      ))}
    </div>
  );
}

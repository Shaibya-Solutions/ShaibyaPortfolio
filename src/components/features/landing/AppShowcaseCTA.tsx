// components/AppShowcaseCTA.tsx
"use client";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useRef } from "react";
import { Section } from "@/components/shared/section";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.5 },
  },
};

export function AppShowcaseCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100 py-16 sm:py-24 md:py-32 px-4 border-y border-slate-200"
    >
      {/* Decorative amber glow */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #fbbf24, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-6xl mx-auto relative z-10">
        {/* Left: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-3"
          >
            Get Started Today
          </motion.p>
          <motion.h2
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 leading-tight"
          >
            Let's Build Your{" "}
            <span className="text-brand-glow">First App!</span>
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="text-slate-500 mb-8 max-w-prose mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed"
          >
            Looking to create an innovative app for your startup? Book a free
            consultation today. Let's design and develop your vision together.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.2, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
          >
            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
              <Link
                href="https://wa.me/917498341146?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] text-white font-bold rounded-xl shadow-md hover:bg-[#1DA851] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                <FaWhatsapp size={20} />
                <span className="whitespace-nowrap">Message on WhatsApp</span>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
              <Link
                href="https://www.instagram.com/shaibya.solutions?igsh=emE3dTg4NHVjd243"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#E1306C] to-[#833ab4] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                <FaInstagram size={20} />
                <span className="whitespace-nowrap">Follow on Instagram</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Phone mockups */}
        <motion.div
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
            y: translateY,
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex w-full lg:w-1/2 justify-center items-center relative h-[520px] sm:h-[600px] overflow-hidden"
        >
          <div className="relative w-full max-w-[560px] h-full flex items-center justify-center">
            {/* Center phone */}
            <motion.div className="absolute h-[72%] md:h-[82%] w-auto z-20">
              <Image
                src="/images/landing/mobile3.png"
                alt="Main App Screenshot"
                width={300}
                height={600}
                className="rounded-[3rem] h-full w-auto shadow-2xl border-4 border-slate-200"
              />
            </motion.div>
            {/* Left phone */}
            <motion.div
              className="absolute h-[62%] md:h-[72%] w-auto z-10"
              style={{ left: "5%", top: "18%", rotateZ: -10 }}
            >
              <Image
                src="/images/landing/mobile1.png"
                alt="App Screenshot 2"
                width={250}
                height={500}
                className="rounded-[2.5rem] h-full w-auto shadow-xl border-4 border-slate-200 opacity-75"
              />
            </motion.div>
            {/* Right phone */}
            <motion.div
              className="absolute h-[62%] md:h-[72%] w-auto z-10"
              style={{ right: "5%", top: "18%", rotateZ: 10 }}
            >
              <Image
                src="/images/landing/mobile2.png"
                alt="App Screenshot 3"
                width={250}
                height={500}
                className="rounded-[2.5rem] h-full w-auto shadow-xl border-4 border-slate-200 opacity-75"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

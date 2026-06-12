"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiFigma,
  SiTailwindcss, SiMongodb, SiPrisma, SiStripe,
} from "react-icons/si";
import { ChevronDown, Code2 } from "lucide-react";

/* ── Icon configs for the orbits ── */
const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#171717" },
  { Icon: SiVercel, color: "#171717" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: SiFigma, color: "#F24E1E" },
  { Icon: SiTailwindcss, color: "#06B6D4" },
  { Icon: SiMongodb, color: "#47A248" },
  { Icon: SiPrisma, color: "#2D3748" },
  { Icon: SiStripe, color: "#635BFF" },
];

export default function ContactOrbitHero() {
  const orbitCount = 3;
  const orbitGap = 8; // rem between orbits
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  const whatsappUrl =
    "https://wa.me/917498341146?text=" +
    encodeURIComponent("Hi, I'd like to connect with Shaibya Solutions.");

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#E0F5FC] via-[#f0f9ff] to-white">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow — top right */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-300/20 blur-[100px] pointer-events-none" />
      {/* Radial glow — bottom left */}
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-sky-200/30 blur-[80px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-32 lg:py-0 flex items-center justify-between gap-8">

          {/* ── Left: Text + CTA ── */}
          <div className="w-full lg:w-1/2 z-10">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                Let&apos;s Connect
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Start a{" "}
              <span className="heading-gradient">Conversation</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-lg lg:text-xl text-gray-500 max-w-lg leading-relaxed mb-10 font-light"
            >
              Whether you have a project in mind or just want to explore
              possibilities — we&apos;re one message away.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#0ea5e9] px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:bg-[#0284c7] hover:shadow-sky-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <FaWhatsapp className="text-lg" />
                Connect with us
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm px-8 py-4 text-[15px] font-semibold text-gray-700 transition-all hover:bg-white hover:border-gray-300 hover:-translate-y-0.5"
              >
                Fill out a form
              </a>
            </motion.div>
          </div>

          {/* ── Right: Orbit animation ── */}
          <div className="hidden lg:flex relative w-1/2 h-[36rem] items-center justify-start overflow-hidden">
            <div className="relative w-[50rem] h-[50rem] translate-x-[20%] flex items-center justify-center">

              {/* Center Circle */}
              <div className="w-24 h-24 rounded-full bg-white shadow-xl shadow-sky-200/50 flex items-center justify-center border border-sky-100 z-10">
                <Code2 className="w-10 h-10 text-sky-500" />
              </div>

              {/* Orbits */}
              {[...Array(orbitCount)].map((_, orbitIdx) => {
                const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
                const angleStep = (2 * Math.PI) / iconsPerOrbit;

                return (
                  <div
                    key={orbitIdx}
                    className="absolute rounded-full border-2 border-dotted border-gray-300/60"
                    style={{
                      width: size,
                      height: size,
                      animation: `contact-orbit-spin ${18 + orbitIdx * 8}s linear infinite${orbitIdx % 2 === 1 ? " reverse" : ""}`,
                    }}
                  >
                    {iconConfigs
                      .slice(
                        orbitIdx * iconsPerOrbit,
                        orbitIdx * iconsPerOrbit + iconsPerOrbit
                      )
                      .map((cfg, iconIdx) => {
                        const angle = iconIdx * angleStep;
                        const x = 50 + 50 * Math.cos(angle);
                        const y = 50 + 50 * Math.sin(angle);

                        return (
                          <div
                            key={iconIdx}
                            className="absolute bg-white rounded-full p-2 shadow-md shadow-gray-200/60 border border-gray-100"
                            style={{
                              left: `${x}%`,
                              top: `${y}%`,
                              transform: "translate(-50%, -50%)",
                              /* Counter-rotate so icons stay upright */
                              animation: `contact-orbit-spin ${18 + orbitIdx * 8}s linear infinite${orbitIdx % 2 === 1 ? "" : " reverse"}`,
                            }}
                          >
                            <cfg.Icon
                              className="w-7 h-7"
                              style={{ color: cfg.color }}
                            />
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 flex flex-col items-center pb-10 gap-2"
      >
        <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <div className="scroll-indicator">
          <ChevronDown size={16} className="text-sky-500" />
        </div>
      </motion.div>
    </section>
  );
}

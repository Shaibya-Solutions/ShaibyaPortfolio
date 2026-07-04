"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Apple, MonitorSmartphone, Monitor, PlaySquare } from "lucide-react";
import React from "react";

const expertises = [
  {
    icon: <Apple className="w-8 h-8 text-rose-500" />,
    title: "Native iOS & Android",
    desc: "Development using Swift/Kotlin/Java for maximum performance and full access to device features and SDKs.",
    color: "rgba(244, 63, 94, 0.15)", // rose-500
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-purple-500" />,
    title: "Cross-Platform (React Native/Flutter)",
    desc: "Efficiently build and deploy a single codebase across both iOS and Android, accelerating time-to-market.",
    color: "rgba(168, 85, 247, 0.15)", // purple-500
  },
  {
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
    title: "Desktop Applications",
    desc: "Seamless desktop experiences for Windows, macOS, and Linux using Electron or Tauri for multi-OS compatibility.",
    color: "rgba(59, 130, 246, 0.15)", // blue-500
  },
  {
    icon: <PlaySquare className="w-8 h-8 text-orange-500" />,
    title: "App Store Deployment & CI/CD",
    desc: "Handling store submission, review, and setting up automated Continuous Integration/Delivery (CI/CD) pipelines.",
    color: "rgba(249, 115, 22, 0.15)", // orange-500
  },
];

function GlowCard({ item, index }: { item: typeof expertises[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-[2rem] bg-white overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      onMouseMove={handleMouseMove}
    >
      {/* The glowing gradient that follows the mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${item.color},
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full w-full p-10 z-10 flex flex-col">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function SoftAppExpertise() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 text-center mb-20"
        >
          Multi-Platform Development Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertises.map((item, idx) => (
            <GlowCard key={idx} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

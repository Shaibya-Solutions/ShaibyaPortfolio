// components/CapabilitiesShowcase.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/shared/section";

const capabilitiesData = {
  design: {
    heading: "Design & Creative",
    subheading: "Where ideas take form.",
    services: [
      "Digital Marketing & Strategy",
      "CGI & 3D Advertisements",
      "3D Models & Visualization",
      "UI/UX Design & Prototyping",
      "Brand Identity & Guidelines",
      "Content Creation & Storytelling",
    ],
  },
  development: {
    heading: "Development & Innovation",
    subheading: "Building the future, one line of code at a time.",
    services: [
      "Custom AI Solutions & ML Models",
      "Mobile App Development (iOS/Android)",
      "Web Development (Full-Stack)",
      "Backend Solutions & APIs",
      "Salesforce Integration & Automation",
      "Cybersecurity Services",
      "AR/VR/Metaverse Experiences",
      "Cloud Solutions (AWS, Azure, GCP)",
    ],
  },
};

export function CapabilitiesShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section ref={ref} className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl lg:text-6xl font-extrabold text-white mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Our Core Capabilities
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Design Category */}
          <motion.div
            className="group bg-slate-800/70 p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Background animation effect */}
            <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                {capabilitiesData.design.heading}
              </h3>
              <p className="text-slate-400 mb-6">
                {capabilitiesData.design.subheading}
              </p>
              <ul className="space-y-4 text-lg text-slate-300">
                {capabilitiesData.design.services.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-blue-400 mt-1">●</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Development Category */}
          <motion.div
            className="group bg-slate-800/70 p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Background animation effect */}
            <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">
                {capabilitiesData.development.heading}
              </h3>
              <p className="text-slate-400 mb-6">
                {capabilitiesData.development.subheading}
              </p>
              <ul className="space-y-4 text-lg text-slate-300">
                {capabilitiesData.development.services.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-cyan-400 mt-1">●</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

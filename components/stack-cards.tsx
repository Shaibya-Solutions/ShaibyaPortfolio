"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const projects = [
  {
    title: "Enhancing Operational Efficiency with Predictive AI",
    description:
      "Posuere fermentum ante mauris egestas rhoncus? Scelerisque ut tristique dapibus dapibus sed lacinia. Fusce elementum dignissim sit tortor cras at dictumst.",
    stats: [
      { value: "50x", label: "Faster Proof of Concept" },
      { value: "3M", label: "Decreased Technology Debt" },
    ],
    image: "/images/truck.jpg",
  },
  {
    title: "Revolutionizing Logistics with Smart AI",
    description:
      "Integer non bibendum purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    stats: [
      { value: "70%", label: "Reduced Downtime" },
      { value: "10K+", label: "Routes Optimized" },
    ],
    image: "/images/logistics.jpg",
  },
  {
    title: "AI for Manufacturing Quality Control",
    description:
      "Morbi suscipit turpis nec lorem dapibus, ac viverra magna viverra. Aliquam erat volutpat.",
    stats: [
      { value: "99.9%", label: "Defect Detection" },
      { value: "2x", label: "Faster Processing" },
    ],
    image: "/images/factory.jpg",
  },
];

export default function StackCaseStudies() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={ref} className="bg-[#060a12] py-32 px-6">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          See aiNexa in Action
        </h2>
      </div>

      <div className="relative h-[200vh]">
        {projects.map((proj, i) => {
          // each card will animate differently based on index
          const start = i * 0.2;
          const end = start + 0.5;

          const y = useTransform(scrollYProgress, [start, end], [200, 0]);
          const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);
          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

          return (
            <motion.div
              key={i}
              style={{ y, scale, opacity, zIndex: projects.length - i }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl bg-gradient-to-b from-[#0b1425] to-[#0a0f1a] rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-8"
            >
              {/* Left Content */}
              <div className="flex-1 text-left space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  {proj.title}
                </h3>
                <p className="text-gray-400">{proj.description}</p>
                <div className="flex gap-10 pt-4">
                  {proj.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-3xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs uppercase text-gray-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="relative w-full md:w-80 h-56 md:h-64 rounded-xl overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <button className="px-6 py-3 bg-sky-400 text-black rounded-xl font-semibold hover:bg-sky-300 transition">
          All Projects ↗
        </button>
      </div>
    </section>
  );
}

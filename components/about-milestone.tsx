// components/MilestonesDynamic.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/section";

const milestonesData = [
  {
    year: "2018",
    title: "The Genesis: College Dreams",
    description:
      "It all began with a shared vision among college friends in Nagpur. Late nights fueled by passion, we laid the groundwork for Shaibya Solutions, driven by the belief that technology could solve real-world problems.",
    image: "/images/milestone0.jpg", // Placeholder - Add this image to your public/images folder
  },
  {
    year: "2020",
    title: "First Steps & Early Victories",
    description:
      "Our first small office, a handful of dedicated developers, and an unwavering commitment to quality. We landed our first major project, a turning point that validated our approach and fueled our growth.",
    image: "/images/milestone1.jpg", // Placeholder
  },
  {
    year: "2021",
    title: "Expanding Horizons: Noida & AI Integration",
    description:
      "Recognizing the vast potential, we expanded our footprint to Noida, a hub of innovation. This year marked our deep dive into AI and automation, building intelligent solutions that began to redefine industries.",
    image: "/images/milestone2.jpg", // Placeholder
  },
  {
    year: "2023",
    title: "Crossing Borders: The USA Chapter",
    description:
      "A pivotal year as we established our presence in the USA. This brought us closer to global clients, enabling us to deliver cutting-edge solutions across continents and adapt to diverse market needs.",
    image: "/images/milestone3.jpg", // Placeholder
  },
  {
    year: "2025+",
    title: "Future Forward: Pioneering Tomorrow",
    description:
      "From our roots in Nagpur to a global technology powerhouse, we continue to innovate. Our focus is on shaping the future with immersive 3D/AR experiences, advanced AI, and robust cybersecurity solutions.",
    image: "/images/milestone4.webp", // Placeholder
  },
];

export function MilestonesDynamicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scrollRanges = milestonesData.map((_, i) => [
    i / milestonesData.length,
    (i + 1) / milestonesData.length,
  ]);

  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div className="bg-slate-950 py-20 lg:py-40 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 lg:mb-24 sticky top-20 z-10">
          Our Journey: A Story of Growth
        </h2>
      </div>

      <div ref={containerRef} className="relative h-[300vh] lg:h-[400vh]">
        {/* Sticky Container for the Image and Text Card */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <motion.div
            style={{ y: translateY }}
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-end lg:justify-center items-center"
          >
            {milestonesData.map((milestone, index) => {
              const opacity = useTransform(
                scrollYProgress,
                [
                  (index - 0.5) / milestonesData.length,
                  index / milestonesData.length,
                  (index + 0.5) / milestonesData.length,
                ],
                [0, 1, 0]
              );
              const scale = useTransform(
                scrollYProgress,
                [
                  (index - 0.5) / milestonesData.length,
                  index / milestonesData.length,
                  (index + 0.5) / milestonesData.length,
                ],
                [0.8, 1, 0.8]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, scale }}
                  className="absolute w-full h-full flex flex-col lg:flex-row items-center justify-center"
                >
                  {/* Image */}
                  <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full p-4 lg:p-12">
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      priority={index === 0}
                      className="rounded-3xl object-cover shadow-2xl border-2 border-cyan-400/50"
                    />
                  </div>
                  {/* Card */}
                  <div className="w-full lg:w-1/2 p-6 lg:p-12">
                    <motion.div
                      className="bg-slate-800/70 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 shadow-xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-sm uppercase tracking-wider font-semibold text-cyan-400 mb-2">
                        {milestone.year}
                      </p>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-lg text-slate-300">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

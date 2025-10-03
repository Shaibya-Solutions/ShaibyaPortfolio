"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data";
import styled from "styled-components";
import Image from "next/image";

export default function StackCaseStudies() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Create scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Subscribe to scroll progress
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map scroll progress (0 → 1) to card index
      const activeIndex = Math.floor(latest * projects.length);
      setIndex(Math.min(activeIndex, projects.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <StyledComponent ref={containerRef}>
      <section className='relative my-8 md:h-[400vh] bg-black text-white'>
        <div className='md:sticky top-0 pt-4 min-h-screen flex flex-col items-center justify-center'>
          <div className='w-full max-w-6xl mx-auto text-center'>
            <h2 className='text-4xl mb-10'>
              Our <span className='font-bold'>Projects</span>
            </h2>

            <div className='hidden md:block stack-cards relative mt-20 h-[430px]'>
              {/* Show stacked back layers depending on index */}
              {index > 0 && (
                <motion.div
                  className='stack-cards-back-one'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: scrollYProgress ? 1 : 0,
                    y: scrollYProgress ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
              {index > 1 && (
                <motion.div
                  className='stack-cards-back-two'
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: scrollYProgress ? 1 : 0,
                    y: scrollYProgress ? 0 : 40,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                />
              )}

              {projects.map((project, i) => {
                // Slice of scroll for each card
                const start = i / projects.length;
                const end = (i + 1) / projects.length;

                const y = useTransform(scrollYProgress, [start, end], [100, 0]);
                const opacity = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0, 1]
                );
                const scale = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0.9, 1]
                );

                return (
                  <motion.div
                    key={project.title}
                    style={{ y, opacity, scale }}
                    className='absolute inset-0 bg-gradient-to-b from-[#060a35] to-black border-2 border-[#0a1054] rounded-3xl shadow-lg p-12 flex flex-col gap-4 justify-between items-start'
                  >
                    <h3 className='text-3xl max-w-lg text-start font-semibold'>
                      {project.title}
                    </h3>
                    <p className='mt-2 text-sm max-w-lg text-start font-extralight'>
                      {project.description}
                    </p>
                    <div className='mt-4 flex gap-6 items-center'>
                      {project.stats.map((stat, i) => (
                        <div
                          key={i}
                          className='flex gap-1 flex-col items-start justify-between'
                        >
                          <span className='font-semibold text-4xl'>
                            {stat.value}
                          </span>
                          <span className='text-gray-400 text-sm'>
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className='flex flex-col gap-8 md:hidden mt-20 w-full items-center'>
              {projects.map((project, i) => (
                <div
                  key={i}
                  className='w-full flex gap-8 flex-col border-2 min-h-[200px] text-start px-8 py-4'
                >
                  <h3 className='mt-4 text-3xl font-semibold'>
                    {project.title}
                  </h3>
                  <p className='mt-1 text-lg text-slate-300'>
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
  .stack-cards-back-one {
    position: absolute;
    top: -20px;
    left: 20px;
    width: 95%;
    height: 100%;
    border: 2px solid #0a1054;
    background: #060a35;
    border-radius: 20px;
    z-index: -1;
  }
  .stack-cards-back-two {
    position: absolute;
    top: -40px;
    left: 40px;
    width: 90%;
    height: 100%;
    background: #060a35;
    border: 2px solid #0a1054;
    border-radius: 20px;
    z-index: -2;
  }
`;

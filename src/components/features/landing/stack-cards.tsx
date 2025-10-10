"use client";
import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data";
// import styled from "styled-components";
import Image from "next/image";
import CardSwap from "@/components/CardSwap";
// import Squares from "@/components/Squares";

export default function StackCaseStudies() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className='relative mt-8 mb-24 bg-black text-white'
    >
      {/* <Squares direction='diagonal' className='absolute inset-0' /> */}
      <div className='pt-8 min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full relative '>
          <div className='relative h-[520px]'>
            <h2 className='text-4xl my-10 max-w-6xl mx-auto'>
              Our <span className='font-bold'>Projects</span>
            </h2>
            <CardSwap
              onCardClick={undefined}
              easing='elastic'
              pauseOnHover={true}
              delay={3000}
              width={560}
              height={480}
            >
              {projects.map((project, i) => {
                // // Slice of scroll for each card
                // const start = i / projects.length;
                // const end = (i + 1) / projects.length;

                // const y = useTransform(scrollYProgress, [start, end], [70, 0]);
                // const opacity = useTransform(
                //   scrollYProgress,
                //   [start, end],
                //   [0, 1]
                // );
                // const scale = useTransform(
                //   scrollYProgress,
                //   [start, end],
                //   [0.9, 1]
                // );

                return (
                  <div
                    key={project.title}
                    className='absolute inset-0 bg-gradient-to-b from-[#060a35] to-black border-2 border-[#0a1054] rounded-3xl shadow-lg p-12 flex flex-col gap-4 justify-between items-start'
                  >
                    <h3 className='text-3xl max-w-lg text-start font-semibold'>
                      {project.title}
                    </h3>
                    <p className='mt-2 text-sm max-w-lg text-start font-extralight'>
                      {project.description}
                    </p>
                    <div className='mt-4 flex gap-6 flex-wrap items-center'>
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
                  </div>
                );
              })}
            </CardSwap>
          </div>

          {/* <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
            className='mt-0 w-full'
          >
            <CardSwap easing="elastic" onCardClick={undefined} pauseOnHover={true} delay={3000}>
              {projects.map((project, i) => (
                <Image
                  key={i}
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  priority={i === 0}
                  quality={100}
                  className='absolute inset-0 top-10 w-full h-full object-cover rounded-3xl'
                />
              ))}
            </CardSwap>
          </motion.div> */}

          {/* <div className='flex flex-col gap-8 mt-20 w-full items-center'>
            {projects.map((project, i) => (
              <div
                key={i}
                className='w-full flex gap-8 flex-col border-2 min-h-[200px] text-start px-8 py-4'
              >
                <h3 className='mt-4 text-3xl font-semibold'>{project.title}</h3>
                <p className='mt-1 text-lg text-slate-300'>
                  {project.description}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

// const StyledComponent = styled.div`
//   .stack-cards-back-one {
//     position: absolute;
//     top: -20px;
//     left: 20px;
//     width: 95%;
//     height: 100%;
//     border: 2px solid #0a1054;
//     background: #060a35;
//     border-radius: 20px;
//     z-index: -1;
//   }
//   .stack-cards-back-two {
//     position: absolute;
//     top: -40px;
//     left: 40px;
//     width: 90%;
//     height: 100%;
//     background: #060a35;
//     border: 2px solid #0a1054;
//     border-radius: 20px;
//     z-index: -2;
//   }
// `;

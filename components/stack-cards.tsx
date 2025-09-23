"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data";
import styled from "styled-components";

export default function StackCaseStudies() {
  const [cards, setCards] = useState(projects);

  const handleCardClick = () => {
    // Move first card to the end (rotate stack)
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <StyledComponent>
      <section className='h-[100vh] relative flex flex-col items-center justify-center'>
        <div className='w-full max-w-5xl mx-auto text-center'>
          <h2 className='text-4xl mb-30'>
            Our <span className='font-bold'>Case Studies</span>
          </h2>

          <div className='stack-cards relative h-[400px]'>
            <AnimatePresence>
              {cards.map((project, index) => {
                const isTop = index === 0;
                return (
                  <motion.div
                    key={project.title}
                    onClick={isTop ? handleCardClick : undefined}
                    className='absolute z-10 inset-0 bg-gradient-to-b from-[#060a35] to-black border-2 border-[#0a1054] rounded-3xl shadow-lg p-12 cursor-pointer flex flex-col justify-between items-start'
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{
                      y: index * -10,
                      opacity: 1,
                      scale: 1 - index * 0.05,
                      zIndex: cards.length - index,
                    }}
                    exit={{ y: -100, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className='text-3xl max-w-md text-start font-semibold'>{project.title}</h3>
                    <p className='mt-2 text-sm max-w-md text-start font-extralight'>{project.description}</p>
                    <div className='mt-4 flex gap-4 items-center justify-between'>
                      {project.stats.map((stat, i) => (
                        <div key={i} className='flex gap-2 flex-col items-start justify-between'>
                          <span className='font-semibold text-4xl'>{stat.value}</span>
                          <span className='text-gray-500 text-sm'>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    {isTop && (
                      <p className='mt-4 text-sm text-gray-400'>
                        (Click card to see next)
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
  .stack-cards::after {
    content: "";
    position: absolute;
    top: -20px;
    left: 20px;
    width: 95%;
    height: 100%;
    border: 2px solid #0a1054;
    background: #060a35;
    border-radius: 20px;
    z-index: 2;
  }
  .stack-cards::before {
    content: "";
    position: absolute;
    top: -40px;
    left: 40px;
    width: 90%;
    height: 100%;
    background: #060a35;
    border: 2px solid #0a1054;
    border-radius: 20px;
    z-index: 2;
  }
`;

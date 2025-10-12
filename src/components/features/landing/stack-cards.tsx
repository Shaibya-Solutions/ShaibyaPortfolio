"use client";
import { useRef } from "react";
import { projects } from "@/data";
import CardSwap from "@/components/CardSwap";

export default function StackCaseStudies() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className='relative mb-16 sm:mb-32 bg-black text-white px-4 overflow-hidden'
    >
      <div className='pt-6 sm:pt-0 min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full relative max-w-8xl mx-auto'>
          {/* Desktop View */}
          <div className='hidden lg:block relative h-[580px] xl:h-[560px]'>
            <h2 className='text-3xl sm:text-4xl max-w-6xl mx-auto text-center lg:text-start'>
              Our <span className='font-bold'>Projects</span>
            </h2>
            <CardSwap
              onCardClick={undefined}
              easing='elastic'
              pauseOnHover={true}
              delay={3000}
              width={590}
              height={480}
            >
              {projects.map((project, i) => {
                return (
                  <div
                    key={project.title}
                    className='absolute top-45 inset-0 bg-gradient-to-b from-[#060a35] to-black border-2 border-[#0a1054] rounded-3xl shadow-lg p-12 flex flex-col gap-4 justify-between items-start'
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

          {/* Mobile View */}
          <div className='lg:hidden flex flex-col p-2 sm:p-8 gap-6 mt-8 w-full'>
            <h2 className='text-2xl sm:text-3xl font-bold text-center mb-4'>
              Our Projects
            </h2>
            {projects.map((project, i) => (
              <div
                key={i}
                className='w-full flex flex-col gap-8 bg-gradient-to-b from-[#060a35] to-black border-2 border-[#0a1054] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg'
              >
                <h3 className='text-xl font-semibold text-white'>
                  {project.title}
                </h3>
                <p className='text-sm text-slate-300 leading-relaxed'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-4 mt-2'>
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className='flex flex-col'>
                      <span className='text-2xl font-bold text-white'>
                        {stat.value}
                      </span>
                      <span className='text-sm text-gray-400'>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

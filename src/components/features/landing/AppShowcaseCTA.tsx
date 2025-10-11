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
    <Section
      ref={ref}
      className='relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-32 rounded-b-3xl shadow-2xl px-4'
    >
      {/* Background Grid/Pattern */}
      <div className='absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5'></div>

      <div className='flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 max-w-7xl mx-auto relative z-10'>
        {/* Left Section: Text and Buttons */}
        <div className='w-full lg:w-1/2 text-center lg:text-left'>
          <motion.h2
            variants={textVariants}
            initial='hidden'
            animate={isInView ? "visible" : "hidden"}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight'
          >
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400'>
              Let's Build Your First App!
            </span>
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='text-base sm:text-lg text-slate-300 mb-6 sm:mb-10 max-w-prose mx-auto lg:mx-0'
          >
            If you're looking to create an innovative app for your startup, book
            a free consultation today. Let's design and develop your vision
            together, turning concepts into compelling digital experiences.
          </motion.p>

          <motion.div
            initial='hidden'
            animate={isInView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.2, delay: 0.4 }}
            className='flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-5'
          >
            <motion.div variants={buttonVariants} className='w-full sm:w-auto'>
              <Link
                href='https://wa.me/YOUR_WHATSAPP_NUMBER'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg shadow-md hover:bg-[#1DA851] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base'
              >
                <FaWhatsapp size={20} className='sm:w-6 sm:h-6' />
                <span className='whitespace-nowrap'>Message on WhatsApp</span>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} className='w-full sm:w-auto'>
              <Link
                href='https://instagram.com/YOUR_INSTAGRAM_HANDLE'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 bg-[#E1306C] text-white font-bold rounded-lg shadow-md hover:bg-[#B72354] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base'
              >
                <FaInstagram size={20} className='sm:w-6 sm:h-6' />
                <span className='whitespace-nowrap'>Message on Instagram</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Section: Mobile App Showcase - Hidden on mobile, visible on lg+ */}
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
          className='hidden lg:flex w-full lg:w-1/2 justify-center relative h-[400px] md:h-[500px] lg:h-[600px]'
        >
          {/* Main (Center) Phone */}
          <motion.div
            className='absolute h-full w-auto z-20'
            style={{ x: 0, y: 0, rotateZ: 0 }}
          >
            <Image
              src='/images/landing/mobile3.png'
              alt='Main App Screenshot'
              width={300}
              height={600}
              className='rounded-[3rem] shadow-2xl border-4 border-gray-700'
            />
          </motion.div>

          {/* Left Phone */}
          <motion.div
            className='absolute h-[85%] w-auto z-10'
            style={{ x: "-60%", y: "10%", rotateZ: -10 }}
          >
            <Image
              src='/images/landing/mobile1.png'
              alt='App Screenshot 2'
              width={250}
              height={500}
              className='rounded-[2.5rem] shadow-xl border-4 border-gray-800 opacity-80'
            />
          </motion.div>

          {/* Right Phone */}
          <motion.div
            className='absolute h-[85%] w-auto z-10'
            style={{ x: "60%", y: "10%", rotateZ: 10 }}
          >
            <Image
              src='/images/landing/mobile2.png'
              alt='App Screenshot 3'
              width={250}
              height={500}
              className='rounded-[2.5rem] shadow-xl border-4 border-gray-800 opacity-80'
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

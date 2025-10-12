"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { FeatureCard } from "@/components/ui/feature-card";
import { AppShowcaseCTA } from "@/components/features/landing/AppShowcaseCTA";

import StackCaseStudies from "@/components/features/landing/stack-cards";
import Testimonials from "@/components/ui/testimonials";
import VideoSection from "@/components/features/landing/video-section";
import { motion } from "framer-motion";
import Threads from "@/components/Threads";
import { useEffect, useRef, useState } from "react";
import FooterCTA from "@/components/layout/footer/footer-cta";

export default function HomePage() {
  const [isHeroInView, setIsHeroInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeroInView(true);
          } else {
            setIsHeroInView(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <main className='bg-slate-950 text-slate-100 scroll-smooth'>
      <SiteHeader />
      {/* Hero Section - Made Responsive */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <section className='relative w-full h-[500px] sm:h-[600px] mt-6 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:gap-8 px-4'>
          {/* Threads background only renders when hero is in view */}
          {isHeroInView && (
            <Threads
              className='absolute inset-0'
              color={[1, 1, 1]}
              distance={0.1}
              amplitude={1.4}
              enableMouseInteraction={true}
            />
          )}

          <div className='relative z-10 flex flex-col items-center justify-center text-center px-4'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-t from-white to-[var(--secondary)] bg-clip-text text-transparent'>
              Ahead of the Curve,
              <br /> Always
            </h1>
            <p className='mt-3 sm:mt-4 max-w-[90%] sm:max-w-prose md:max-w-3xl text-sm sm:text-base text-slate-300'>
              We craft AI-powered platforms, robust full-stack web apps, and
              polished desktop/mobile experiences.
            </p>
          </div>

          {/* This div creates the blur effect behind the hero text */}
          <div className='relative z-10 hidden max-w-7xl md:block'>
            <div className='absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-2xl' />
          </div>
        </section>
      </motion.div>

      {/* What we offer section - Made Responsive */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Section className='mt-8 sm:mt-14 border-2 border-gray-800 rounded-3xl p-6 sm:p-10 lg:p-16 shadow-lg shadow-black/20 bg-gradient-to-b from-slate-900/50 to-slate-900/30 backdrop-blur'>
          <div className='mb-8 sm:mb-12 text-center'>
            <h2 className='text-2xl sm:text-4xl font-semibold text-white'>
              What We Offer
            </h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='sm:row-span-2'
            >
              <FeatureCard
                title='Artificial Intelligence'
                desc='ML models, analytics, and intelligent automation.'
                image='/images/landing/ai-solution.webp'
                href='/services/ai'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureCard
                title='Full-stack Web'
                desc='Scalable APIs, realtime, and delightful UX.'
                href='/services/web'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='sm:row-span-2'
            >
              <FeatureCard
                title='Desktop & Mobile'
                desc='Cross-platform apps, native performance.'
                image='/images/landing/customer-exp.jpg'
                href='/services/mobile'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureCard
                title='Custom R&D'
                desc='Rapid prototyping and PoC to production.'
                href='/services/rd'
              />
            </motion.div>
          </div>
        </Section>
      </motion.section>
      
      <VideoSection />
      <StackCaseStudies />
      <Testimonials />
      <AppShowcaseCTA />
      <FooterCTA />
      <SiteFooter />
    </main>
  );
}

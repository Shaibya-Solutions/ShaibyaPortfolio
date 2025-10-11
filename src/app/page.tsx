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
          // Only activate animation when hero enters viewport
          if (entry.isIntersecting) {
            setIsHeroInView(true);
          } else {
            // Deactivate when out of view to save resources
            setIsHeroInView(false);
          }
        });
      },
      {
        // Trigger when 20% of the hero is visible
        threshold: 0.2,
        // Add margin to trigger slightly before entering viewport
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
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <section className='relative w-full h-[600px] mt-10 flex flex-col items-center justify-center gap-8 '>
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

          <div className='relative z-10 flex flex-col items-center justify-center text-center'>
            <h1 className='text-4xl font-bold leading-tight bg-gradient-to-t from-white to-[var(--secondary)] bg-clip-text text-transparent md:text-7xl lg:text-8xl'>
              Ahead of the Curve,
              <br /> Always
            </h1>
            <p className='mt-4 max-w-prose text-slate-300 max-w-3xl'>
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

      {/* What we offer section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Section className='mt-14 max-w-7xl'>
          <div className='mb-12 text-center'>
            <h2 className='text-4xl font-semibold text-white'>What We Offer</h2>
          </div>
          <div className='sm:mx-20 md:mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-2 justify-center gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='row-span-2'
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
              className='row-span-2'
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

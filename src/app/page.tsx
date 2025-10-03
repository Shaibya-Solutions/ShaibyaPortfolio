"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { FeatureCard } from "@/components/ui/feature-card";
import { ServiceCard } from "@/components/ui/service-card";
import { AppShowcaseCTA } from "@/components/features/landing/AppShowcaseCTA"; // Import the new component

// import { ThemeToggle } from "@/components/theme-toggle";
// import AnimatedBackground from "@/components/animated-background";
import FeedBackForm from "@/components/ui/feedback-form";
import StackCaseStudies from "@/components/features/landing/stack-cards";
import Testimonials from "@/components/ui/testimonials";
import VideoSection from "@/components/features/landing/video-section";
import AboutSection from "@/components/features/landing/about-section";
// import { FaBrain, FaCubes, FaMobileAlt, FaFlask } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
// import ContactSection from "@/components/contact-section";
// import { useEffect } from "react";
// import { trustedCompanies } from "@/data";
// import Lenis from "@studio-freight/lenis";
import dynamic from "next/dynamic";

// Use dynamic import for client-side rendering
const ModelViewer = dynamic(
  () => import("../components/features/landing/3dmodel-hero"),
  {
    ssr: false, // This ensures it's only rendered on the client side
  }
);

export default function HomePage() {
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2, // speed
  //     easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out quart
  //     smoothWheel: true,
  //   });

  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => lenis.destroy();
  // }, []);

  return (
    <main className='bg-slate-950 text-slate-100 scroll-smooth'>
      <SiteHeader />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Section className='relative mt-10 flex flex-col items-center justify-center gap-8 '>
          {/* <div className='absolute inset-0 -z-10 overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-b from-white/5 to-transparent'>
            <AnimatedBackground />
            <div
              className='pointer-events-none absolute -inset-8 -z-10 opacity-60 blur-3xl'
              style={{
                background:
                  "radial-gradient(600px 200px at 10% -10%, hsla(182,100%,50%,0.10), transparent)",
              }}
            />
          </div> */}

          <div className='flex flex-col justify-center'>
            {/* <div className='mb-4 inline-flex items-center gap-3'>
              <span className='rounded bg-cyan-500/20 px-2 py-1 text-xs font-medium text-cyan-300'>
                Shaibya Solutions
              </span>
              <ThemeToggle />
            </div> */}
            <h1 className='text-4xl font-bold leading-tight bg-gradient-to-t from-white to-[var(--secondary)] bg-clip-text text-transparent md:text-7xl lg:text-8xl'>
              Ahead of the Curve,
              <br /> Always
            </h1>
            <p className='mt-4 max-w-prose text-slate-300'>
              We craft AI-powered platforms, robust full-stack web apps, and
              polished desktop/mobile experiences.
            </p>
            {/* <div className='mt-6 flex gap-3'>
              <a
                href='#contact'
                className='rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-cyan-400'
              >
                Get in Touch
              </a>
              <a
                href='/services'
                className='rounded-full border border-slate-800 px-5 py-2.5 text-sm text-slate-200 hover:border-cyan-600/40'
              >
                Explore Services
              </a>
              <div className='grid max-w-xl grid-cols-3 gap-3 text-center'>
                {[
                  { k: "10x", v: "Faster Delivery" },
                  { k: "100TB", v: "Data Processed" },
                  { k: "300%", v: "ROI on Pilots" },
                ].map((s) => (
                  <motion.div
                    key={s.k}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className='rounded-xl border border-border/60 bg-white/5 px-4 py-3'
                  >
                    <div className='font-heading text-lg text-white'>{s.k}</div>
                    <div className='text-xs text-slate-300'>{s.v}</div>
                  </motion.div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Hero graphic placeholder with layered cards */}
          <div className='relative hidden md:block max-w-7xl'>
            <div className='absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-2xl' />
            {/* <motion.div
              initial={{ opacity: 0, y: 16, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60'
            >
              <Image
                alt='Futuristic dashboard'
                className='h-full w-full object-cover'
                src='/futuristic-ai-dashboard.png'
                width={800}
                height={600}
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='absolute -bottom-6 right-3 w-2/3 rounded-xl border border-border/60 bg-background/70 p-4 backdrop-blur'
            >
              <div className='text-xs text-slate-300'>Automation</div>
              <div className='font-heading'>Operational Intelligence</div>
            </motion.div> */}
          </div>
        </Section>
      </motion.div>
      {/* What we offer section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Section className='mt-14'>
          <div className='mb-12 text-center'>
            <h2 className='text-4xl font-semibold text-white'>What We Offer</h2>
            {/* <p className='text-sm text-slate-400'>
              Focused capabilities that deliver results.
            </p> */}
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
                image='/ai-solution.webp'
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
                image='/customer-exp.jpg'
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
              />
            </motion.div>
          </div>
        </Section>
      </motion.section>
      {/* Video Section with Animation */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <VideoSection />
      </motion.section>
      {/* Worldwide Projects Section - Adapted
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='py-16 px-6 md:px-12 lg:px-20 bg-slate-950'
      >
        <div className='max-w-6xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='relative mb-12'
          >
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-4 inline-block'>
              8000+ Finished
            </h2>
            <h3 className='text-4xl md:text-5xl font-bold text-white'>
              Projects Worldwide
            </h3>
            <Image
              src='/worldmap.png' // Assume this image is placed in public folder
              alt='World Map with Project Locations'
              width={900}
              height={600}
              className='mt-8 rounded-2xl shadow-lg mx-auto'
              priority={false} // Not priority for performance
            />
            <p className='text-slate-400 mt-6 max-w-2xl mx-auto'>
              As a global AI and software development company, our seasoned team
              has successfully executed projects across diverse cultural
              backdrops, leveraging their cultural proficiency for effective
              client collaborations.
            </p>
            <div className='mt-8 text-sm text-slate-400 space-y-2'>
              <p>
                New York, Washington, Chicago, US | Toronto, Vancouver, Canada |
                London, Manchester, Liverpool, Leeds, UK | Melbourne, Sydney,
                Australia | Dubai, Abu Dhabi, UAE | Stockholm, Sweden | Rome,
                Milan, Turin, Italy | Kolkata, Chennai, Mumbai, Bangalore,
                Delhi, India | Singapore | Munich, Leipzig, Berlin, Germany |
                Tokyo, Japan
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section> */}
      {/* Trusted By Section - Adapted to AI/Software Theme */}
      {/* <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='py-16 px-6 md:px-12 lg:px-20 bg-slate-950'
      >
        <div className='max-w-6xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Trusted By
          </h2>
          <p className='text-slate-400 mb-12'>
            Over 800+ companies of all sizes
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12'>
            {trustedCompanies.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className='flex items-center justify-center p-4 bg-gray-800/5 rounded-lg'
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={100}
                  className='h-30 w-30 object-contain grayscale hover:grayscale-0 transition'
                />
              </motion.div>
            ))}
          </div>
          {/* Testimonials */}
      {/* <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10'
            >
              <p className='text-slate-300 mb-4'>
                Really prompt service and adept team. Looking forward to a lot
                more association. Thanks Vijay, Nisar & Rakesh!
              </p>
              <div className='flex items-center gap-2 mb-2'>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className='text-yellow-400'>
                    ★
                  </span>
                ))}
              </div>
              <div className='text-right'>
                <p className='font-semibold text-white'>Anirudh Vasudevan</p>
                <p className='text-sm text-slate-400'>
                  Project Engineer @ Wipro
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10'
            >
              <p className='text-slate-300 mb-4'>
                From the initial stages of understanding our project
                requirements to delivering the final outcomes, the team
                consistently demonstrated openness, approachability, and good
                support.
              </p>
              <div className='flex items-center gap-2 mb-2'>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className='text-yellow-400'>
                    ★
                  </span>
                ))}
              </div>
              <div className='text-right'>
                <p className='font-semibold text-white'>Edwin B</p>
                <p className='text-sm text-slate-400'>
                  Senior System Engineer @ Siemens Healthineers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section> */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AboutSection />
      </motion.section>
      {/* Stack cards section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <StackCaseStudies />
      </motion.section>
      {/* Testimonial section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Testimonials />
      </motion.section>
      {/* Feedback Form section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FeedBackForm />
      </motion.section>
      {/* <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ContactSection />
      </motion.section> */}
      <AppShowcaseCTA /> {/* Place the new component here */}
      <SiteFooter />
    </main>
  );
}

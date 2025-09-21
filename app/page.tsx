"use client";

import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FeatureCard } from "@/components/feature-card";
import { ServiceCard } from "@/components/service-card";
// import { ThemeToggle } from "@/components/theme-toggle";
import AnimatedBackground from "@/components/animated-background";
import FeedBackForm from "@/components/ui/feedback-form";
import StackCaseStudies from "@/components/stack-cards";
import { FaBrain, FaCubes, FaMobileAlt, FaFlask } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className='bg-slate-950 text-slate-100'>
      <SiteHeader />

      <Section className='relative mt-10 flex flex-col items-center justify-center gap-8 '>
        <div className='absolute inset-0 -z-10 overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-b from-white/5 to-transparent'>
          <AnimatedBackground />
          <div
            className='pointer-events-none absolute -inset-8 -z-10 opacity-60 blur-3xl'
            style={{
              background:
                "radial-gradient(600px 200px at 10% -10%, hsla(182,100%,50%,0.10), transparent)",
            }}
          />
        </div>

        <div className='flex flex-col justify-center'>
          {/* <div className='mb-4 inline-flex items-center gap-3'>
            <span className='rounded bg-cyan-500/20 px-2 py-1 text-xs font-medium text-cyan-300'>
              Shaibya Solutions
            </span>
            <ThemeToggle />
          </div> */}
          <h1 className='text-4xl font-bold leading-tight bg-gradient-to-t from-white to-[var(--secondary)] bg-clip-text text-transparent md:text-8xl'>
            Building Intelligent Software for the Future
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
        <div className='relative hidden md:block max-w-xl'>
          <div className='absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-2xl' />
          <motion.div
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
          </motion.div>
        </div>
      </Section>

      <Section className='mt-14'>
        <div className='mb-12 text-center'>
          <h2 className='text-4xl font-semibold text-white'>What We Offer</h2>
          {/* <p className='text-sm text-slate-400'>
            Focused capabilities that deliver results.
          </p> */}
        </div>
        <div className='grid grid-cols-3 grid-rows-2 justify-center gap-6'>
          <FeatureCard
            title='Artificial Intelligence'
            desc='ML models, analytics, and intelligent automation.'
            image='/ai-solution.webp'
            className='row-span-2'
          />
          <FeatureCard
            title='Full-stack Web'
            desc='Scalable APIs, realtime, and delightful UX.'
          />
          <FeatureCard
            title='Desktop & Mobile'
            desc='Cross-platform apps, native performance.'
            image='/customer-exp.jpg'
            className='row-span-2'
          />
          <FeatureCard
            title='Custom R&D'
            desc='Rapid prototyping and PoC to production.'
          />
        </div>
      </Section>

      <Section className='mt-16'>
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-semibold text-white'>
            Popular Services
          </h2>
        </div>
        <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-4'>
          <ServiceCard
            href='/services/ai'
            title='AI Solutions'
            desc='From data to decisions with production ML.'
            icon={<FaBrain />}
          />
          <ServiceCard
            href='/services/full-stack'
            title='Full‑stack Development'
            desc='Modern web apps and APIs.'
            icon={<FaCubes />}
          />
          <ServiceCard
            href='/services/apps'
            title='Desktop/Mobile'
            desc='Cross‑platform applications that shine.'
            icon={<FaMobileAlt />}
          />
          <ServiceCard
            href='/services/rd'
            title='Custom R&D'
            desc='Research, prototypes, and innovation.'
            icon={<FaFlask />}
          />
        </div>
      </Section>

      <StackCaseStudies />

      <FeedBackForm />

      <Section className='mt-16'>
        <div className='relative overflow-hidden rounded-2xl border border-border/60 p-8 text-center'>
          <div className='pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 blur-2xl' />
          <h3 className='font-heading text-2xl'>Join the AI Revolution</h3>
          <p className='mx-auto mt-2 max-w-2xl text-slate-300'>
            Partner with us to design and ship intelligent products that scale
            with your business.
          </p>
          <a
            href='#contact'
            className='mt-5 inline-block rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-cyan-400'
          >
            Speak to an Expert
          </a>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

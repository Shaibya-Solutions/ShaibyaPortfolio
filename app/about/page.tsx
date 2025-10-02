"use client";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className='bg-slate-950 text-slate-100'>
      <SiteHeader />
      <Section className='mt-10'>
        <h1 className='text-3xl font-semibold text-white'>
          About Shaibya Solutions
        </h1>
        <p className='mt-3 max-w-prose text-slate-300'>
          We are a technology company focused on AI, full‑stack development, and
          multi‑platform apps. Our mission is to craft intelligent software
          that’s reliable, accessible, and delightful.
        </p>
      </Section>

      <Section className='mt-10 grid gap-8 md:grid-cols-2'>
        <div>
          <h2 className='text-xl font-semibold text-white'>Who we are</h2>
          <p className='mt-2 text-sm text-slate-400'>
            A senior team of engineers and designers delivering end‑to‑end
            solutions: discovery to deployment.
          </p>
          <h3 className='mt-6 text-lg font-semibold text-white'>Our mission</h3>
          <p className='text-sm text-slate-400'>
            Accelerate innovation with practical AI and solid software
            craftsmanship.
          </p>
          <h3 className='mt-6 text-lg font-semibold text-white'>Our vision</h3>
          <p className='text-sm text-slate-400'>
            Empower teams to build the future with trustworthy, human‑centered
            technology.
          </p>
          <h3 className='mt-6 text-lg font-semibold text-white'>
            Why choose us
          </h3>
          <ul className='mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400'>
            <li>Outcome‑driven delivery</li>
            <li>Transparent communication</li>
            <li>Accessible, inclusive design</li>
          </ul>
        </div>

        {/* Adapted Services Section - AI Development House in India */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='py-16 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-slate-950 to-slate-900'
        >
          <div className='max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='text-center mb-16'
            >
              <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                AI Development House in India
              </h1>
              <p className='text-xl text-slate-300 max-w-3xl mx-auto'>
                We offer services to meet the diverse needs of businesses across
                industries. As a leading AI Development House in India, we
                handle conceptualization, model training, integration,
                deployment for AI platforms, digital solutions, and more,
                ensuring your brand message effectively reaches and engages your
                target audience.
              </p>
            </motion.div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='bg-white/5 rounded-2xl p-6 border border-white/10 text-center'
              >
                <div className='w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>📺</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  Enterprise AI
                </h3>
                <p className='text-slate-400'>
                  Our enterprise AI integrates creativity, strategic planning,
                  and production expertise, aiming to imprint a lasting impact
                  on users and forge a compelling brand presence.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='bg-white/5 rounded-2xl p-6 border border-white/10 text-center'
              >
                <div className='w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>📱</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  Social AI Tools
                </h3>
                <p className='text-slate-400'>
                  Break down the idea behind your product, or help customers
                  understand how to derive maximum value from our simple,
                  accurate, and insightful AI tools across various social
                  platforms.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='bg-white/5 rounded-2xl p-6 border border-white/10 text-center'
              >
                <div className='w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>🎬</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  Prototyping AI
                </h3>
                <p className='text-slate-400'>
                  Our prototyping AI service is the perfect solution for
                  businesses looking to reach a wide audience engagingly. We put
                  all our experience and skill to create a unique AI that
                  elevates your brand.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='bg-white/5 rounded-2xl p-6 border border-white/10 text-center'
              >
                <div className='w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>🎥</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  Custom AI Models
                </h3>
                <p className='text-slate-400'>
                  We deliver compelling and creative custom AI models that
                  captivate audiences, delivering your message with precision
                  and impact across various platforms, AWS, Azure, and many
                  more.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='mt-12 text-center'
            >
              <p className='text-slate-400 max-w-2xl mx-auto'>
                With our experienced professionals and state-of-the-art
                equipment, we deliver high-quality AI solutions that grab
                attention and leave a lasting impression. Whether you need a
                promotional video, brand commercial, product advertisement, or
                corporate film, we have the expertise to bring your vision to
                life. Partner with our reputable AI agency in India to make a
                lasting impact in the competitive market, surpassing your
                expectations and goals.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Replaced image with an animated-style graphic panel */}
        <div className='relative overflow-hidden rounded-2xl border border-slate-800/60'>
          <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent' />
          <div className='relative grid gap-4 p-6'>
            <div className='rounded-xl border border-slate-800/60 bg-slate-950/60 p-4'>
              <div className='text-xs text-slate-300'>Approach</div>
              <div className='font-heading'>Discovery → Design → Delivery</div>
            </div>
            <div className='rounded-xl border border-slate-800/60 bg-slate-950/60 p-4'>
              <div className='text-xs text-slate-300'>Why Us</div>
              <div className='font-heading'>
                Senior execution, measurable outcomes
              </div>
            </div>
            <div className='rounded-xl border border-slate-800/60 bg-slate-950/60 p-4'>
              <div className='text-xs text-slate-300'>Vision</div>
              <div className='font-heading'>Human‑centered, AI‑powered</div>
            </div>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

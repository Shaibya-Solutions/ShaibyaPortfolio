"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import { FaHeart, FaHandsHelping, FaLightbulb, FaQuoteLeft } from "react-icons/fa";

import { TEAM_MEMBERS } from "@/data/team";

const timeline = [
  { year: "The Spark", desc: "Watched a gym owner spend 4 hours manually texting members about late payments on a broken Excel sheet. Realized: the tech gap between enterprise and local business is massive. Started writing simple automation scripts." },
  { year: "First Client", desc: "Built a simple WhatsApp booking bot for a local business. Watching them get back 15 hours a week was the validation needed. Word spread — more local businesses started asking for help." },
  { year: "Shaibya Solutions", desc: "Expanded into a full digital solutions agency. Chose to focus deeply on two industries: real estate and fitness. Built CoalTrack AI, FitManage 360, and websites for hospitals and hotels." },
  { year: "Snyppit Moment", desc: "A student walked up with nothing but a plan written on his phone — fashion delivered in minutes, like food delivery but for clothes. We said yes. Built the entire platform in weeks. Snyppit went live." },
  { year: "Today", desc: "14+ collaborators including Bridgestone, Mirragio, and 5 gym brands. Presence in Nagpur, Noida, and Texas. Still obsessed with solving real problems for real businesses." },
];

const values = [
  { icon: FaHandsHelping, title: "Real Impact Over Vanity Metrics", desc: "We don't care about page views. We care about how many hours of manual work we can eliminate for you. Every system we build has measurable ROI." },
  { icon: FaHeart, title: "Empathy-First Engineering", desc: "Technology should adapt to humans, not the other way around. We spend time on your factory floor, in your gym, at your office — before writing a single line of code." },
  { icon: FaLightbulb, title: "We Build With Founders, Not Just For Them", desc: "From Snyppit to Mirragio to local gyms — we don't just take orders. We think with you, challenge assumptions, and build what actually works." },
];

export default function SnyppitClient() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen flex flex-col overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative py-24 lg:py-36 bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[150px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-extrabold mb-6">The Story Behind the Code</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            We didn&apos;t start coding to build the next big social media app. We started because we saw local business owners drowning in manual work that simple technology could eliminate.
          </motion.p>
        </div>
      </section>

      {/* THE ORIGIN — SNYPPIT STORY */}
      <section className="py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <FaQuoteLeft className="text-teal-300 text-3xl" />
              <h2 className="text-3xl font-bold text-slate-900">The Snyppit Story</h2>
            </div>
            <div className="prose prose-lg text-slate-600 prose-p:leading-relaxed max-w-none">
              <p className="text-xl">
                <strong className="text-slate-800">A student walked up to us with nothing but a plan and fire in his eyes.</strong>
              </p>
              <p>
                His idea: fashion delivered in minutes — like food delivery, but for clothes. No tech team, no platform, no funding. Just a vision written on his phone and the conviction that it could work.
              </p>
              <p>
                We said yes.
              </p>
              <p>
                We built the complete platform together — product listing, delivery flow, order management, customer-facing website. <strong>From idea to live in 4 weeks.</strong> The site is live at <a href="https://www.snyypit.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 no-underline font-semibold">snyypit.com</a>.
              </p>
              <p className="text-slate-800 font-medium">
                Why this story matters: We don&apos;t just work for established companies. We build with founders from day zero. It humanizes us. And it attracts the next Snyppit — young founders with big ideas who need a trusted team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-3">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How we got here</h2>
          </motion.div>
          <div className="space-y-0 pl-6 border-l-2 border-teal-200 relative">
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative pb-10 last:pb-0">
                <div className="absolute w-5 h-5 bg-teal-500 rounded-full -left-[23px] top-1 border-4 border-white shadow-sm" />
                <h3 className="font-bold text-slate-900 text-xl mb-2">{item.year}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-white border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-3">What We Believe</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What we care about</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-3 text-lg">{v.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-3">The Team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The people behind Shaibya</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A distributed team across Nagpur, Noida, and Texas — united by the mission to fix how local businesses use technology.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.div key={member.codename} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${member.color}15`, color: member.color }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{member.codename}</h4>
                      <p className="text-xs text-slate-500">{member.dayJob}</p>
                    </div>
                  </div>
                  <p className="text-sm text-teal-600 font-medium mb-2">{member.nightSkill}</p>
                  <p className="text-xs text-slate-500 mb-3">📍 {member.location}</p>
                  <p className="text-sm text-slate-600 italic leading-relaxed">&ldquo;{member.hoverQuote}&rdquo;</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-28 text-center px-4 overflow-hidden border-t border-slate-200">
        <motion.div style={{ y: bgY }} className="absolute inset-0 bg-slate-50">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-4">Have an Idea?</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Have an idea? Let&apos;s build it.</h2>
          <p className="text-slate-600 text-lg mb-10">We don&apos;t just work for established companies — we build with founders from day zero.</p>
          <WhatsAppCTA className="text-lg px-8 py-4" message="Hi, I have an idea I'd like to discuss with Shaibya Solutions." />
        </div>
      </section>

      <Footer />
    </main>
  );
}

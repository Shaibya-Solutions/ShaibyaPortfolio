"use client";

import { useEffect, useState, useMemo } from "react";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Search, 
  Video, 
  Target, 
  Star, 
  Heart,
  MessageCircle,
  Play,
  CheckCircle2,
  Bookmark
} from "lucide-react";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";
import Link from "next/link";

/* ══ PARTICLE GENERATOR FOR CLARITY-IN-CHAOS ════════════════ */
interface Particle {
  id: number;
  chaosX: number;
  chaosY: number;
  circleX: number;
  circleY: number;
  color: string;
  size: number;
}

function ClarityInChaosDots() {
  const [isMounted, setIsMounted] = useState(false);
  const [arranged, setArranged] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initial delay to show dots scattered before arranging
    const timer = setTimeout(() => setArranged(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    if (!isMounted) return [];
    
    const arr: Particle[] = [];
    const count = 130;
    const colors = ["#ec4899", "#0ea5e9", "#facc15", "#f97316", "#a855f7", "#cbd5e1"];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      // Radius with a bit of noise to look like a organic cloud of dots
      const radius = 90 + Math.random() * 45;
      
      arr.push({
        id: i,
        // Chaos coordinates (scattered far and wide)
        chaosX: (Math.random() - 0.5) * 440,
        chaosY: (Math.random() - 0.5) * 440,
        // Order coordinates (arranged in a circle)
        circleX: Math.cos(angle) * radius,
        circleY: Math.sin(angle) * radius,
        color: colors[i % colors.length],
        size: 4 + Math.random() * 6 // sizes from 4px to 10px
      });
    }
    return arr;
  }, [isMounted]);

  if (!isMounted) {
    return <div className="relative w-full h-[400px]" />;
  }

  return (
    <div 
      className="relative w-full h-[400px] flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setArranged(false)}
      onMouseLeave={() => setArranged(true)}
      title="Hover to scatter, leave to arrange"
    >
      {/* Outer rotating frame */}
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        animate={{ rotate: arranged ? 360 : 0 }}
        transition={{
          rotate: {
            duration: 50,
            ease: "linear",
            repeat: Infinity
          }
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            animate={{
              x: arranged ? p.circleX : p.chaosX,
              y: arranged ? p.circleY : p.chaosY,
              scale: arranged ? [1, 1.15, 1] : 1,
            }}
            transition={{
              type: "spring",
              stiffness: arranged ? 45 : 30,
              damping: arranged ? 14 : 9,
              delay: (p.id % 20) * 0.01
            }}
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: arranged ? `0 0 10px ${p.color}40` : "none",
            }}
          />
        ))}

        {/* Center label inside the arranged circle */}
        <AnimatePresence>
          {arranged && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute w-36 h-36 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center flex-col p-2 text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500">Shaibya</span>
              <span className="text-xs text-slate-400 font-light mt-0.5">Marketing Hub</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ══ DEVICE TAB DESCRIPTIONS ════════════════════════════════ */
interface PlatformTab {
  id: string;
  name: string;
  icon: any;
  title: string;
  description: string;
}

const PLATFORMS: PlatformTab[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    title: "Instagram & Social Reels",
    description: "Capturing attention through short-form visual storytelling. We write hooks, design post layouts, and edit custom Reels that drive massive community engagement."
  },
  {
    id: "google",
    name: "Google Business & SEO",
    icon: FaGoogle,
    title: "Local Search Domination",
    description: "Placing your business at the very top of Nagpur's local search results. We optimize Google Maps profiles, generate organic reviews, and structure local content directories."
  },
  {
    id: "ads",
    name: "Paid Ad Campaigns",
    icon: TrendingUp,
    title: "Meta & Google Ads",
    description: "Building custom ad funnels focused purely on ROI. We design visual copy, set up target audience segments, and run conversion-optimized campaigns to capture hot leads."
  },
  {
    id: "video",
    name: "Video Production",
    icon: Video,
    title: "Shooting High-Converting Videos",
    description: "Scripting and producing raw, authentic brand videos. We direct student content creators to showcase your services, building high trust through video assets."
  }
];

export default function DigitalMarketingClient() {
  const [activeTab, setActiveTab] = useState<string>("instagram");

  // Auto-cycle tabs every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const index = PLATFORMS.findIndex((p) => p.id === current);
        return PLATFORMS[(index + 1) % PLATFORMS.length].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden font-sans">
      <SiteHeader />
      
      {/* ══ HERO SECTION (Find Clarity in Chaos) ═══════════════════════ */}
      <section className="relative pt-40 pb-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/30 text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 mb-8">
                  <Sparkles className="w-3.5 h-3.5" /> Services // Marketing
                </div>

                <h1 className="text-4xl md:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[0.95] mb-8">
                  Find clarity <br />
                  <span className="text-slate-400 dark:text-slate-500 font-light italic font-serif">in chaos.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
                  Shaibya Solutions is a full-service marketing and technology agency purpose-built to help organizations thrive, cut through digital complexity, and drive measurable revenue. We apply first-principles thinking to audit your channels, optimize conversion metrics, and scale your brand.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider bg-pink-600 text-white transition-all duration-200 hover:scale-105 hover:bg-pink-500 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 flex items-center gap-2"
                  >
                    Let's talk <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="#process"
                    className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  >
                    Our Process
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Chaos-to-Clarity Swirl Video */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full h-full flex justify-center"
              >
                <video
                  src="/videos/social.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-[480px] h-auto object-contain mix-blend-multiply dark:mix-blend-screen rounded-2xl [clip-path:inset(0px_0px_4px_0px)]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ASYMMETRIC PROCESS FLOW SECTION (What We Do) ═══════════════ */}
      <section id="process" className="py-32 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-3xl mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 mb-3 block">
              The Method
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
              An Asymmetric Framework for Measurable Growth
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light mt-3">
              We audit, structure, produce, and optimize. Here is our strategic process for transforming marketing complexity into clean customer acquisitions.
            </p>
          </div>

          {/* Asymmetric layout grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md transition-shadow relative md:translate-y-8"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold font-heading text-slate-100 dark:text-slate-800">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center text-sky-500 mb-8">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                Audit & Channel Scoping
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Before writing a single ad or post, we audit your existing marketing flow. We identify where potential customers are leaking from your funnel, analyze competitor targets, and select the channels with the highest potential return.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md transition-shadow relative"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold font-heading text-slate-100 dark:text-slate-800">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/30 flex items-center justify-center text-pink-500 mb-8">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                Structured Funnel Design
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                We design custom conversion pathways built specifically for your audience. From Landing page copy layouts to WhatsApp automations, we ensure every touchpoint is structured to capture intent and minimize friction.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md transition-shadow relative md:translate-y-8"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold font-heading text-slate-100 dark:text-slate-800">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 flex items-center justify-center text-purple-500 mb-8">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                Creative Production Sprints
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Our creative team writes hooks, edits high-retention video assets, and designs visually striking layouts. We treat content as product engineering — testing different variations to see what converts.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md transition-shadow relative"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold font-heading text-slate-100 dark:text-slate-800">
                04
              </span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-500 mb-8">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                Conversion Optimization
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                We monitor data pipelines, run A/B copy tests, and refine audience hooks. We use analytics to double-down on the ad creatives and organic search queries that generate actual business revenue.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ CLARITY IN CHAOS INTERACTIVE INTERLUDE ════════════════════ */}
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-pink-600 mb-4 block">
                Interactive Concept
              </span>
              <h3 className="text-3xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mb-6">
                Organizing Noise
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
                Marketing channels often feel like scattered noise — hundreds of platforms, search keywords, metrics, and ideas moving in all directions.
              </p>
              <p className="text-slate-800 dark:text-slate-300 font-medium leading-relaxed">
                We organize this chaos. By focusing on core business objectives, we arrange the scattered nodes into a unified, high-performing brand loop.
              </p>
              <p className="text-xs text-slate-400 italic mt-6 select-none">
                💡 Interactive: Hover over the canvas to scatter the marketing nodes, and leave to let the loop organize itself.
              </p>
            </div>

            {/* Right Canvas */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <div className="w-full max-w-[500px] border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10 rounded-4xl p-6 relative overflow-hidden">
                <ClarityInChaosDots />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ THE DIGITAL ECOSYSTEM TAB SHOWCASE (Device-mockup tab selector) ════ */}
      <section className="py-32 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 mb-3 block">
              Omnichannel Strategy
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-none mb-4">
              Dominate Every Platform
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light">
              We specialize in creating cohesive customer journeys across social media, local search, paid ads, and video.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Tab Selectors */}
            <div className="lg:col-span-4 space-y-4">
              {PLATFORMS.map((p) => {
                const isActive = activeTab === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-start gap-4 ${
                      isActive
                        ? "border-pink-500/30 bg-pink-50/30 dark:bg-pink-950/20 text-slate-900 dark:text-white shadow-sm"
                        : "border-slate-100 dark:border-slate-900 bg-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-500"
                    }`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-pink-600 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm font-heading mb-1 text-slate-900 dark:text-white">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-450 dark:text-slate-500 font-light leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: High-Fidelity App Interactive Viewports */}
            <div className="lg:col-span-8 flex justify-center">
              <div className="w-full max-w-[620px] aspect-[4/3] rounded-[2.5rem] border border-slate-100 dark:border-slate-900 bg-[#FAF9F6] dark:bg-slate-900/10 p-4 md:p-6 shadow-xl relative overflow-hidden flex flex-col">
                
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 pb-4 border-b border-slate-200/50 dark:border-slate-800/80 mb-4 select-none">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-450" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-4 bg-slate-200/60 dark:bg-slate-800/60 rounded-md px-3 py-0.5 text-[9px] text-slate-500 font-mono tracking-wider w-40 text-center truncate">
                    shaibya.solutions/marketing
                  </div>
                </div>

                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    
                    {/* INSTAGRAM TAB VIEWPORT */}
                    {activeTab === "instagram" && (
                      <motion.div
                        key="instagram"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col md:flex-row gap-6 p-2"
                      >
                        {/* Feed Card Mockup */}
                        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex flex-col justify-between shadow-sm">
                          <div>
                            <div className="flex items-center gap-3 mb-4 select-none">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center p-0.5">
                                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                                  <span className="text-[8px] font-bold text-pink-600">S</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-none">shaibyasolutions</span>
                                <span className="text-[9px] text-slate-400 font-light mt-0.5">Nagpur</span>
                              </div>
                            </div>

                            {/* Feed Visual Embed */}
                            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 dark:border-slate-800 relative mb-4">
                              <img
                                src="/images/screenshots/bridgestone-nagpur.png"
                                alt="Instagram mockup post"
                                className="w-full h-full object-cover opacity-90"
                              />
                              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] text-white font-mono uppercase tracking-widest font-bold">
                                Reel
                              </div>
                            </div>
                            
                            <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-light line-clamp-2">
                              We build digital showroom catalogs that connect offline stores to direct WhatsApp inquiries. No friction, more conversions.
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                            <Heart size={16} className="text-rose-500 fill-rose-500" />
                            <MessageCircle size={16} />
                            <Bookmark size={16} className="ml-auto" />
                          </div>
                        </div>

                        {/* Metrics Card */}
                        <div className="w-full md:w-52 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                          <div className="space-y-1 select-none">
                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Growth metric</span>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Reels Campaign</h4>
                          </div>

                          <div className="my-4">
                            <span className="text-4xl font-extrabold text-pink-600 block leading-none tracking-tight">45k+</span>
                            <span className="text-xs text-slate-400 mt-1 block">Organic views generated</span>
                          </div>

                          <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <CheckCircle2 size={12} className="text-emerald-500" /> Auto-captions written
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <CheckCircle2 size={12} className="text-emerald-500" /> High-retention hooks
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* GOOGLE SEO TAB VIEWPORT */}
                    {activeTab === "google" && (
                      <motion.div
                        key="google"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col md:flex-row gap-6 p-2"
                      >
                        {/* SERP Simulator */}
                        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                              <FaGoogle className="text-sky-500" size={16} />
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">Google Search Results</span>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] text-slate-400 block font-light leading-none">https://mginfraproperties.in</span>
                              <h4 className="text-sm font-bold text-sky-650 hover:underline cursor-pointer leading-tight">
                                Best Plots &amp; Real Estate Listings in Nagpur | MG Infra
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed line-clamp-3">
                                Explore premium residential plots, farm lands, and commercial spaces near Dharampeth and MIHAN Nagpur. RERA-compliant listings, verified layouts...
                              </p>
                            </div>

                            <div className="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-3">
                              <span className="text-[10px] text-slate-400 block font-light leading-none">https://shaibya.solutions/cases</span>
                              <h4 className="text-sm font-bold text-sky-650 hover:underline cursor-pointer leading-tight">
                                How We Ranked Nagpur Businesses on Page 1 - Case Studies
                              </h4>
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-400 font-light mt-4">
                            💡 Optimizing schemas, page titles, and canonical links natively.
                          </div>
                        </div>

                        {/* Local Pack Card */}
                        <div className="w-full md:w-52 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                          <div className="space-y-1 select-none">
                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Local SEO</span>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Google Business</h4>
                          </div>

                          <div className="my-4">
                            <div className="flex items-center gap-1 mb-1">
                              <Star size={14} className="text-yellow-450 fill-yellow-450" />
                              <Star size={14} className="text-yellow-450 fill-yellow-450" />
                              <Star size={14} className="text-yellow-450 fill-yellow-450" />
                              <Star size={14} className="text-yellow-450 fill-yellow-450" />
                              <Star size={14} className="text-yellow-450 fill-yellow-450" />
                            </div>
                            <span className="text-3xl font-extrabold text-sky-650 block leading-none tracking-tight">4.9/5</span>
                            <span className="text-xs text-slate-400 mt-1 block">Rating across 120+ reviews</span>
                          </div>

                          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-500 font-light leading-relaxed">
                            Structured data indexing maps GMB profiles directly to local keyword queries.
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ADS TAB VIEWPORT */}
                    {activeTab === "ads" && (
                      <motion.div
                        key="ads"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col md:flex-row gap-6 p-2"
                      >
                        {/* Ad Card Mockup */}
                        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                          <div>
                            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 select-none">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sponsored ad preview</span>
                            </div>
                            
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                              Drowning in manual registers at your gym?
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">
                              Automate attendance, check payment dates, and send renewal notices automatically on WhatsApp. Get a gym management system designed to help you scale.
                            </p>

                            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 dark:border-slate-800 mb-4 relative">
                              <img
                                src="/images/screenshots/revolution-fitness.png"
                                alt="Sponsored ad creative"
                                className="w-full h-full object-cover opacity-90"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gym management</span>
                            <span className="text-xs font-bold text-pink-600 uppercase hover:underline cursor-pointer">Learn More →</span>
                          </div>
                        </div>

                        {/* Conversion Metrics */}
                        <div className="w-full md:w-52 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                          <div className="space-y-1 select-none">
                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Ad pipeline</span>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Funnel Performance</h4>
                          </div>

                          <div className="my-4">
                            <span className="text-3xl font-extrabold text-emerald-600 block leading-none tracking-tight">₹45</span>
                            <span className="text-xs text-slate-400 mt-1 block">Cost per verified lead</span>
                          </div>

                          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-500 font-light leading-relaxed">
                            Pixel triggers and custom conversion models optimize budget allocation across channels.
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* VIDEO PRODUCTION TAB VIEWPORT */}
                    {activeTab === "video" && (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center p-2"
                      >
                        {/* Video frame preview */}
                        <div className="relative w-full max-w-[480px] aspect-[16/9] rounded-3xl overflow-hidden border border-slate-150 dark:border-slate-800 bg-black flex flex-col justify-between p-4 shadow-lg group">
                          
                          {/* Background mockup visual */}
                          <img
                            src="/images/screenshots/revolution-fitness.png"
                            alt="Video editing mockup background"
                            className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700"
                          />

                          {/* Overlay Header */}
                          <div className="relative z-10 flex items-center justify-between select-none">
                            <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                              ● REC
                            </span>
                            <span className="bg-black/40 px-2 py-0.5 rounded-full text-white text-[9px]">4K 60FPS</span>
                          </div>

                          {/* Center Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg cursor-pointer">
                              <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                            </div>
                          </div>

                          {/* Overlay Footer */}
                          <div className="space-y-2 mt-auto shrink-0 select-none bg-gradient-to-t from-black/80 to-transparent p-2 rounded-xl">
                            <span className="text-[10px] font-bold tracking-widest text-sky-400">Content Studio</span>
                            <h4 className="text-xs font-semibold text-white">Shooting customer review reels for fitness centers</h4>
                            <p className="text-[10px] text-slate-300">Scripted, produced, and optimized to drive 45k organic views.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CTA SECTION ═══════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#FAF9F6] dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#ec4899 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900 p-12 md:p-16 rounded-4xl backdrop-blur-md shadow-sm"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-6 tracking-tight">
              Stop guessing. Start growing.
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Partner with a digital marketing agency that focuses entirely on your bottom line. We design content, produce high-retention ads, and scale conversions.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider bg-pink-600 text-white hover:bg-pink-500 transition-all duration-200 hover:scale-105 shadow-lg shadow-pink-500/10"
            >
              Start Collaboration <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

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

export default function DigitalMarketingPage() {
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
                  <span className="text-slate-400 dark:text-slate-500 font-light italic">in chaos.</span>
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

            {/* Right: Chaos-to-Clarity Swirl Component */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full h-full"
              >
                <ClarityInChaosDots />
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
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md transition-shadow relative md:-translate-y-8"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold font-heading text-slate-100 dark:text-slate-800">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/30 flex items-center justify-center text-pink-500 mb-8">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                Structured Funnel Strategy
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                We formulate targeted marketing campaigns. Whether it's localized Google Business SEO or conversion-optimized Meta Ads, we map out clear customer acquisition milestones with detailed KPI metrics.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md transition-shadow relative md:translate-y-12"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold font-heading text-slate-100 dark:text-slate-800">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center text-orange-500 mb-8">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                Asset Production & Reels
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                We produce high-impact visual content. We write copy, design high-converting ad layouts, and script/record authentic brand videos and short reels. Visual excellence and authenticity build strong customer trust.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-8 md:p-10 rounded-4xl shadow-sm hover:shadow-md transition-shadow relative md:-translate-y-4"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold font-heading text-slate-100 dark:text-slate-800">
                04
              </span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-500 mb-8">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                Data-Driven Ad Scaling
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                We execute campaigns, track conversions, and continuously optimize ad budgets. By reviewing click-through and cost-per-acquisition rates, we scale high-performing ad sets to maximize your growth return.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ DYNAMIC PHONE SCREEN PLATFORMS SECTION (Interactive Device Mock) ═══ */}
      <section className="py-32 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 mb-3 block">
              Multi-Channel Domination
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Grow Your Brand Anywhere
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light mt-3">
              We help local and international brands build authority across social networks, paid search results, and local directory listings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Platform selector tabs */}
            <div className="lg:col-span-6 space-y-4">
              {PLATFORMS.map((platform) => {
                const TabIcon = platform.icon;
                const isActive = activeTab === platform.id;
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActiveTab(platform.id)}
                    className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-start gap-5 group cursor-pointer ${
                      isActive 
                        ? "bg-[#FAF9F6] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm" 
                        : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/20"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
                      isActive 
                        ? "bg-pink-600 border-pink-600 text-white" 
                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 group-hover:text-pink-500 group-hover:border-pink-200/55"
                    }`}>
                      <TabIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold font-heading mb-1 transition-colors ${
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                      }`}>
                        {platform.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Premium CSS iPhone Mockup with Changing Content */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-[300px] h-[610px] rounded-[50px] border-[12px] border-slate-900 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden flex flex-col">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-850 rounded-full mb-1" />
                </div>

                {/* Content Area */}
                <div className="flex-grow relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-6 px-4 pb-4">
                  <AnimatePresence mode="wait">
                    
                    {/* INSTAGRAM LAYOUT */}
                    {activeTab === "instagram" && (
                      <motion.div
                        key="instagram-feed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                      >
                        {/* Insta Header */}
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-900 px-1 shrink-0">
                          <span className="text-sm font-bold font-heading tracking-tight">shaibya_solutions</span>
                          <span className="text-xs text-sky-500 font-semibold">Follow</span>
                        </div>
                        {/* Feed Image / Reel */}
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1542744173-8e08562744ad?auto=format&fit=crop&q=80&w=350"
                            alt="Marketing post"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-[10px] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 fill-white" /> Reel Playing
                          </div>
                        </div>
                        {/* Engagement Bar */}
                        <div className="flex items-center justify-between py-2.5 px-1 shrink-0 text-slate-800 dark:text-slate-200">
                          <div className="flex items-center gap-3">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <Bookmark className="w-5 h-5" />
                        </div>
                        {/* Caption */}
                        <div className="px-1 text-xs leading-relaxed overflow-y-auto max-h-[120px] flex-grow select-none">
                          <p className="font-semibold mb-0.5">45,830 views</p>
                          <p className="text-slate-600 dark:text-slate-350">
                            <span className="font-semibold mr-1">shaibya_solutions</span>
                            We help Nagpur brand creators shoot raw visual reels that reach 100k+ locals. Results matter! #growth
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* GOOGLE PROFILE LAYOUT */}
                    {activeTab === "google" && (
                      <motion.div
                        key="google-profile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="h-full flex flex-col bg-slate-50 dark:bg-slate-900"
                      >
                        {/* Mock Google Header */}
                        <div className="bg-white dark:bg-slate-950 p-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-red-500 text-xs font-bold">G</div>
                            <span className="text-xs text-slate-500 font-medium">google.com/search</span>
                          </div>
                        </div>
                        {/* Google Card */}
                        <div className="m-3 p-4 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-850 flex-grow overflow-y-auto">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">Shaibya Solutions</h4>
                          <span className="text-xs text-slate-500">Software & Marketing Hub</span>
                          {/* Rating */}
                          <div className="flex items-center gap-1 mt-2.5 mb-4">
                            <span className="text-sm font-bold text-orange-500">5.0</span>
                            <div className="flex text-orange-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">(48 reviews)</span>
                          </div>
                          {/* Map Pin Nagpur */}
                          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/30 text-xs text-sky-700 dark:text-sky-300 mb-4">
                            📍 Marked at Nagpur, Maharashtra HQ
                          </div>
                          {/* Action button */}
                          <div className="flex gap-2">
                            <button className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors">
                              Call Now
                            </button>
                            <button className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-900">
                              Directions
                            </button>
                          </div>
                          {/* Review Quote */}
                          <div className="mt-5 border-t border-slate-100 dark:border-slate-850 pt-4">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Top Review</span>
                            <p className="text-xs italic text-slate-600 dark:text-slate-300 mt-1">
                              "Shaibya handled our local SEO optimization. In Nagpur we became the top result within 3 months!"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ADS DASHBOARD LAYOUT */}
                    {activeTab === "ads" && (
                      <motion.div
                        key="ads-dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                      >
                        <div className="p-4 border-b border-slate-100 dark:border-slate-900 shrink-0">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Shaibya Ad Manager</span>
                        </div>
                        {/* Ads data grid */}
                        <div className="p-4 space-y-4 flex-grow overflow-y-auto">
                          
                          {/* ROAS Card */}
                          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Conversion Return</span>
                            <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">4.8x ROAS</div>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Average across active Meta campaigns</span>
                          </div>

                          {/* Stats Row */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                              <span className="text-[9px] uppercase font-bold text-slate-400">Total Leads</span>
                              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">+240%</div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                              <span className="text-[9px] uppercase font-bold text-slate-400">Click Rate</span>
                              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">3.25%</div>
                            </div>
                          </div>

                          {/* Graph Drawing */}
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex-grow h-[120px] flex flex-col justify-between">
                            <span className="text-[9px] uppercase font-bold text-slate-400">Lead Spikes (Weekly)</span>
                            {/* Graphic lines simulating a line chart */}
                            <svg className="w-full h-[60px] text-sky-500 overflow-visible mt-2" viewBox="0 0 100 30" preserveAspectRatio="none">
                              <path d="M0,25 Q15,18 30,10 T60,5 T90,2 T100,0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* VIDEO SHOOT REEL LAYOUT */}
                    {activeTab === "video" && (
                      <motion.div
                        key="video-reels"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="h-full flex flex-col bg-slate-900 text-white"
                      >
                        {/* Simulated Phone camera UI overlay */}
                        <div className="relative flex-grow flex flex-col justify-between p-4 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=350')" }}>
                          
                          {/* Overlay header */}
                          <div className="flex justify-between items-center text-xs shrink-0 select-none">
                            <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                              ● REC
                            </span>
                            <span className="bg-black/40 px-2 py-0.5 rounded-full">4K 60FPS</span>
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
                            <p className="text-[10px] text-slate-350">Scripted, produced, and optimized to drive 45k organic views.</p>
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

"use client";

import { useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Search,
  Video,
  Target,
} from "lucide-react";
import { FaGoogle, FaInstagram } from "react-icons/fa";
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
  const [arranged, setArranged] = useState(true);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const particles: Particle[] = Array.from({ length: 48 }, (_, id) => {
    const angle = (id / 48) * Math.PI * 2;
    const radius = 85 + (id % 3) * 12;
    return {
      id,
      circleX: Math.cos(angle) * radius,
      circleY: Math.sin(angle) * radius,
      chaosX: Math.sin(id * 7.3) * 126,
      chaosY: Math.cos(id * 3.7) * 126,
      color: ["#ec4899", "#0ea5e9", "#a855f7", "#f97316"][id % 4],
      size: 5 + (id % 5),
    };
  });
  return (
    <div ref={ref} className="w-full" data-marketing-nodes>
      <div
        className="relative h-[300px] w-full flex items-center justify-center"
        onMouseEnter={() => setArranged(false)}
        onMouseLeave={() => setArranged(true)}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={false}
            className="absolute rounded-full"
            aria-hidden="true"
            animate={{
              x: arranged ? p.circleX : p.chaosX,
              y: arranged ? p.circleY : p.chaosY,
              scale: arranged && visible && !reduced ? [1, 1.15, 1] : 1,
            }}
            transition={{
              x: {
                type: reduced ? "tween" : "spring",
                stiffness: 45,
                damping: 14,
                ...(reduced ? { duration: 0 } : {}),
              },
              y: {
                type: reduced ? "tween" : "spring",
                stiffness: 45,
                damping: 14,
                ...(reduced ? { duration: 0 } : {}),
              },
              scale: {
                type: "tween",
                duration: reduced ? 0 : 2,
                repeat: !reduced && visible && arranged ? Infinity : 0,
                ease: "easeInOut",
                delay: (p.id % 6) * 0.1,
              },
            }}
            style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          />
        ))}
        <div className="relative grid h-32 w-32 place-content-center rounded-full border border-slate-200 bg-white text-center shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
            Clarity
          </span>
          <span className="mt-1 text-xs text-slate-500">
            One connected strategy
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setArranged((value) => !value)}
        aria-pressed={!arranged}
        className="mx-auto block rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-700 hover:border-pink-400 focus-visible:outline-2 focus-visible:outline-pink-500"
      >
        {arranged ? "Scatter the nodes" : "Organise the nodes"}
      </button>
    </div>
  );
}

/* ══ DEVICE TAB DESCRIPTIONS ════════════════════════════════ */
interface PlatformTab {
  id: string;
  name: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  description: string;
}

const PLATFORMS: PlatformTab[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    title: "Instagram & Social Reels",
    description:
      "Capturing attention through short-form visual storytelling. We write hooks, design post layouts, and edit custom Reels that drive massive community engagement.",
  },
  {
    id: "google",
    name: "Google Business & SEO",
    icon: FaGoogle,
    title: "Local Search Domination",
    description:
      "Helping relevant customers discover your business in Nagpur. We improve Google Business Profile accuracy, local content, and clear routes to enquiry.",
  },
  {
    id: "ads",
    name: "Paid Ad Campaigns",
    icon: TrendingUp,
    title: "Meta & Google Ads",
    description:
      "Building custom ad funnels focused purely on ROI. We design visual copy, set up target audience segments, and run conversion-optimized campaigns to capture hot leads.",
  },
  {
    id: "video",
    name: "Video Production",
    icon: Video,
    title: "Shooting High-Converting Videos",
    description:
      "Scripting and producing raw, authentic brand videos. We plan and produce content to showcase your services, building high trust through video assets.",
  },
];

export default function DigitalMarketingClient() {
  const [activeTab, setActiveTab] = useState<string>("instagram");
  const reduced = useReducedMotion();
  const platform = PLATFORMS.find((item) => item.id === activeTab)!;

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
                  <span className="text-slate-400 dark:text-slate-500 font-light italic font-serif">
                    in chaos.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
                  Shaibya Solutions is a full-service marketing and technology
                  agency purpose-built to help organizations thrive, cut through
                  digital complexity, and drive measurable revenue. We apply
                  first-principles thinking to audit your channels, optimize
                  conversion metrics, and scale your brand.
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
                  poster="/images/social/creator-shoot.webp"
                  preload="metadata"
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
      <section
        id="process"
        className="py-20 md:py-28 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 mb-3 block">
              The Method
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
              An Asymmetric Framework for Measurable Growth
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light mt-3">
              We audit, structure, produce, and optimize. Here is our strategic
              process for transforming marketing complexity into clean customer
              acquisitions.
            </p>
          </div>

          {/* Asymmetric layout grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Step 1 */}
            <motion.div
              initial={false}
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
                Before writing a single ad or post, we audit your existing
                marketing flow. We identify where potential customers are
                leaking from your funnel, analyze competitor targets, and select
                the channels with the highest potential return.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={false}
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
                We design custom conversion pathways built specifically for your
                audience. From Landing page copy layouts to WhatsApp
                automations, we ensure every touchpoint is structured to capture
                intent and minimize friction.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={false}
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
                Our creative team writes hooks, edits high-retention video
                assets, and designs visually striking layouts. We treat content
                as product engineering — testing different variations to see
                what converts.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={false}
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
                We monitor data pipelines, run A/B copy tests, and refine
                audience hooks. We use analytics to double-down on the ad
                creatives and organic search queries that generate actual
                business revenue.
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
                Marketing channels often feel like scattered noise — hundreds of
                platforms, search keywords, metrics, and ideas moving in all
                directions.
              </p>
              <p className="text-slate-800 dark:text-slate-300 font-medium leading-relaxed">
                We organize this chaos. By focusing on core business objectives,
                we arrange the scattered nodes into a unified, high-performing
                brand loop.
              </p>
              <p className="text-xs text-slate-400 italic mt-6 select-none">
                💡 Interactive: Hover to scatter the nodes, or use the button
                below on any device.
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
              We specialize in creating cohesive customer journeys across social
              media, local search, paid ads, and video.
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
                    aria-pressed={isActive}
                    aria-controls="platform-preview"
                    onClick={() => setActiveTab(p.id)}
                    className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-start gap-4 ${
                      isActive
                        ? "border-pink-500/30 bg-pink-50/30 dark:bg-pink-950/20 text-slate-900 dark:text-white shadow-sm"
                        : "border-slate-100 dark:border-slate-900 bg-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-500"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-pink-600 text-white"
                          : "bg-slate-100 dark:bg-slate-900 text-slate-400"
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

            <div
              className="lg:col-span-8 min-w-0"
              id="platform-preview"
              role="tabpanel"
              aria-label={platform.name}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween", duration: reduced ? 0 : 0.25 }}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <span className="text-sm font-semibold text-slate-800">
                      {activeTab === "instagram"
                        ? "@deepoffduty"
                        : platform.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">
                      {activeTab === "google"
                        ? "Website example"
                        : "Creative concept"}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Image
                      src={
                        activeTab === "instagram"
                          ? "/images/social/creator-shoot.webp"
                          : activeTab === "google"
                            ? "/images/screenshots/mg-infra.png"
                            : activeTab === "ads"
                              ? "/images/social/product-story.webp"
                              : "/images/social/editing-studio.webp"
                      }
                      alt={
                        activeTab === "google"
                          ? "MG Infra website project"
                          : "Illustrative creative direction for " +
                            platform.name
                      }
                      fill
                      sizes="(max-width: 1023px) 100vw, 65vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-5 sm:p-7">
                    <h3 className="text-xl font-bold text-slate-900">
                      {platform.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {platform.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(activeTab === "instagram"
                        ? [
                            "Storytelling",
                            "Reel editing",
                            "Consistent identity",
                          ]
                        : activeTab === "google"
                          ? [
                              "Accurate business details",
                              "Local relevance",
                              "Clear enquiry paths",
                            ]
                          : activeTab === "ads"
                            ? [
                                "Creative direction",
                                "Audience testing",
                                "Conversion tracking",
                              ]
                            : ["Script", "Shoot", "Edit"]
                      ).map((label) => (
                        <span
                          key={label}
                          className="rounded-full bg-slate-50 px-3 py-2 text-xs text-slate-600"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <a
                      href={
                        activeTab === "instagram" || activeTab === "video"
                          ? "https://www.instagram.com/deepoffduty/"
                          : "/contact"
                      }
                      target={
                        activeTab === "instagram" || activeTab === "video"
                          ? "_blank"
                          : undefined
                      }
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:underline"
                    >
                      {activeTab === "instagram" || activeTab === "video"
                        ? "Explore @deepoffduty"
                        : "Discuss your strategy"}
                      <ArrowRight size={15} />
                    </a>
                    {activeTab !== "google" && (
                      <p className="mt-4 text-xs text-slate-400">
                        Illustrative imagery · Not a frame from a published
                        reel.
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA SECTION ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(#ec4899 1.5px, transparent 1.5px)",
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
            className="bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900 p-6 sm:p-12 md:p-16 rounded-4xl backdrop-blur-md shadow-sm"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-6 tracking-tight">
              Stop guessing. Start growing.
            </h2>

            <p className="text-slate-500 dark:text-slate-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Partner with a digital marketing agency that focuses entirely on
              your bottom line. We design content, produce high-retention ads,
              and scale conversions.
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

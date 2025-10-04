"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import {
  FaBullhorn,
  FaFilm,
  FaChartLine,
  FaUsers,
  FaArrowRight,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { FaMagnifyingGlassChart, FaChartSimple } from "react-icons/fa6";

export default function MarketingDetailPage() {
  // --- Data for Core Services Grid (Our Capabilities) ---
  const coreServices = [
    {
      icon: <FaFilm className="w-8 h-8 text-pink-500" />,
      title: "Content & Cinematic Storytelling",
      content:
        "Developing compelling narratives, video scripts, and high-production content reels that captivate audiences.",
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-yellow-500" />,
      title: "Performance Marketing (SEO/SEM)",
      content:
        "Data-driven strategy, funnel optimization, and managing high-ROI paid campaigns across Google and social platforms.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-cyan-500" />,
      title: "Community & Engagement Strategy",
      content:
        "Building brand loyalty and driving active community participation through tailored social media strategies.",
    },
    {
      icon: <FaBullhorn className="w-8 h-8 text-rose-500" />,
      title: "Brand Identity & Messaging",
      content:
        "Defining your unique voice, tone, and visual identity to ensure consistency and resonance in every channel.",
    },
  ];

  // --- Data for Key Results/Stats ---
  const keyStats = [
    {
      icon: <FaChartSimple className="w-6 h-6 text-pink-400" />,
      label: "Avg. Conversion Rate Increase",
      value: "+45%",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-yellow-400" />,
      label: "Total Audience Reach",
      value: "80M+",
    },
    {
      icon: <FaMagnifyingGlassChart className="w-6 h-6 text-cyan-400" />,
      label: "SEO Ranking Improvement",
      value: "Top 3 Spots",
    },
    {
      icon: <FaChartLine className="w-6 h-6 text-rose-400" />,
      label: "Cost Per Acquisition (CPA) Reduction",
      value: "-35%",
    },
  ];

  // --- Data for Campaign Case Study (Mockup) ---
  const campaignStudy = {
    title: "Product X Launch Campaign",
    before: {
      metric: "Organic Impressions",
      value: "95,000 / month",
      color: "text-red-500",
    },
    after: {
      metric: "Total Reach",
      value: "1.2M / month",
      color: "text-green-500",
    },
    description:
      "We implemented a full-funnel strategy combining cinematic short films, influencer collaboration, and retargeting ads, resulting in a 12x increase in brand mentions and a surge in demo requests.",
  };

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section - Cinematic/Movie Poster Feel */}
      <Section className="mt-16 mb-24">
        <div className="relative rounded-3xl p-6 md:p-20 bg-slate-900 overflow-hidden border border-slate-800 shadow-2xl shadow-pink-900/20">
          {/* Background Mock Video/Montage Effect (Simple Gradient for safety) */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950/90 via-slate-900/60 to-pink-900/40 opacity-80"></div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <FaFilm className="w-16 h-16 text-pink-400 mx-auto mb-6" />
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tighter">
              We Don't Just Market. We{" "}
              <span className="text-pink-400">Tell Stories.</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
              Transforming your brand narrative into high-impact digital
              campaigns that drive measurable reach, engagement, and conversion.
            </p>
            <button
              className="mt-10 px-10 py-4 group bg-pink-600 text-white font-bold text-lg rounded-full shadow-xl shadow-pink-900/50 hover:bg-pink-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
              onClick={() => console.log("Hero CTA: Plan Campaign")}
            >
              Plan Your Next Campaign
              <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </Section>

      {/* 2. Core Services Grid (Our Capabilities) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Creative & Performance Capabilities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col transition duration-300 hover:border-pink-500"
            >
              <div className="mb-4 p-4 rounded-full bg-slate-800/50">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400">{item.content}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Campaign Case Study (Before/After) */}
      <Section className="mb-24">
        <div className="p-10 rounded-3xl bg-slate-800/60 border border-slate-700 shadow-xl">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
            Case Study: Driving 12x Growth
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3 w-full space-y-4">
              <div className="p-6 rounded-xl bg-slate-900 border-l-4 border-red-500">
                <p className="text-sm font-semibold text-red-500">
                  {campaignStudy.before.metric}
                </p>
                <div className="text-3xl font-bold text-white mt-1">
                  {campaignStudy.before.value}
                </div>
                <p className="text-xs text-slate-500">BEFORE Strategy</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-900 border-l-4 border-green-500">
                <p className="text-sm font-semibold text-green-500">
                  {campaignStudy.after.metric}
                </p>
                <div className="text-3xl font-bold text-white mt-1">
                  {campaignStudy.after.value}
                </div>
                <p className="text-xs text-slate-500">AFTER Campaign Launch</p>
              </div>
            </div>
            <div className="lg:w-2/3 w-full">
              <h3 className="text-3xl font-bold text-white mb-4">
                {campaignStudy.title}
              </h3>
              <p className="text-lg text-slate-400">
                {campaignStudy.description}
              </p>
              <div className="mt-6 flex gap-4 text-slate-400">
                <FaTwitter className="w-6 h-6 hover:text-cyan-400 transition" />
                <FaFacebook className="w-6 h-6 hover:text-blue-400 transition" />
                <FaInstagram className="w-6 h-6 hover:text-pink-400 transition" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Content Reels (Social Mockup) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
          High-Impact Content Reels
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/2 w-full">
            <p className="text-lg text-slate-400 mb-6">
              Our team develops dynamic **storyboards and vertical video
              content** designed for maximum attention span capture on platforms
              like TikTok and Reels. We blend high-fidelity CGI (from our other
              service!) with compelling scripting.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-pink-400" /> Viral-ready
                scripting and sound design.
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-pink-400" /> A/B testing on
                various hooks and CTAs.
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-pink-400" /> Optimized aspect
                ratios and captions.
              </li>
            </ul>
          </div>
          {/* Simple Mockup of a Content Reel Grid */}
          <div className="lg:w-1/2 w-full grid grid-cols-3 gap-2 p-4 rounded-xl bg-slate-900 border border-pink-700">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="aspect-[9/16] bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                  <FaFilm className="w-8 h-8 text-pink-500 opacity-50" />
                  <p className="absolute bottom-1 right-2 text-xs text-white">
                    0:{10 + i}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </Section>

      {/* 5. Final CTA Block */}
      <Section className="mb-24">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800/60 shadow-2xl shadow-pink-900/20">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Ready to captivate your audience and drive revenue?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Let's translate your business goals into a powerful, profitable
            digital narrative.
          </p>
          <button
            className="mt-8 px-10 py-4 group bg-pink-600 text-white font-bold text-lg rounded-full shadow-xl shadow-pink-900/50 hover:bg-pink-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
            onClick={() =>
              console.log("Final CTA: Book Marketing Strategy (Placeholder)")
            }
          >
            Book a Strategy Session
            <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

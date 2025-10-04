"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import {
  FaMobileAlt,
  FaApple,
  FaAndroid,
  FaWindows,
  FaReact,
  FaPuzzlePiece,
  FaCheckCircle,
  FaUsers,
  FaArrowRight,
  FaCode,
  FaClock,
  FaHeart,
  FaLayerGroup,
  FaServer,
} from "react-icons/fa";
import { FaSitemap, FaGaugeHigh, FaLaptopCode } from "react-icons/fa6";

export default function MobileDetailPage() {
  // --- Data for Capabilities Grid ---
  const capabilities = [
    {
      icon: <FaApple className="w-8 h-8 text-pink-400" />,
      title: "Native iOS & Android",
      content:
        "Development using Swift/Kotlin/Java for maximum performance and full access to device features and SDKs.",
    },
    {
      icon: <FaReact className="w-8 h-8 text-purple-400" />,
      title: "Cross-Platform (React Native/Flutter)",
      content:
        "Efficiently build and deploy a single codebase across both iOS and Android, accelerating time-to-market.",
    },
    {
      icon: <FaWindows className="w-8 h-8 text-indigo-400" />,
      title: "Desktop Applications",
      content:
        "Seamless desktop experiences for Windows, macOS, and Linux using Electron or Tauri for multi-OS compatibility.",
    },
    {
      icon: <FaPuzzlePiece className="w-8 h-8 text-rose-400" />,
      title: "App Store Deployment & CI/CD",
      content:
        "Handling store submission, review, and setting up automated Continuous Integration/Delivery (CI/CD) pipelines.",
    },
  ];

  // --- Data for Native vs Cross-Platform Explanation ---
  const platformComparison = [
    {
      title: "Native Development",
      icon: <FaHeart className="w-8 h-8 text-pink-500" />,
      color: "border-pink-500",
      pros: [
        "Highest performance and speed",
        "Full access to all device APIs/SDKs",
        "Most authentic user experience",
      ],
      cons: [
        "Slower development time",
        "Requires two separate codebases (iOS/Android)",
      ],
    },
    {
      title: "Cross-Platform (React Native)",
      icon: <FaLayerGroup className="w-8 h-8 text-purple-500" />,
      color: "border-purple-500",
      pros: [
        "Faster time-to-market",
        "Single codebase for iOS/Android",
        "Lower maintenance cost",
      ],
      cons: [
        "Limited access to niche device APIs",
        "Slight performance trade-off in complex apps",
      ],
    },
  ];

  // --- Data for Client Story (Testimonial/Stats) ---
  const clientStory = {
    title: "Proven to Scale: Client Success",
    stats: [
      { value: "3M+", label: "Users Served" },
      { value: "99.9%", label: "Uptime" },
      { value: "5-Star", label: "App Store Rating" },
    ],
    quote:
      "The final app exceeded all our expectations. The performance is flawless, and the smooth UX instantly boosted user retention.",
    source: "Head of Digital Transformation, Global Logistics Co.",
  };

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section for Mobile/Desktop - Device Mockups */}
      <Section className="mt-16 mb-24">
        <div className="relative border border-purple-700/60 rounded-3xl p-6 md:p-16 bg-slate-900/50 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Crafting Apps That{" "}
              <span className="text-purple-400">Feel Native</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
              Building beautiful, high-performance applications for every
              screen, delivering flawless **UX** and **multi-platform
              stability** across iOS, Android, and Desktop.
            </p>
            <button
              className="mt-8 px-10 py-4 group bg-purple-600 text-white font-bold text-lg rounded-full shadow-xl shadow-purple-900/50 hover:bg-purple-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
              onClick={() => console.log("Hero CTA: Start App Project")}
            >
              Launch Your Next App
              <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mockup Placeholder (Centered/Floating in a subtle 3D-like perspective) */}
          <div className="mt-12 flex justify-center items-end space-x-8">
            <div className="w-1/4 h-64 bg-slate-800 rounded-2xl border-4 border-slate-700 shadow-2xl transform rotate-[-5deg] translate-x-4 opacity-70">
              <FaLaptopCode className="w-full h-full p-8 text-indigo-400/50" />
              <p className="text-xs text-center text-slate-500 mt-2">
                Desktop UX
              </p>
            </div>
            <div className="w-1/4 h-80 bg-slate-800 rounded-3xl border-4 border-white shadow-2xl z-10">
              <FaMobileAlt className="w-full h-full p-10 text-pink-400" />
              <p className="text-sm text-center text-white mt-2">
                Mobile Focus
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Capabilities Grid (What We Offer) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Multi-Platform Development Expertise
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col transition duration-300 hover:border-purple-500"
            >
              <div className="mb-3 p-3 rounded-full bg-slate-800/50">
                {cap.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-400">{cap.content}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Native vs Cross-Platform Explanation */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Choosing Your Platform Strategy
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {platformComparison.map((platform) => (
            <div
              key={platform.title}
              className={`p-8 rounded-3xl bg-slate-900/70 border ${platform.color}/60 shadow-xl`}
            >
              <div className="flex items-center mb-4">
                {platform.icon}
                <h3 className="text-3xl font-bold text-white ml-4">
                  {platform.title}
                </h3>
              </div>

              <h4 className="text-xl font-semibold text-white mt-4 border-b border-slate-700 pb-1">
                Advantages
              </h4>
              <ul className="mt-3 space-y-2 text-slate-300">
                {platform.pros.map((p) => (
                  <li key={p} className="flex items-center">
                    <FaCheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />{" "}
                    {p}
                  </li>
                ))}
              </ul>

              <h4 className="text-xl font-semibold text-white mt-6 border-b border-slate-700 pb-1">
                Considerations
              </h4>
              <ul className="mt-3 space-y-2 text-slate-300">
                {platform.cons.map((c) => (
                  <li key={c} className="flex items-center">
                    <FaClock className="w-4 h-4 text-rose-400 mr-3 flex-shrink-0" />{" "}
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Client Story / Social Proof */}
      <Section className="mb-20">
        <div className="p-10 rounded-3xl bg-slate-800/60 border border-slate-700 shadow-xl">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
            Client Success: App Performance & Retention
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-center">
            {clientStory.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800"
              >
                <div className="text-5xl font-extrabold text-purple-400">
                  {stat.value}
                </div>
                <p className="text-lg font-semibold text-white mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="relative p-6 bg-slate-900/70 rounded-xl border border-purple-700/60">
            <FaUsers className="absolute top-4 right-4 w-8 h-8 text-purple-700 opacity-30" />
            <p className="text-xl italic text-slate-300">
              "{clientStory.quote}"
            </p>
            <p className="mt-3 text-sm font-semibold text-purple-400">
              -- {clientStory.source}
            </p>
          </div>
        </div>
      </Section>

      {/* 5. Process / How We Work (App Store Focus) - Retained from previous version */}
      <Section className="mb-24">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
          The App Development and Release Journey
        </h2>
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-purple-700/50 transform -translate-y-1/2 hidden lg:block"></div>

          {[
            {
              title: "1. Wireframing & Prototyping",
              description:
                "Designing the complete user flow, information architecture, and high-fidelity prototype.",
            },
            {
              title: "2. Core Development & Testing",
              description:
                "Building the main features with unit and UI testing, ensuring performance benchmarks are met.",
            },
            {
              title: "3. Beta & User Feedback",
              description:
                "Private and public beta testing, gathering actionable feedback, and final polishing.",
            },
            {
              title: "4. Store Submission & Launch",
              description:
                "Preparing store assets, managing submission requirements, and post-launch maintenance.",
            },
          ].map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center lg:w-1/4 w-full p-4 relative z-10"
            >
              <div
                className={`p-4 rounded-full border-4 border-slate-950 ${
                  index % 2 === 0 ? "bg-purple-600" : "bg-pink-600"
                } shadow-lg mb-4`}
              >
                <FaCode className="w-6 h-6 text-slate-100" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Final CTA Block */}
      <Section className="mb-24">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800/60 shadow-2xl shadow-purple-900/20">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Ready for your next mobile or desktop breakthrough?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Let's design an application that delights users and performs
            flawlessly across every device.
          </p>
          <button
            className="mt-8 px-10 py-4 group bg-purple-600 text-white font-bold text-lg rounded-full shadow-xl shadow-purple-900/50 hover:bg-purple-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
            onClick={() =>
              console.log("Final CTA: Book an App Call (Placeholder)")
            }
          >
            Start App Design Consultation
            <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

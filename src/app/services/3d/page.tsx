"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import {
  FaCamera,
  FaVrCardboard,
  FaLightbulb,
  FaCheckCircle,
  FaRocket,
  FaDollarSign,
  FaBolt,
  FaCube,
  FaPlayCircle,
} from "react-icons/fa";
import { FaClock, FaPenNib, FaCodeBranch } from "react-icons/fa6"; // Using Fa6 for variety

export default function CGIDetailPage() {
  // --- Data for Capabilities Grid ---
  const capabilities = [
    {
      icon: <FaCamera className="w-8 h-8 text-indigo-400" />,
      title: "Photorealistic Product Renders",
      content:
        "High-resolution static imagery indistinguishable from real photography for e-commerce, print, and advertising.",
    },
    {
      icon: <FaVrCardboard className="w-8 h-8 text-cyan-400" />,
      title: "Interactive Web 3D / AR",
      content:
        "Real-time 3D configurators (Three.js/WebGL) and assets ready for Augmented Reality experiences.",
    },
    {
      icon: <FaLightbulb className="w-8 h-8 text-yellow-400" />,
      title: "Cinematic CGI Spots",
      content:
        "Full-scale animation, visual effects, and storytelling for high-impact TV and digital commercial campaigns.",
    },
    {
      icon: <FaCube className="w-8 h-8 text-rose-400" />,
      title: "Architectural Visualization",
      content:
        "Detailed 3D models and fly-throughs for real estate, construction, and urban planning projects.",
    },
  ];

  // --- Data for Benefits Section ---
  const benefits = [
    {
      icon: <FaDollarSign className="w-6 h-6 text-green-400" />,
      text: "Significant cost savings over physical photo/video production.",
    },
    {
      icon: <FaRocket className="w-6 h-6 text-cyan-400" />,
      text: "Launch products faster by visualizing designs before manufacturing is complete.",
    },
    {
      icon: <FaBolt className="w-6 h-6 text-yellow-400" />,
      text: "Create limitless creative scenarios, environments, and product variations instantly.",
    },
    {
      icon: <FaCheckCircle className="w-6 h-6 text-indigo-400" />,
      text: "Achieve higher engagement rates with motion graphics and interactive assets.",
    },
  ];

  // --- Data for Process Steps ---
  const processSteps = [
    {
      icon: <FaPenNib className="w-6 h-6 text-slate-100" />,
      title: "1. Concept & Storyboard",
      description:
        "Defining the visual narrative, camera angles, lighting, and key scenes.",
    },
    {
      icon: <FaCodeBranch className="w-6 h-6 text-slate-100" />,
      title: "2. Modeling & Texturing",
      description:
        "Building the high-fidelity 3D model and applying realistic materials and textures.",
    },
    {
      icon: <FaPlayCircle className="w-6 h-6 text-slate-100" />,
      title: "3. Rendering & Animation",
      description:
        "Finalizing lighting, rendering the output frames, and implementing motion effects.",
    },
    {
      icon: <FaClock className="w-6 h-6 text-slate-100" />,
      title: "4. Post-Production & Integration",
      description:
        "Color grading, VFX touch-ups, sound design (if applicable), and delivery in required formats.",
    },
  ];

  // --- Data for Mock Gallery/Showcase (Using Placeholders) ---
  const showcaseItems = [
    {
      type: "image",
      url: "https://placehold.co/600x400/312e81/ffffff?text=Product+Render",
      title: "Automotive Lighting System",
    },
    {
      type: "video",
      url: "https://placehold.co/600x400/164e63/ffffff?text=CGI+Spot+(Video)",
      title: "Futuristic Headset Commercial",
    },
    {
      type: "image",
      url: "https://placehold.co/600x400/9d174d/ffffff?text=Architectural+Flythrough",
      title: "Luxury Residential Tower",
    },
    {
      type: "image",
      url: "https://placehold.co/600x400/4c0519/ffffff?text=Interactive+Configurator",
      title: "Customizable Furniture Model",
    },
    {
      type: "video",
      url: "https://placehold.co/600x400/6b21a8/ffffff?text=Abstract+Motion+Graphics",
      title: "Brand Identity Reveal",
    },
    {
      type: "image",
      url: "https://placehold.co/600x400/1f2937/ffffff?text=Medical+Visualization",
      title: "Microscopic Cellular Action",
    },
  ];

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section for CGI */}
      <Section className="mt-16 mb-20">
        <div className="relative border border-indigo-700/60 rounded-3xl p-6 md:p-16 bg-slate-900/50 overflow-hidden shadow-2xl">
          {/* Subtle dark background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-900/10 to-transparent opacity-50"></div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Cinematic <span className="text-indigo-400">CGI Ads</span> &
              Product Visualization
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
              Transforming concepts into high-fidelity, emotionally resonant
              visuals that drive engagement and tell unforgettable brand
              stories.
            </p>
            <button
              className="mt-8 px-10 py-4 group bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
              onClick={() =>
                console.log("Hero CTA: Start Visualization Project")
              }
            >
              Start Your Visualization Project
              <svg
                className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </Section>

      {/* 2. Capabilities Grid (What We Offer) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Our Core Visualization Capabilities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col items-center text-center transition duration-300 hover:border-indigo-500"
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

      {/* 3. Portfolio / Showcase Gallery */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Recent CGI & 3D Showcase
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseItems.map((item) => (
            <div
              key={item.title}
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group transition duration-300 hover:scale-[1.02]"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
                // The onError handler is now safe because the component is a Client Component
                onError={(e: any) =>
                  (e.target.src =
                    "https://placehold.co/600x400/334155/f1f5f9?text=Visual+Asset")
                }
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.type === "video" ? (
                  <FaPlayCircle className="w-12 h-12 text-white/80" />
                ) : (
                  <FaCamera className="w-10 h-10 text-white/80" />
                )}
                <span className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            className="px-8 py-3 bg-slate-800 text-slate-300 font-semibold rounded-full border border-slate-700 hover:bg-slate-700 transition duration-300"
            onClick={() => console.log("View Full Portfolio clicked")} // Click handler is now safe
          >
            View Full Portfolio
          </button>
        </div>
      </Section>

      {/* 4. Benefits / Why It Matters */}
      <Section className="mb-20">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
            Client Value
          </span>
          <h2 className="text-4xl font-extrabold text-white mt-2">
            Why Choose Virtual Production?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.text}
              className="flex items-center p-4 rounded-xl border border-slate-800/60 bg-slate-900/70 shadow-md"
            >
              <div className="flex-shrink-0 p-3 rounded-full bg-slate-800 mr-4">
                {benefit.icon}
              </div>
              <p className="text-base text-slate-300 font-medium">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Process / How We Work */}
      <Section className="mb-24">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
          The CGI Production Pipeline
        </h2>
        <div className="relative flex justify-between">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-700/50 transform -translate-y-1/2 hidden lg:block"></div>

          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center lg:w-1/4 w-full p-4 relative z-10"
            >
              <div
                className={`p-4 rounded-full border-4 border-slate-950 ${
                  index % 2 === 0 ? "bg-indigo-600" : "bg-cyan-600"
                } shadow-lg mb-4`}
              >
                {step.icon}
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
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800/60 shadow-2xl shadow-indigo-900/20">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Ready to visualize your product in 3D?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Let’s discuss how CGI can transform your marketing and development
            process.
          </p>
          <button
            className="mt-8 px-10 py-4 group bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
            onClick={() =>
              console.log("Final CTA: Book a CGI Call (Placeholder)")
            } // Click handler is now safe
          >
            Schedule a Consultation
            <svg
              className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

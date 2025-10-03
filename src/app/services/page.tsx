"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { ServiceCard } from "@/components/ui/service-card";
// Import all necessary icons
import {
  FaBrain,
  FaCode, // Replaces FaCubes for Full-stack
  FaMobileAlt,
  FaFlask,
  FaLock, // For Cybersecurity
  FaDraftingCompass, // For UI/UX
  FaCube, // For CGI & 3D
  FaBullhorn, // For Digital Marketing
  FaRocket, // For Differentiator
  FaArrowRight, // General icon
  FaSearch, // For Discovery
  FaWrench, // For Strategy
  FaHammer, // For Development
  FaSyncAlt, // For Support
  FaUserFriends, // For Users Served
  FaTachometerAlt, // For Performance
  FaAward, // For Projects/Awards
} from "react-icons/fa";

// Define the complete list of 8 services for the grid
// UPDATED SLUGS TO REFLECT THE NEW STATIC FOLDER STRUCTURE
const ALL_SERVICES = [
  {
    slug: "ai", // Corresponds to /services/ai
    title: "AI Solutions",
    desc: "ML models, analytics, automation, and generative AI.",
    icon: <FaBrain className="text-cyan-400" />,
  },
  {
    slug: "web", // Assuming "full-stack" is now mapped to /services/web
    title: "Full-stack Development",
    desc: "APIs, scalable web apps, and modern frontend.",
    icon: <FaCode className="text-yellow-400" />,
  },
  {
    slug: "mobile", // Corresponds to /services/mobile (Includes Desktop)
    title: "Mobile & Desktop Apps",
    desc: "Native and cross-platform apps with smooth UX.",
    icon: <FaMobileAlt className="text-purple-400" />,
  },
  {
    slug: "rd", // Assuming "rd" remains the slug for R&D
    title: "Custom R&D & Prototyping",
    desc: "Rapid PoCs, feasibility studies, and innovation spikes.",
    icon: <FaFlask className="text-rose-400" />,
  },
  {
    slug: "cybersecurity", // Assuming "cybersecurity" remains the slug
    title: "Cybersecurity & Penetration Testing",
    desc: "Threat modeling, vulnerability scanning, audits, and secure architecture.",
    icon: <FaLock className="text-green-400" />,
  },
  {
    slug: "ui-ux", // Assuming "ui-ux" remains the slug
    title: "UI/UX Design & Prototyping",
    desc: "Wireframes, usability testing, and human-centered design.",
    icon: <FaDraftingCompass className="text-indigo-400" />,
  },
  {
    slug: "3d", // UPDATED: Corresponds to /services/3d
    title: "CGI & 3D Visualization",
    desc: "3D product visualization, CGI ads, and immersive assets.",
    icon: <FaCube className="text-orange-400" />,
  },
  {
    slug: "marketing", // Assuming "marketing" remains the slug
    title: "Digital Marketing & Storytelling",
    desc: "Content creation, campaigns, branding, and engagement strategies.",
    icon: <FaBullhorn className="text-pink-400" />,
  },
];

// Define a new process section for the "Why Us" replacement
const PROCESS_STEPS = [
  {
    icon: <FaSearch className="h-6 w-6 text-cyan-400" />,
    title: "1. Discovery & Needs Assessment",
    description:
      "Deep dive into business goals, technical systems, and opportunities for innovation and growth.",
  },
  {
    icon: <FaWrench className="h-6 w-6 text-yellow-400" />,
    title: "2. Strategy & Architecture",
    description:
      "Crafting a tailored technical roadmap, defining the platform architecture, and finalizing the scope.",
  },
  {
    icon: <FaHammer className="h-6 w-6 text-rose-400" />,
    title: "3. Development & Delivery",
    description:
      "Agile build process, continuous integration, rigorous QA, and launching the production-ready solution.",
  },
  {
    icon: <FaSyncAlt className="h-6 w-6 text-green-400" />,
    title: "4. Maintenance & Scaling",
    description:
      "Ongoing support, performance monitoring, feature iteration, and scaling infrastructure for future growth.",
  },
];
const KEY_STATS = [
  {
    icon: <FaUserFriends className="h-10 w-10 text-cyan-400" />,
    number: "3M+",
    label: "Users Served Globally",
  },
  {
    icon: <FaRocket className="h-10 w-10 text-yellow-400" />,
    number: "50+",
    label: "Rapid Prototypes Delivered",
  },
  {
    icon: <FaTachometerAlt className="h-10 w-10 text-rose-400" />,
    number: "99.9%",
    label: "Platform Uptime Assurance",
  },
  {
    icon: <FaAward className="h-10 w-10 text-green-400" />,
    number: "12",
    label: "Industry Awards Won",
  },
];
export default function ServicesPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Hero / Intro Section */}
      <Section className="mt-16 mb-24">
        <div className="relative overflow-hidden rounded-3xl p-6 md:p-16 text-center border border-slate-800/60 bg-slate-900/50">
          {/* Subtle background gradient/motion */}
          <div className="pointer-events-none absolute inset-0 -top-20 -left-20 h-[calc(100%+40px)] w-[calc(100%+40px)] bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-50 blur-3xl animate-pulse-slow" />

          <h1 className="relative font-extrabold text-5xl sm:text-7xl lg:text-[5rem] leading-tight text-white">
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Future-Ready Platforms
            </span>
          </h1>
          <p className="relative mx-auto mt-6 max-w-4xl text-xl text-slate-300">
            From prototypes to production, we craft digital solutions that scale
            with your business—powered by AI, design, and robust security.
          </p>
          <button
            className="relative mt-10 px-8 py-3 group bg-cyan-600 text-white font-semibold rounded-full shadow-xl shadow-cyan-900/50 hover:bg-cyan-500 transition duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center mx-auto"
            onClick={() => console.log("Hero CTA: Talk to Us")} // Placeholder action
          >
            Talk to Us
            <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Section>

      {/* 2. Services Overview Grid (8 Cards) */}
      <Section className="mb-24">
        <h2 className="text-4xl font-semibold text-white text-center">
          Our Core Capabilities
        </h2>
        <p className="mt-2 text-lg text-slate-400 text-center mb-10">
          A full spectrum of services to drive innovation and growth.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_SERVICES.map((service) => (
            <ServiceCard
              key={service.slug}
              href={`/services/${service.slug}`}
              title={service.title}
              desc={service.desc}
              icon={service.icon}
            />
          ))}
        </div>
      </Section>

      {/* 3. Our Collaborative Process (Replaced Differentiators) */}
      <Section className="mb-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
            Our Process
          </span>
          <h2 className="text-4xl font-semibold text-white mt-2">
            Clarity, Strategy, and Long-Term Value
          </h2>
          <p className="mt-2 text-lg text-slate-400 max-w-3xl mx-auto">
            We ensure every solution is tailored, thoughtful, and built to scale
            through four essential steps.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-xl border border-slate-800/60 bg-slate-900/40 p-6 shadow-lg transition duration-300 hover:border-cyan-500 hover:bg-slate-800/60"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-slate-800/50 transition-colors duration-300 group-hover:bg-cyan-600/30">
                  {/* Icon changes color on hover via parent group */}
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mb-24">
        <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden bg-slate-900/50 border border-slate-800/60">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">
              Trust & Track Record
            </span>
            <h2 className="text-4xl font-semibold text-white mt-2">
              Results That Speak for Themselves
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center p-4"
              >
                <div className="p-5 rounded-full bg-slate-800/50 mb-4 border border-slate-700/50">
                  {stat.icon}
                </div>
                <div className="font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-slate-400 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

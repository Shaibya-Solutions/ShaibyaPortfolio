"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { ServiceCard } from "@/components/ui/service-card";
// Import the new CardSwap and Card components
import CardSwap, { Card } from "@/components/CardSwap";
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

export default function ServicesPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Hero / Intro Section - Updated to the new design */}
      <Section className="mt-16 mb-24">
        {/* Container for the new hero section with two columns */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between rounded-3xl p-6 md:p-16 border border-slate-800/60 bg-slate-900/50 relative overflow-hidden">
          {/* Subtle background gradient/motion */}
          <div className="pointer-events-none absolute inset-0 -top-20 -left-20 h-[calc(100%+40px)] w-[calc(100%+40px)] bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-50 blur-3xl animate-pulse-slow" />

          {/* Left Column: Text Content */}
          <div className="relative z-10 lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="relative font-extrabold text-5xl sm:text-7xl lg:text-[5rem] leading-tight text-white">
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Future-Ready Platforms
              </span>
            </h1>
            <p className="relative mx-auto lg:mx-0 mt-6 max-w-4xl text-xl text-slate-300">
              From prototypes to production, we craft digital solutions that
              scale with your business—powered by AI, design, and robust
              security.
            </p>
            <button
              className="relative mt-10 px-8 py-3 group bg-cyan-600 text-white font-semibold rounded-full shadow-xl shadow-cyan-900/50 hover:bg-cyan-500 transition duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center mx-auto lg:mx-0"
              onClick={() => console.log("Hero CTA: Talk to Us")} // Placeholder action
            >
              Talk to Us
              <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Column: CardSwap Component */}
          <div className="relative lg:w-1/2 flex justify-center items-center h-[500px] lg:h-[600px] w-full">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
              width={500}
              height={400}
            >
              {/* You can replace this with your own custom cards */}
              <Card customClass="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-2xl">
                <span className="text-8xl font-black text-cyan-400">1</span>
                <h3 className="text-2xl font-semibold mt-4">Smooth</h3>
                <p className="text-sm mt-2 text-slate-400 text-center">
                  Seamless animations
                </p>
              </Card>
              <Card customClass="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-cyan-900 to-slate-900 text-white shadow-2xl">
                <span className="text-8xl font-black text-purple-400">2</span>
                <h3 className="text-2xl font-semibold mt-4">Customizable</h3>
                <p className="text-sm mt-2 text-slate-400 text-center">
                  Easily adjust the look
                </p>
              </Card>
              <Card customClass="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-900 to-slate-900 text-white shadow-2xl">
                <span className="text-8xl font-black text-rose-400">3</span>
                <h3 className="text-2xl font-semibold mt-4">Responsive</h3>
                <p className="text-sm mt-2 text-slate-400 text-center">
                  Works on all devices
                </p>
              </Card>
            </CardSwap>
          </div>
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

      <SiteFooter />
    </main>
  );
}

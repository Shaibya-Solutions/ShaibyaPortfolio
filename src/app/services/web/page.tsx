"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { ServiceCTA } from "@/components/shared/ServiceCTA";
import {
  FaCode,
  FaServer,
  FaCloud,
  FaShieldAlt,
  FaTerminal,
  FaLayerGroup,
  FaBolt,
  FaSitemap,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import {
  FaArrowRight,
  FaUsers,
  FaGaugeHigh,
  FaJs,
  FaGitAlt,
} from "react-icons/fa6";
import { FaDocker } from "react-icons/fa6"; // Adding FaDocker explicitly

export default function WebDetailPage() {
  // --- Data for Capabilities Grid (What We Offer) ---
  const capabilities = [
    {
      icon: <FaReact className="w-8 h-8 text-sky-400" />,
      title: "Modern Frontend (Next.js)",
      content:
        "High-performance, accessible user interfaces using React, Next.js, and TypeScript, optimized for SEO and Core Web Vitals.",
    },
    {
      icon: <FaServer className="w-8 h-8 text-green-400" />,
      title: "Scalable Backend & APIs",
      content:
        "Building secure, reliable, and microservice-ready APIs (Node.js, Python) optimized for speed and concurrency.",
    },
    {
      icon: <FaCloud className="w-8 h-8 text-orange-400" />,
      title: "DevOps & Cloud Automation",
      content:
        "Infrastructure provisioning, CI/CD pipelines, containerization (Docker/Kubernetes), and secure infrastructure-as-code (IaC) deployment on all major clouds.",
    },
    {
      icon: <FaGaugeHigh className="w-8 h-8 text-yellow-400" />,
      title: "Performance & Observability",
      content:
        "Deep optimization for Core Web Vitals, paired with real-time logging, metrics, and APM for continuous stability.",
    },
  ];

  // --- Data for Tech Stack Badges (Stack Icons) ---
  const techStack = [
    {
      name: "React / Next.js",
      FaIcon: FaReact,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      name: "Node.js",
      FaIcon: FaNodeJs,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      name: "TypeScript",
      FaIcon: FaTerminal,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      name: "Tailwind CSS",
      FaIcon: FaCode,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      name: "PostgreSQL",
      FaIcon: FaDatabase,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      name: "Kubernetes",
      FaIcon: FaDocker,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      name: "GraphQL",
      FaIcon: FaBolt,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      name: "Git & CI/CD",
      FaIcon: FaGitAlt,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ];

  // --- Data for Timeline (Process) ---
  const timelineSteps = [
    {
      title: "1. Architecture",
      content:
        "Defining the core application topology, scaling strategy, and data schemas.",
      icon: FaSitemap,
    },
    {
      title: "2. Backend Build",
      content:
        "Implementing secure APIs, business logic, and database integration.",
      icon: FaServer,
    },
    {
      title: "3. Frontend UI/UX",
      content:
        "Developing pixel-perfect, responsive user interfaces based on high-fidelity designs.",
      icon: FaJs,
    },
    {
      title: "4. Deployment & Scale",
      content:
        "Automating zero-downtime deployment and setting up monitoring systems.",
      icon: FaCloud,
    },
  ];

  // --- Data for Benefits Section ---
  const benefits = [
    {
      icon: <FaGaugeHigh className="w-6 h-6 text-yellow-400" />,
      text: "Achieve top Lighthouse scores and industry-leading performance metrics.",
    },
    {
      icon: <FaSitemap className="w-6 h-6 text-orange-400" />,
      text: "Build on future-proof, decoupled architectures that support microservices growth.",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-red-400" />,
      text: "Ensure maximum uptime and horizontal scalability to handle sudden traffic spikes.",
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 text-lime-400" />,
      text: "Security-by-design approach, protecting data and complying with global standards.",
    },
  ];

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section for Web - Split Screen Code/UI */}
      <Section className="mt-16 mb-24">
        <div className="relative rounded-3xl p-6 md:p-12 bg-slate-900/50 overflow-hidden shadow-2xl border border-slate-800/60">
          <div className="grid lg:grid-cols-2 gap-10 relative z-10">
            {/* Code Side (Left) */}
            <div className="p-6 rounded-xl bg-slate-800/80 font-mono text-sm shadow-inner shadow-black/50">
              <div className="flex justify-between items-center pb-3 border-b border-slate-700/50 mb-3">
                <span className="text-yellow-400 font-semibold flex items-center">
                  <FaTerminal className="w-4 h-4 mr-2" /> index.ts
                </span>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
              </div>
              <pre className="overflow-x-auto text-slate-300">
                <code className="block whitespace-pre">
                  {`const apiRouter = express.Router();

// Define API endpoint for users
apiRouter.get('/users', async (req, res) => {
    try {
        // Fetch data from database
        const users = await db.fetch('users');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        // Log and handle server error
        console.error('API Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
// Scale-ready architecture`}
                </code>
              </pre>
            </div>

            {/* UI Side (Right) */}
            <div className="flex flex-col justify-center items-center p-6 bg-slate-950/70 rounded-xl border border-yellow-600/50 shadow-2xl shadow-yellow-900/30">
              <h1 className="text-4xl font-extrabold text-white text-center leading-snug">
                <span className="text-yellow-400">Code to Conversion.</span>
              </h1>
              <p className="mt-3 text-lg text-slate-400 text-center">
                Seamlessly linking **robust APIs** with a **pixel-perfect
                frontend**.
              </p>
              <button
                className="mt-6 px-8 py-3 group bg-yellow-600 text-slate-950 font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-[1.05]"
                onClick={() => console.log("Hero CTA: Talk Architecture")}
              >
                Discuss Architecture
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Capabilities Grid (What We Offer) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Comprehensive Web & Backend Capabilities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col transition duration-300 hover:border-yellow-500"
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

      {/* 3. Tech Stack Badges */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          The Next-Generation Tech Stack
        </h2>
        <div className="p-8 rounded-3xl border border-slate-800/60 bg-slate-900/70">
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className={`flex items-center gap-2 p-3 rounded-full ${tech.bg} border border-slate-700`}
              >
                <tech.FaIcon className={`w-5 h-5 ${tech.color}`} />
                <span className="text-sm font-medium text-slate-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Development Timeline (Process/Timeline) */}
      <Section className="mb-24">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
          The Full-Stack Delivery Timeline
        </h2>
        <div className="relative flex justify-between">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-700/50 transform -translate-y-1/2 hidden lg:block"></div>

          {timelineSteps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center lg:w-1/4 w-full p-4 relative z-10"
            >
              <div
                className={`p-4 rounded-full border-4 border-slate-950 ${
                  index % 2 === 0 ? "bg-yellow-600" : "bg-orange-600"
                } shadow-lg mb-4`}
              >
                <step.icon className="w-6 h-6 text-slate-950" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 max-w-xs">{step.content}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Mini Case Study (Before/After System Performance) */}
      <Section className="mb-24">
        <div className="p-10 rounded-3xl bg-slate-800/60 border border-slate-700 shadow-xl">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
            Case Study Snapshot: Performance Boost
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800">
              <p className="text-lg text-slate-400 mb-2">Before Optimization</p>
              <div className="text-6xl font-extrabold text-red-500">4.5s</div>
              <p className="text-xl font-semibold text-white mt-2">
                API Response Time
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800">
              <p className="text-lg text-slate-400 mb-2">
                After Full-Stack Re-architecture
              </p>
              <div className="text-6xl font-extrabold text-green-500">80ms</div>
              <p className="text-xl font-semibold text-white mt-2">
                API Response Time
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Final CTA Block */}
      <ServiceCTA
        title="Ready to build a platform that truly scales?"
        description="Let's discuss your next-generation web application or modern API strategy."
        buttonText="Start an Architecture Review"
        buttonAction={() =>
          console.log("Final CTA: Book a Web Call (Placeholder)")
        }
        colorTheme="yellow"
      />
    </main>
  );
}

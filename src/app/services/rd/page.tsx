"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import {
  FaFlask,
  FaRocket,
  FaLightbulb,
  FaDraftingCompass,
  FaCube,
  FaCheckCircle,
  FaBookOpen,
} from "react-icons/fa";
import {
  FaCodeBranch,
  FaSitemap,
  FaScaleBalanced,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa6";

export default function RDDetailPage() {
  // --- Data for PoC Gallery ---
  const pocGallery = [
    {
      icon: <FaLightbulb className="w-8 h-8 text-rose-400" />,
      title: "Innovation Spike",
      desc: "2-week deep dive into a single, high-risk technical challenge.",
    },
    {
      icon: <FaCodeBranch className="w-8 h-8 text-yellow-400" />,
      title: "MVP Framework",
      desc: "4-week build of core features to quickly validate market fit and user behavior.",
    },
    {
      icon: <FaCube className="w-8 h-8 text-cyan-400" />,
      title: "3D/AR Concept",
      desc: "6-week creation of immersive prototypes for product visualization and sales.",
    },
    {
      icon: <FaScaleBalanced className="w-8 h-8 text-green-400" />,
      title: "Scalability Test",
      desc: "Load testing a proposed architecture to determine real-world performance limits.",
    },
  ];

  // --- Data for Process Timeline ---
  const timelineSteps = [
    {
      title: "1. Concept & Ideation",
      content:
        "Defining the problem space, validating business value, and setting technical scope.",
      icon: FaDraftingCompass,
    },
    {
      title: "2. Prototype & Build",
      content:
        "Rapid, time-boxed construction of the PoC, focusing purely on core functionality.",
      icon: FaFlask,
    },
    {
      title: "3. Validation & Review",
      content:
        "Testing the prototype against feasibility criteria, gathering stakeholder feedback.",
      icon: FaCheckCircle,
    },
    {
      title: "4. Scaling & Handoff",
      content:
        "Documenting the solution, establishing a roadmap, and transferring knowledge for production.",
      icon: FaRocket,
    },
  ];

  // --- Data for Knowledge Transfer ---
  const transferSections = [
    {
      icon: <FaBookOpen className="w-6 h-6 text-slate-300" />,
      title: "Comprehensive Documentation",
      content:
        "Detailed architectural blueprints, codebase READMEs, and deployment guides.",
    },
    {
      icon: <FaSitemap className="w-6 h-6 text-slate-300" />,
      title: "Roadmap & Strategy",
      content:
        "A clear, phased plan for evolving the successful prototype into a robust production system.",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-slate-300" />,
      title: "Team Training & Workshops",
      content:
        "Hands-on sessions with your engineering team to ensure seamless project ownership.",
    },
  ];

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section for R&D - Abstract Innovation */}
      <Section className="mt-16 mb-24">
        <div className="relative border border-rose-700/60 rounded-3xl p-6 md:p-20 bg-slate-900/50 overflow-hidden shadow-2xl">
          {/* Geometric, Abstract Background Effect */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-64 h-64 bg-rose-500/10 blur-[100px] absolute top-[-50px] left-[-50px] rounded-full animate-spin-slow"></div>
            <div className="w-80 h-80 bg-yellow-500/10 blur-[120px] absolute bottom-[-50px] right-[-50px] rounded-full animate-pulse-slow"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <FaFlask className="w-16 h-16 text-rose-400 mx-auto mb-6" />
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight">
              From Idea to{" "}
              <span className="text-rose-400">Validated Prototype</span> in
              Weeks
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
              We eliminate technical uncertainty with rapid **Proof of Concept
              (PoC) builds**, feasibility studies, and innovation spikes that
              pave the way for confident scaling.
            </p>
            <button
              className="mt-10 px-10 py-4 group bg-rose-600 text-white font-bold text-lg rounded-full shadow-xl shadow-rose-900/50 hover:bg-rose-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
              onClick={() => console.log("Hero CTA: Start R&D PoC")}
            >
              Start a Feasibility Study
              <FaRocket className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </Section>

      {/* 2. Rapid PoC Gallery (Cards showing quick builds) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Rapid Prototyping Capabilities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pocGallery.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col items-center text-center transition duration-300 hover:border-rose-500"
            >
              <div className="mb-4 p-4 rounded-full bg-slate-800/50 transition-colors group-hover:bg-rose-600/30">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Timeline: Concept → Prototype → Validation → Scaling */}
      <Section className="mb-24">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
          Our R&D Validation Cycle
        </h2>
        <div className="relative">
          {/* Horizontal Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-rose-700/50 transform -translate-y-1/2 hidden lg:block"></div>

          <div className="grid lg:grid-cols-4 gap-8">
            {timelineSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center p-4 relative z-10 bg-slate-950/90 rounded-xl"
              >
                <div
                  className={`p-4 rounded-full border-4 border-slate-950 ${
                    index % 2 === 0 ? "bg-rose-600" : "bg-yellow-600"
                  } shadow-lg mb-4`}
                >
                  <step.icon className="w-6 h-6 text-slate-100" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 max-w-xs">
                  {step.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Knowledge Transfer Visuals (Docs, Teams) */}
      <Section className="mb-20">
        <div className="p-10 rounded-3xl bg-slate-800/60 border border-slate-700 shadow-xl">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
            Ensuring Success: Comprehensive Handoff
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto text-center mb-10">
            A prototype is useless without clear documentation. We ensure your
            team can take ownership and scale with confidence.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {transferSections.map((sec) => (
              <div
                key={sec.title}
                className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col items-center text-center"
              >
                <div className="p-4 rounded-full bg-slate-700/50 mb-4">
                  {sec.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {sec.title}
                </h3>
                <p className="text-sm text-slate-400">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Final CTA Block */}
      <Section className="mb-24">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800/60 shadow-2xl shadow-rose-900/20">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Ready to validate your next big idea?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Stop guessing and start building. Let's scope your Proof of Concept
            today.
          </p>
          <button
            className="mt-8 px-10 py-4 group bg-rose-600 text-white font-bold text-lg rounded-full shadow-xl shadow-rose-900/50 hover:bg-rose-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
            onClick={() =>
              console.log("Final CTA: Book an R&D Call (Placeholder)")
            }
          >
            Book a Strategy Workshop
            <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Section>
    </main>
  );
}

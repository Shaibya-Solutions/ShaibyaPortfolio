"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import {
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaLock,
  FaRobot,
  FaRocket,
} from "react-icons/fa";
import {
  FaGears,
  FaCodeBranch,
  FaPython,
  FaDocker,
  FaCloud,
} from "react-icons/fa6";
import { SiTensorflow } from "react-icons/si";

export default function AIDetailPage() {
  // --- Data for Capabilities Grid (What We Solve) ---
  const capabilities = [
    {
      icon: <FaChartLine className="w-8 h-8 text-cyan-400" />,
      title: "Predictive Insights & Forecasting",
      content:
        "Transforming historical data into precise, actionable predictions to optimize inventory, finance, and logistics.",
    },
    {
      icon: <FaRobot className="w-8 h-8 text-green-400" />,
      title: "Hyper-Automation & MLOps",
      content:
        "Automate complex, multi-step business processes from data ingestion to model retraining in production.",
    },
    {
      icon: <FaGears className="w-8 h-8 text-indigo-400" />,
      title: "Generative AI & LLM Integration",
      content:
        "Custom RAG (Retrieval-Augmented Generation) systems, fine-tuning, and integrating conversational AI.",
    },
    {
      icon: <FaLock className="w-8 h-8 text-blue-400" />,
      title: "Responsible AI & Governance",
      content:
        "Bias detection, explainability (XAI), and setting ethical guardrails for compliant, trustworthy systems.",
    },
  ];

  // --- Data for Tech Stack Badges ---
  const techStack = [
    {
      name: "Python / R",
      FaIcon: FaPython,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      name: "TensorFlow",
      FaIcon: SiTensorflow,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      name: "PyTorch",
      FaIcon: FaRobot,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      name: "LangChain",
      FaIcon: FaCodeBranch,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      name: "Kubernetes",
      FaIcon: FaDocker,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
    },
    {
      name: "MLflow",
      FaIcon: FaChartLine,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      name: "BigQuery",
      FaIcon: FaDatabase,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      name: "GCP / AWS / Azure",
      FaIcon: FaCloud,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

  // --- Data for MLOps Workflow (Case Study replacement) ---
  const mlopsSteps = [
    {
      title: "Data Ingestion",
      content: "Robust ETL pipelines built for continuous data flow.",
      icon: <FaDatabase className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Training Pipeline",
      content: "Automated hyperparameter tuning and model versioning.",
      icon: <FaBrain className="w-5 h-5 text-blue-400" />,
    },
    {
      title: "Deployment",
      content: "Safe, containerized deployment via API endpoints.",
      icon: <FaRocket className="w-5 h-5 text-green-400" />,
    },
    {
      title: "Monitoring & Retraining",
      content: "Real-time drift detection and automated retraining loops.",
      icon: <FaGears className="w-5 h-5 text-indigo-400" />,
    },
  ];

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section for AI - Futuristic, Data-Driven */}
      <Section className="mt-16 mb-24">
        <div className="relative border border-cyan-700/60 rounded-3xl p-6 md:p-20 bg-slate-900/50 overflow-hidden shadow-2xl">
          {/* Animated/Glowing Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-900/5 to-transparent opacity-80"></div>
          <div className="absolute inset-0 z-0">
            {/* Mock circuit or particle animation placeholder */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-cyan-400 blur-sm animate-pulse-slow delay-1000"></div>
            <div className="absolute bottom-1/3 right-1/3 w-5 h-5 rounded-full bg-indigo-400 blur-md animate-pulse-slow delay-500"></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-blue-400 blur-sm animate-pulse-slow"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Decoding the Future with{" "}
              <span className="text-cyan-400">Production-Grade AI</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
              Building intelligent systems, from predictive models to
              **Generative AI**, integrated seamlessly into your MLOps pipeline
              for guaranteed performance and value.
            </p>
            <button
              className="mt-10 px-10 py-4 group bg-cyan-600 text-white font-bold text-lg rounded-full shadow-xl shadow-cyan-900/50 hover:bg-cyan-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
              onClick={() => console.log("Hero CTA: Start AI Project")}
            >
              Start Your AI Project Roadmap
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

      {/* 2. Capabilities Grid (What We Solve) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          What We Solve: The Core AI Challenges
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col transition duration-300 hover:border-cyan-500"
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
          Proven & Modern Tech Stack
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

      {/* 4. MLOps Workflow Visualization (Case Study/Process Focus) */}
      <Section className="mb-20">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
            The Delivery Engine
          </span>
          <h2 className="text-4xl font-extrabold text-white mt-2">
            The Production MLOps Workflow
          </h2>
        </div>
        <div className="relative">
          <div className="grid lg:grid-cols-4 gap-8">
            {mlopsSteps.map((step, index) => (
              <div
                key={step.title}
                className="group p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg transition duration-300 hover:border-blue-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-full bg-slate-800 group-hover:bg-cyan-600 transition-colors">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-extrabold text-cyan-400 group-hover:text-white">
                    0{index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400">{step.content}</p>
              </div>
            ))}
          </div>
          {/* Connecting Arrows Placeholder */}
          <div className="absolute top-[calc(50%)] left-0 right-0 h-1 hidden lg:flex justify-between px-10">
            <div className="w-full h-full flex items-center">
              <div className="h-0.5 bg-slate-700 flex-grow"></div>
              <svg
                className="w-5 h-5 text-slate-700 -ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L10 0l-2 2h4z" transform="rotate(90 12 12)" />
              </svg>
            </div>
            <div className="w-full h-full flex items-center">
              <div className="h-0.5 bg-slate-700 flex-grow"></div>
              <svg
                className="w-5 h-5 text-slate-700 -ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L10 0l-2 2h4z" transform="rotate(90 12 12)" />
              </svg>
            </div>
            <div className="w-full h-full flex items-center">
              <div className="h-0.5 bg-slate-700 flex-grow"></div>
              <svg
                className="w-5 h-5 text-slate-700 -ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L10 0l-2 2h4z" transform="rotate(90 12 12)" />
              </svg>
            </div>
            <div className="w-full h-full flex items-center">
              {/* No arrow at the end */}
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Benefits / Why It Matters (Updated style) */}
      <Section className="mb-20">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
            Tangible ROI
          </span>
          <h2 className="text-4xl font-extrabold text-white mt-2">
            Measurable Business Value
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              label: "Cost Reduction",
              value: "40%",
              desc: "Lower operational expenses through process automation.",
            },
            {
              label: "Prediction Accuracy",
              value: "98.5%",
              desc: "High-fidelity models for critical business decisions.",
            },
            {
              label: "Model Uptime",
              value: "99.99%",
              desc: "Continuous monitoring ensures reliable production performance.",
            },
            {
              label: "Development Speed",
              value: "3X Faster",
              desc: "Accelerated deployment using MLOps automation.",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-slate-800/60 bg-slate-900/70 text-center shadow-lg"
            >
              <div className="text-5xl font-extrabold text-cyan-400">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white mt-1">
                {stat.label}
              </div>
              <p className="text-sm text-slate-400 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Final CTA Block */}
      <Section className="mb-24">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800/60 shadow-2xl shadow-cyan-900/20">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Ready to integrate intelligence into your operations?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Schedule a session with our data scientists to define your path to
            AI success.
          </p>
          <button
            className="mt-8 px-10 py-4 group bg-cyan-600 text-white font-bold text-lg rounded-full shadow-xl shadow-cyan-900/50 hover:bg-cyan-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
            onClick={() =>
              console.log("Final CTA: Book an AI Call (Placeholder)")
            }
          >
            Start a Data Strategy Session
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

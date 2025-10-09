"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
// New import for LightRays component
import LightRays from "@/components/LightRays";
import {
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaLock,
  FaRobot,
  FaRocket,
  FaDollarSign, // For Cost Efficiency
  FaHourglassHalf, // For 24/7 Productivity
  FaCheckCircle, // For Improved Accuracy
  FaUserFriends, // For Personalized Experiences
  FaLightbulb, // General Insights
} from "react-icons/fa";
// Removed unnecessary imports for Fa6, SiTensorflow

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
      icon: <FaBrain className="w-8 h-8 text-indigo-400" />,
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

  // --- New Data for Business Insights ---
  const AI_INSIGHTS = [
    {
      icon: <FaRocket className="w-5 h-5 text-cyan-400" />,
      title: "Smarter Decisions",
      details:
        "AI turns data into insights. It helps you understand your customers, predict trends, and make faster, more confident business decisions. Example: Know what products will sell next month or which customers might leave before it happens.",
    },
    {
      icon: <FaDollarSign className="w-5 h-5 text-green-400" />,
      title: "Cost Efficiency",
      details:
        "AI automates time-consuming tasks — from data entry to customer service — so your team can focus on high-value work. Save time, reduce mistakes, and cut down on manual labor costs.",
    },
    {
      icon: <FaHourglassHalf className="w-5 h-5 text-purple-400" />,
      title: "24/7 Productivity",
      details:
        "Machines don’t need breaks. AI tools can analyze data, process orders, or handle chats day and night. Your business keeps moving even when you’re offline.",
    },
    {
      icon: <FaCheckCircle className="w-5 h-5 text-yellow-400" />,
      title: "Improved Accuracy",
      details:
        "Unlike humans, AI doesn’t get tired or distracted. It keeps learning from new data, improving precision over time. From detecting fraud to ensuring quality control — accuracy only gets better.",
    },
    {
      icon: <FaUserFriends className="w-5 h-5 text-indigo-400" />,
      title: "Personalized Experiences",
      details:
        "AI can tailor content, recommendations, and offers for every user. Think Netflix suggestions or Amazon product recommendations — but for your customers.",
    },
  ];

  const TANGIBLE_BENEFITS = [
    {
      metric: "30–50%",
      benefit: "Reduced operational costs",
      impact: "Automating repetitive work",
    },
    {
      metric: "2× faster",
      benefit: "Decision-making speed",
      impact: "Real-time analytics & insights",
    },
    {
      metric: "95%+",
      benefit: "Accuracy improvement",
      impact: "Data-driven forecasting",
    },
    {
      metric: "24/7 uptime",
      benefit: "Continuous monitoring",
      impact: "No downtime or human error",
    },
  ];

  // Utility function for scrolling
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section for AI - Updated to full-width, centered LightRays style */}
      <Section className="mt-16 mb-24">
        {/* Full-width container: Removed border/shadow/rounding to make it full background effect */}
        <div className="relative p-6 md:p-20 bg-slate-950/90 overflow-hidden min-h-[600px] flex flex-col justify-end items-center">
          {/* LightRays Component - Stretched across the top half of the container */}
          <div className="absolute top-0 left-0 right-0 h-[80%] w-full">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>

          {/* Centered Text Content & Buttons - Positioned below the light source */}
          <div className="relative z-20 max-w-4xl mx-auto text-center pt-24 pb-10">
            <h1 className="text-5xl sm:text-7xl lg:text-[4.5rem] font-extrabold text-white leading-snug tracking-tight text-center">
              Innovate Faster. Achieve More. With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                AI Solutions
              </span>
              .
            </h1>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary Button */}
              <button
                className="px-8 py-3 group bg-cyan-600 text-white font-bold text-lg rounded-full shadow-xl shadow-cyan-900/50 hover:bg-cyan-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center"
                onClick={() => console.log("Hero CTA: Start AI Project")}
              >
                Start with AI
              </button>

              {/* Secondary/Learn More Button (Soft) */}
              <button
                className="px-8 py-3 text-lg font-bold rounded-full border border-slate-700 text-slate-300 bg-slate-800/50 hover:bg-slate-800 transition duration-300 transform hover:scale-[1.05] active:scale-95"
                onClick={() => scrollToSection("ai-insights-section")} // Updated scroll target
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Capabilities Grid (What We Solve) - Kept this section */}
      <Section className="mb-20" id="capabilities-section">
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

      {/* 3. New Insights and Benefits Section (Replacing Tech Stack and MLOps) */}
      <Section className="mb-20" id="ai-insights-section">
        {" "}
        {/* Added ID here */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
            {/* Using Brain icon for the title based on user request */}
            <FaBrain className="inline-block mr-2 w-4 h-4 align-middle" />
            Why Choose AI Solutions
          </span>
          <h2 className="text-4xl font-extrabold text-white mt-2">
            The Smart Way to Grow Your Business
          </h2>
        </div>
        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:px-12">
          {AI_INSIGHTS.map((insight) => (
            <div
              key={insight.title}
              className="group p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col transition duration-300 hover:border-indigo-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-slate-800/50 transition-colors duration-300 group-hover:bg-indigo-600/30">
                  {insight.icon}
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">
                  {insight.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400 whitespace-pre-line">
                {insight.details}
              </p>
            </div>
          ))}
        </div>
        {/* Tangible Benefits Table/Summary */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
              <FaLightbulb className="inline-block mr-2 w-4 h-4 align-middle" />
              Tangible Benefits
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full rounded-xl overflow-hidden bg-slate-900/70 border border-slate-800/60 shadow-lg">
              <thead className="bg-slate-800/70 border-b border-slate-700">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                    Benefit
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {TANGIBLE_BENEFITS.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-800/50 transition duration-150"
                  >
                    <td className="py-4 px-6 whitespace-nowrap text-lg font-bold text-white">
                      {item.metric}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-base text-slate-300">
                      {item.benefit}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-400">
                      {item.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Final Summary */}
          <div className="mt-8 p-6 rounded-xl border border-slate-800/60 bg-slate-900/70">
            <p className="text-lg font-semibold text-white">
              <span className="text-cyan-400">💬 In short:</span>
              <br />
              AI helps your business{" "}
              <span className="text-indigo-400">
                work faster, smarter, and more efficiently
              </span>{" "}
              — without hiring a huge team. It’s like having a digital assistant
              that never sleeps and keeps learning how to serve you better.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

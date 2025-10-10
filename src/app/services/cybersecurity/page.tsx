"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import {
  FaLock,
  FaShieldAlt,
  FaBug,
  FaSearch,
  FaClipboardCheck,
  FaTerminal,
  FaChartLine,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";

export default function CybersecurityDetailPage() {
  // --- Data for Core Services Grid ---
  const coreServices = [
    {
      icon: <FaBug className="w-8 h-8 text-red-500" />,
      title: "Vulnerability Scanning & Audits",
      content:
        "Automated and manual code analysis to identify and remediate security weaknesses across your entire stack.",
    },
    {
      icon: <FaTerminal className="w-8 h-8 text-green-500" />,
      title: "Penetration Testing (Red Teaming)",
      content:
        "Simulating real-world attacks to find zero-day exploits and test the resilience of your production environment.",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-cyan-500" />,
      title: "Secure Architecture Design",
      content:
        "Building 'security-by-design' cloud architectures that minimize the attack surface from day one.",
    },
    {
      icon: <FaClipboardCheck className="w-8 h-8 text-yellow-500" />,
      title: "Compliance & Risk Management",
      content:
        "Assisting with HIPAA, GDPR, SOC 2, and other regulatory compliance frameworks to protect your business legally.",
    },
  ];

  // --- Data for Risk Reduction Metrics ---
  const riskMetrics = [
    {
      value: "95%",
      label: "Vulnerability Reduction",
      color: "text-green-400",
      desc: "Average improvement after initial remediation.",
    },
    {
      value: "48h",
      label: "Incident Response Time",
      color: "text-red-400",
      desc: "Average time to contain a high-severity threat.",
    },
    {
      value: "24/7",
      label: "Monitoring Coverage",
      color: "text-cyan-400",
      desc: "Continuous monitoring of logs and threat intelligence feeds.",
    },
  ];

  // --- Data for Process Timeline ---
  const processSteps = [
    {
      title: "1. Scope & Threat Modeling",
      content:
        "Defining the perimeter, identifying high-value targets, and assessing potential risks.",
      icon: FaSearch,
    },
    {
      title: "2. Attack Simulation",
      content:
        "Executing penetration tests using both automated tools and expert manual techniques.",
      icon: FaLaptopCode,
    },
    {
      title: "3. Reporting & Prioritization",
      content:
        "Delivering a prioritized report of findings, categorized by severity and exploitability.",
      icon: FaClipboardCheck,
    },
    {
      title: "4. Remediation & Re-test",
      content:
        "Guiding your team through fix implementation and conducting a final verification test.",
      icon: FaCheckCircle,
    },
  ];

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* 1. Unique Hero Section - Terminal/Hacker Aesthetic */}
      <Section className="mt-16 mb-24">
        <div className="relative border border-green-700/60 rounded-3xl p-6 md:p-20 bg-slate-900/50 overflow-hidden shadow-2xl">
          {/* Neon Grid/Hacker Background */}
          <div className="absolute inset-0 z-0 opacity-10 bg-grid-pattern [background-size:20px_20px] [background-image:linear-gradient(to_right,rgba(0,255,0,.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,.1)_1px,transparent_1px)]"></div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <FaLock className="w-16 h-16 text-green-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Defend Your Future with{" "}
              <span className="text-green-400">
                Security-First Architecture
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
              From **Red Teaming** to **Compliance Audits**, we proactively hunt
              vulnerabilities and build resilient systems to withstand modern
              cyber threats.
            </p>
            <div className="mt-10 mx-auto max-w-md p-4 rounded-xl bg-slate-950 border border-green-700 font-mono text-left">
              <p className="text-green-500 mb-1">
                $ initializing security scan...
              </p>
              <p className="text-white mb-1">
                Checking targets:{" "}
                <span className="text-yellow-400">API, Web, Mobile</span>
              </p>
              <p className="text-green-500 animate-pulse">
                $ scan complete.{" "}
                <span className="text-red-500">
                  3 critical vulnerabilities found.
                </span>
              </p>
            </div>
            <button
              className="mt-8 px-10 py-4 group bg-green-600 text-slate-950 font-bold text-lg rounded-full shadow-xl shadow-green-900/50 hover:bg-green-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
              onClick={() => console.log("Hero CTA: Start Security Audit")}
            >
              Start Security Audit
              <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </Section>

      {/* 2. Core Services Grid (Vulnerability Scan, Red Teaming, Compliance) */}
      <Section className="mb-20">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          Our Proactive Defense Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col transition duration-300 hover:border-green-500"
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

      {/* 3. Process Timeline */}
      <Section className="mb-24">
        <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
          Our Penetration Testing Methodology
        </h2>
        <div className="relative">
          {/* Horizontal Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-green-700/50 transform -translate-y-1/2 hidden lg:block"></div>

          <div className="grid lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center p-4 relative z-10 bg-slate-950/90 rounded-xl"
              >
                <div
                  className={`p-4 rounded-full border-4 border-slate-950 ${
                    index % 2 === 0 ? "bg-green-600" : "bg-red-600"
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

      {/* 4. Risk Reduction Metrics */}
      <Section className="mb-20">
        <div className="p-10 rounded-3xl bg-slate-800/60 border border-slate-700 shadow-xl">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
            Quantifiable Risk Reduction
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {riskMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-6 rounded-xl bg-slate-900/70 border border-slate-800"
              >
                <FaChartLine
                  className={`w-8 h-8 mx-auto mb-3 ${metric.color}`}
                />
                <div className={`text-6xl font-extrabold ${metric.color}`}>
                  {metric.value}
                </div>
                <p className="text-xl font-semibold text-white mt-2">
                  {metric.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Final CTA Block */}
      <Section className="mb-24">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800/60 shadow-2xl shadow-green-900/20">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Don't wait for a breach. Secure your platform today.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Schedule a confidential consultation to understand your unique
            threat profile.
          </p>
          <button
            className="mt-8 px-10 py-4 group bg-green-600 text-slate-950 font-bold text-lg rounded-full shadow-xl shadow-green-900/50 hover:bg-green-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto"
            onClick={() =>
              console.log("Final CTA: Book Security Consultation (Placeholder)")
            }
          >
            Book a Security Review
            <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Section>
      
      <SiteFooter />
    </main>
  );
}

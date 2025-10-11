"use client";

import React from "react";
import { Section } from "./section";
import { FaArrowRight } from "react-icons/fa";

interface ServiceCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonAction?: () => void;
  colorTheme?:
    | "yellow"
    | "cyan"
    | "indigo"
    | "purple"
    | "green"
    | "pink"
    | "rose";
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = "Ready to build something amazing?",
  description = "Let's discuss your project and turn your vision into reality.",
  buttonText = "Get Started",
  buttonAction = () =>
    window.open(
      "https://wa.me/917498341146?text=Hi!%20I'm%20interested%20in%20your%20services.",
      "_blank"
    ),
  colorTheme = "cyan",
}) => {
  // Color theme configurations
  const themeConfig = {
    yellow: {
      gradient: "from-slate-900 to-slate-950",
      button:
        "bg-yellow-600 hover:bg-yellow-500 text-slate-950 shadow-yellow-900/50",
      border: "border-slate-800/60",
    },
    cyan: {
      gradient: "from-slate-900 to-slate-950",
      button: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/50",
      border: "border-slate-800/60",
    },
    indigo: {
      gradient: "from-slate-900 to-slate-950",
      button:
        "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/50",
      border: "border-slate-800/60",
    },
    purple: {
      gradient: "from-slate-900 to-slate-950",
      button:
        "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50",
      border: "border-slate-800/60",
    },
    green: {
      gradient: "from-slate-900 to-slate-950",
      button: "bg-green-600 hover:bg-green-500 text-white shadow-green-900/50",
      border: "border-slate-800/60",
    },
    pink: {
      gradient: "from-slate-900 to-slate-950",
      button: "bg-pink-600 hover:bg-pink-500 text-white shadow-pink-900/50",
      border: "border-slate-800/60",
    },
    rose: {
      gradient: "from-slate-900 to-slate-950",
      button: "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50",
      border: "border-slate-800/60",
    },
  };

  const theme = themeConfig[colorTheme];

  return (
    <Section className="mb-24">
      <div
        className={`relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr ${theme.gradient} border ${theme.border} shadow-2xl shadow-${colorTheme}-900/20`}
      >
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          {description}
        </p>
        <button
          className={`mt-8 px-10 py-4 group ${theme.button} font-bold text-lg rounded-full shadow-xl transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto`}
          onClick={buttonAction}
        >
          {buttonText}
          <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </Section>
  );
};

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
    | "rose"
    | "amber";
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
  colorTheme = "amber",
}) => {
  // All themes now use a consistent amber/light palette
  const theme = {
    gradient: "from-amber-50 to-stone-50",
    button: "btn-brand",
    border: "border-amber-100",
    titleColor: "text-slate-900",
    descColor: "text-slate-500",
  };

  return (
    <Section className="mb-24">
      <div
        className={`relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-tr ${theme.gradient} border ${theme.border} shadow-lg`}
      >
        {/* Subtle amber glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-30 blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% -20%, rgba(217, 119, 6, 0.2), transparent 70%)`,
          }}
        />
        <div className="relative z-10">
          <h2 className={`text-4xl font-extrabold ${theme.titleColor} sm:text-5xl`}>
            {title}
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${theme.descColor}`}>
            {description}
          </p>
          <button
            className={`mt-8 px-10 py-4 group ${theme.button} font-bold text-lg flex items-center justify-center mx-auto`}
            onClick={buttonAction}
          >
            {buttonText}
            <FaArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </Section>
  );
};

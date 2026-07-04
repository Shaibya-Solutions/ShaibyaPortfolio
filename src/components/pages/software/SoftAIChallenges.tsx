"use client";

import { motion } from "framer-motion";
import { LineChart, Bot, BrainCircuit, Lock } from "lucide-react";
import React, { useState } from "react";

const challenges = [
  {
    title: "Predictive Insights & Forecasting",
    desc: "Transforming historical data into precise, actionable predictions to optimize inventory, finance, and logistics.",
    icon: <LineChart className="w-6 h-6 text-cyan-500" />,
    color: "cyan",
    bgClass: "bg-cyan-50",
    borderClass: "border-cyan-200"
  },
  {
    title: "Hyper-Automation & MLOps",
    desc: "Automate complex, multi-step business processes from data ingestion to model retraining in production.",
    icon: <Bot className="w-6 h-6 text-emerald-500" />,
    color: "emerald",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-200"
  },
  {
    title: "Generative AI & LLM Integration",
    desc: "Custom RAG (Retrieval-Augmented Generation) systems, fine-tuning, and integrating conversational AI.",
    icon: <BrainCircuit className="w-6 h-6 text-purple-500" />,
    color: "purple",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200"
  },
  {
    title: "Responsible AI & Governance",
    desc: "Bias detection, explainability (XAI), and setting ethical guardrails for compliant, trustworthy systems.",
    icon: <Lock className="w-6 h-6 text-blue-500" />,
    color: "blue",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200"
  },
];

function FlipCard({ challenge, index }: { challenge: typeof challenges[0], index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="perspective-1000 w-full h-[320px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700 ease-in-out"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-3xl p-8 border border-slate-200 flex flex-col items-start shadow-xl hover:shadow-2xl transition-shadow">
          <div className={`w-16 h-12 ${challenge.bgClass} rounded-2xl flex items-center justify-center mb-8 border ${challenge.borderClass} shadow-sm`}>
            {challenge.icon}
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{challenge.title}</h3>
          <p className="text-slate-600 font-medium">{challenge.desc}</p>
        </div>

        {/* Back of Card (Flipped) */}
        <div className={`absolute inset-0 backface-hidden bg-white rounded-3xl p-8 border-2 flex flex-col items-center justify-center shadow-xl text-center ${challenge.borderClass}`}
             style={{ 
               transform: "rotateY(180deg)",
               boxShadow: challenge.color === "cyan" ? "0 0 40px rgba(34,211,238,0.2)" : 
                          challenge.color === "emerald" ? "0 0 40px rgba(52,211,153,0.2)" : 
                          challenge.color === "purple" ? "0 0 40px rgba(168,85,247,0.2)" : 
                          "0 0 40px rgba(96,165,250,0.2)"
             }}
        >
          <div className="mb-6 scale-150">
            {challenge.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Solve this challenge</h3>
          <button className={`px-6 py-2 rounded-full ${challenge.bgClass} border ${challenge.borderClass} text-slate-900 font-bold hover:scale-105 transition-transform`}>
            Learn How
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SoftAIChallenges() {
  return (
    <section className="relative py-32 bg-slate-50 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 text-center mb-20"
        >
          What We Solve: The Core AI Challenges
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((c, idx) => (
            <FlipCard key={idx} challenge={c} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

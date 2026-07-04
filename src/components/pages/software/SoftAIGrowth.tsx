"use client";

import { motion } from "framer-motion";
import { Rocket, DollarSign, Clock, CheckCircle2 } from "lucide-react";

const growthFactors = [
  {
    title: "Smarter Decisions",
    desc: "AI turns data into insights. It helps you understand your customers, predict trends, and make faster, more confident business decisions. Example: Know what products will sell next month or which customers might leave before it happens.",
    icon: <Rocket className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Cost Efficiency",
    desc: "AI automates time-consuming tasks — from data entry to customer service — so your team can focus on high-value work. Save time, reduce mistakes, and cut down on manual labor costs.",
    icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
  },
  {
    title: "24/7 Productivity",
    desc: "Machines don't need breaks. AI tools can analyze data, process orders, or handle chats day and night. Your business keeps moving even when you're offline.",
    icon: <Clock className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "Improved Accuracy",
    desc: "Unlike humans, AI doesn't get tired or distracted. It keeps learning from new data, improving precision over time. From detecting fraud to ensuring quality control — accuracy only gets better.",
    icon: <CheckCircle2 className="w-5 h-5 text-amber-500" />,
  },
];

export function SoftAIGrowth() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-sm tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Why Choose AI Solutions
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900"
          >
            The Smart Way to Grow Your Business
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {growthFactors.map((factor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-1 rounded-3xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-slate-50"
            >
              {/* Animated Glowing Border (Light Theme variant) */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-emerald-300 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Spinning gradient for continuous glow effect on hover */}
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff00_50%,#06b6d4_100%)] opacity-0 group-hover:opacity-50 group-hover:animate-spin-slow transition-opacity duration-500" />
              
              {/* Inner Card Content */}
              <div className="relative h-full bg-white rounded-[22px] p-8 md:p-10 z-10 border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {factor.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{factor.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {factor.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

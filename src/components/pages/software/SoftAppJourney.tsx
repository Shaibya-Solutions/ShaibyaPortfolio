"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, PenTool, Smartphone, Rocket, Users, Activity, Star } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: <PenTool className="w-5 h-5 text-white" />,
    title: "1. Wireframing & Prototyping",
    desc: "Designing the complete user flow, information architecture, and high-fidelity prototype.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Code2 className="w-5 h-5 text-white" />,
    title: "2. Core Development & Testing",
    desc: "Building the main features with unit and UI testing, ensuring performance benchmarks are met.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <Users className="w-5 h-5 text-white" />,
    title: "3. Beta & User Feedback",
    desc: "Private and public beta testing, gathering actionable feedback, and final polishing.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Rocket className="w-5 h-5 text-white" />,
    title: "4. Store Submission & Launch",
    desc: "Preparing store assets, managing submission requirements, and post-launch maintenance.",
    color: "from-cyan-500 to-teal-500",
  },
];

export function SoftAppJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Client Success Stats (Screenshot 4 equivalent) */}
        <div className="mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="bg-slate-900 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10" />
            
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16 relative z-10">
              Client Success: App Performance & Retention
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">3M+</div>
                <div className="text-slate-300 font-medium">Users Served</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 mb-2">99.9%</div>
                <div className="text-slate-300 font-medium">Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 flex flex-col items-center justify-center">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-2">5-Star</div>
                <div className="text-slate-300 font-medium flex items-center gap-2">App Store Rating <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" /></div>
              </div>
            </div>

            <div className="bg-purple-950/50 rounded-2xl p-8 border border-purple-500/30 relative z-10">
              <p className="text-lg md:text-xl text-purple-100 italic font-light mb-4">
                "The final app exceeded all our expectations. The performance is flawless, and the smooth UX instantly boosted user retention."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-300" />
                </div>
                <span className="text-purple-300 font-medium text-sm">-- Head of Digital Transformation, Global Logistics Co.</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The App Journey (Screenshot 5 equivalent) */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 text-center mb-24"
          >
            The App Development Journey
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Animated Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full hidden md:block" />
            <motion.div 
              style={{ height: lineHeight }}
              className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-purple-500 via-indigo-500 to-teal-500 -translate-x-1/2 rounded-full hidden md:block" 
            />

            <div className="space-y-24">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""} gap-8 md:gap-16`}>
                    
                    {/* Content Box */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                      className="w-full md:w-1/2"
                    >
                      <div className={`bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xl ${isEven ? "md:text-left" : "md:text-right text-left"}`}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                        <p className="text-slate-600 font-medium text-lg leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>

                    {/* Node/Icon (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-xl border-4 border-slate-50 items-center justify-center z-10">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        {step.icon}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

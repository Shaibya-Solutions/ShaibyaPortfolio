"use client";

import { motion } from "framer-motion";
import { Database, Network, Layout, Rocket, Box, Braces, TerminalSquare, Layers, Cpu, Cloud, GitBranch } from "lucide-react";

const techStack = [
  { name: "React / Next.js", icon: <Layout className="w-4 h-4 text-cyan-500" /> },
  { name: "Node.js", icon: <Braces className="w-4 h-4 text-green-500" /> },
  { name: "TypeScript", icon: <TerminalSquare className="w-4 h-4 text-blue-600" /> },
  { name: "Tailwind CSS", icon: <Layers className="w-4 h-4 text-sky-400" /> },
  { name: "PostgreSQL", icon: <Database className="w-4 h-4 text-indigo-500" /> },
  { name: "Kubernetes", icon: <Box className="w-4 h-4 text-blue-500" /> },
  { name: "GraphQL", icon: <Network className="w-4 h-4 text-pink-500" /> },
  { name: "Git & CI/CD", icon: <GitBranch className="w-4 h-4 text-orange-500" /> },
];

const timelineSteps = [
  {
    icon: <Cpu className="w-6 h-6 text-white" />,
    title: "1. Architecture",
    desc: "Defining the core application topology, scaling strategy, and data schemas.",
  },
  {
    icon: <Database className="w-6 h-6 text-white" />,
    title: "2. Backend Build",
    desc: "Implementing secure APIs, business logic, and database integration.",
  },
  {
    icon: <Layout className="w-6 h-6 text-white" />,
    title: "3. Frontend UI/UX",
    desc: "Developing pixel-perfect, responsive user interfaces based on high-fidelity designs.",
  },
  {
    icon: <Cloud className="w-6 h-6 text-white" />,
    title: "4. Deployment & Scale",
    desc: "Automating zero-downtime deployment and setting up monitoring systems.",
  },
];

export function SoftTechStackTimeline() {
  return (
    <section className="relative py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Tech Stack Section */}
        <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 text-center mb-12"
          >
            The Next-Generation Tech Stack
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
          >
            {techStack.map((tech, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-full border border-slate-200 hover:border-orange-200 hover:bg-orange-50 transition-colors"
              >
                {tech.icon}
                <span className="font-semibold text-slate-700">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 text-center mb-24"
          >
            The Full-Stack Delivery Timeline
          </motion.h2>

          <div className="relative">
            {/* The Connecting Line (Background) */}
            <div className="absolute top-8 left-0 w-full h-1 bg-slate-200 -z-10 hidden md:block" />
            
            {/* The Connecting Line (Animated Foreground) */}
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-orange-400 to-rose-500 -z-10 hidden md:block" 
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
              {timelineSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.3 }}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Step Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30 mb-8 border-4 border-white">
                    {step.icon}
                  </div>
                  
                  {/* Step Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed px-2">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

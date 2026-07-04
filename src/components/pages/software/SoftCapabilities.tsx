"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Server, CloudCog, Activity, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const capabilities = [
  {
    icon: <Layers className="w-8 h-8 text-blue-500" />,
    title: "Modern Frontend (Next.js)",
    description: "High-performance, accessible user interfaces using React, Next.js, and TypeScript, optimized for SEO and Core Web Vitals.",
    bgGlow: "from-blue-500/10 to-transparent",
    delay: 0,
  },
  {
    icon: <Server className="w-8 h-8 text-emerald-500" />,
    title: "Scalable Backend & APIs",
    description: "Building secure, reliable, and microservice-ready APIs (Node.js, Python) optimized for speed and concurrency.",
    bgGlow: "from-emerald-500/10 to-transparent",
    delay: 0.1,
  },
  {
    icon: <CloudCog className="w-8 h-8 text-orange-500" />,
    title: "DevOps & Cloud Automation",
    description: "Infrastructure provisioning, CI/CD pipelines, containerization (Docker/Kubernetes), and secure infrastructure-as-code (IaC).",
    bgGlow: "from-orange-500/10 to-transparent",
    delay: 0.2,
  },
  {
    icon: <Activity className="w-8 h-8 text-rose-500" />,
    title: "Performance & Observability",
    description: "Deep optimization for Core Web Vitals, paired with real-time logging, metrics, and APM for continuous stability.",
    bgGlow: "from-rose-500/10 to-transparent",
    delay: 0.3,
  },
];

export function SoftCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} className="relative py-32 bg-white overflow-hidden min-h-screen flex items-center">
      
      {/* Background large watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] lg:text-[20rem] font-bold text-slate-50 whitespace-nowrap pointer-events-none select-none">
        CAPABILITY
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Sticky Left Content */}
          <div className="lg:w-1/3 lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6 border border-orange-200">
                <span>The Engine Room</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
                Comprehensive Web & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Backend Capabilities</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
                We don't just build apps, we engineer entire digital ecosystems designed for massive scale and flawless performance.
              </p>
            </motion.div>
          </div>

          {/* Right Parallax Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 relative w-full">
            
            {/* Column 1 (moves slightly slower) */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-6">
              {[capabilities[0], capabilities[2]].map((cap, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cap.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        {cap.icon}
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-slate-900 transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Column 2 (moves slightly faster) */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-6 lg:mt-24">
              {[capabilities[1], capabilities[3]].map((cap, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cap.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                        {cap.icon}
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-slate-900 transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-orange-500 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

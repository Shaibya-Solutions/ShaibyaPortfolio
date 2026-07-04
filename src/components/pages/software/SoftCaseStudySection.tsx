"use client";

import { motion } from "framer-motion";
import { Globe, Server, Code } from "lucide-react";

export function SoftCaseStudySection() {
  return (
    <section className="py-32 bg-slate-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-200 shadow-xl"
        >
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 tracking-tight">
              Case Study: Enterprise Cloud Migration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Stats */}
            <div className="md:col-span-5 flex flex-col gap-4">
              
              <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-l-rose-500 border border-slate-100 shadow-sm">
                <p className="text-rose-500 font-semibold mb-1">System Uptime</p>
                <p className="text-4xl font-black text-slate-900">99.999%</p>
                <p className="text-sm text-slate-500 mt-1 uppercase tracking-wide">Post Migration</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-100 shadow-sm">
                <p className="text-emerald-500 font-semibold mb-1">API Latency</p>
                <p className="text-4xl font-black text-slate-900">12ms</p>
                <p className="text-sm text-slate-500 mt-1 uppercase tracking-wide">Global Edge Average</p>
              </div>

            </div>

            {/* Right side: Description */}
            <div className="md:col-span-7 flex flex-col">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Project X Infrastructure Overhaul
              </h3>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                We implemented a resilient microservices architecture combining Kubernetes, Edge caching, and automated CI/CD pipelines, resulting in a 12x increase in deployment velocity and absolutely zero downtime.
              </p>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer transition-colors">
                  <Server className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer transition-colors">
                  <Code className="w-5 h-5" />
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}

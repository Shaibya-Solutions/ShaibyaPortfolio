"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Terminal, Code2, Database, Layout } from "lucide-react";
import React, { useRef } from "react";

export function SoftCodeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    
    // Calculate rotation limits (-15deg to 15deg max)
    rotateX.set(((e.clientY - centerY) / (rect.height / 2)) * -10);
    rotateY.set(((e.clientX - centerX) / (rect.width / 2)) * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-bold text-sm mb-6">
              <Code2 className="w-4 h-4" /> Code that scales
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
              Engineering <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Excellence</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              We don't just write code. We architect systems that are secure, maintainable, and designed to scale to millions of users seamlessly.
            </p>

            <div className="space-y-6">
              {[
                { icon: Layout, title: "Modern Stacks", desc: "React, Next.js, and TypeScript ecosystems." },
                { icon: Server, title: "Serverless Cloud", desc: "AWS, Vercel, and scalable microservices." },
                { icon: Database, title: "Global Databases", desc: "PostgreSQL, Redis, and high-availability clusters." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <item.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: 3D Code Editor */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center cursor-crosshair"
        >
          {/* Animated Glow Behind Editor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-sky-400/20 rounded-full blur-[100px]" />
          
          <motion.div
            style={{ rotateX, rotateY }}
            className="w-full max-w-[600px] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 relative z-10"
          >
            {/* Editor Header */}
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-slate-400 text-xs font-mono flex items-center gap-2">
                <Terminal className="w-3 h-3" /> main.ts
              </div>
            </div>
            
            {/* Editor Body */}
            <div className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-slate-300">
              <p><span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">Database</span>, <span className="text-amber-300">Server</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@shaibya/core'</span>;</p>
              <br/>
              <p><span className="text-purple-400">async function</span> <span className="text-blue-400">bootstrapSystem</span>() {'{'}</p>
              <p className="ml-4"><span className="text-slate-500">// Initialize high-availability cluster</span></p>
              <p className="ml-4"><span className="text-purple-400">const</span> db = <span className="text-purple-400">await</span> Database.<span className="text-blue-400">connect</span>({'{'} maxPoolSize: <span className="text-orange-400">9999</span> {'}'});</p>
              <br/>
              <p className="ml-4"><span className="text-purple-400">const</span> app = <span className="text-purple-400">new</span> <span className="text-amber-300">Server</span>({'{'}</p>
              <p className="ml-8">database: db,</p>
              <p className="ml-8">environment: <span className="text-emerald-300">'production'</span>,</p>
              <p className="ml-8">security: <span className="text-emerald-300">'military-grade'</span></p>
              <p className="ml-4">{'}'});</p>
              <br/>
              <p className="ml-4"><span className="text-purple-400">await</span> app.<span className="text-blue-400">listen</span>(<span className="text-orange-400">8080</span>, () =&gt; {'{'}</p>
              <p className="ml-8 text-slate-500">// System is live, secure, and scaling.</p>
              <p className="ml-8">console.<span className="text-blue-400">log</span>(<span className="text-emerald-300">'🚀 System running at optimal performance'</span>);</p>
              <p className="ml-4">{'}'});</p>
              <p>{'}'}</p>
              <br/>
              <p><span className="text-blue-400">bootstrapSystem</span>().<span className="text-blue-400">catch</span>(console.<span className="text-blue-400">error</span>);</p>
            </div>
            
            {/* Editor Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// Ensure you export the Server icon used above
function Server(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  )
}

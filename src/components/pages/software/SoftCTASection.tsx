"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Magnet from "@/components/ui/Magnet";
import { TerminalSquare } from "lucide-react";

export function SoftCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [codeText, setCodeText] = useState("");

  const fullCode = `const project = new Innovation({
  vision: "Limitless",
  execution: "Flawless"
});

await project.launch(); // True`;

  useEffect(() => {
    if (!isInView) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(fullCode.substring(0, i));
      i++;
      if (i > fullCode.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="relative py-40 overflow-hidden bg-white">
      {/* Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0ea5e9]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full bg-sky-900/30 border border-sky-500/30 flex items-center justify-center mb-10"
        >
          <TerminalSquare className="w-8 h-8 text-[#0ea5e9]" />
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-bold font-heading text-slate-900 mb-8">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-blue-600">Compile?</span>
        </h2>

        <div 
          ref={ref}
          className="w-full max-w-lg bg-slate-50 rounded-xl border border-slate-200 p-6 text-left shadow-2xl mb-12 min-h-[160px]"
        >
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <pre className="font-mono text-sm md:text-base text-sky-700">
            <code>
              {codeText}
              <span className="animate-pulse bg-white/50 w-2 h-4 inline-block ml-1 align-middle" />
            </code>
          </pre>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Magnet magnetStrength={1.5}>
            <button className="px-10 py-5 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-[0_0_40px_rgba(14,165,233,0.3)] text-lg">
              Start Building Now
            </button>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
}

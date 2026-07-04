"use client";

import { motion } from "framer-motion";
import { Lightbulb, MessageSquareQuote } from "lucide-react";

const benefits = [
  { metric: "30-50%", benefit: "Reduced operational costs", impact: "Automating repetitive work" },
  { metric: "2x faster", benefit: "Decision-making speed", impact: "Real-time analytics & insights" },
  { metric: "95%+", benefit: "Accuracy improvement", impact: "Data-driven forecasting" },
  { metric: "24/7 uptime", benefit: "Continuous monitoring", impact: "No downtime or human error" },
];

export function SoftAIBenefits() {
  return (
    <section className="relative py-32 bg-slate-50 overflow-hidden border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-sm tracking-widest uppercase mb-4">
            <Lightbulb className="w-4 h-4 text-cyan-500" />
            Tangible Benefits
          </div>
        </div>

        {/* The Interactive Glass Table (Light Theme) */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-xl mb-12">
          
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 border-b border-slate-200 bg-slate-100/50">
            <div className="text-cyan-600 font-bold tracking-wider text-sm uppercase">Metric</div>
            <div className="text-cyan-600 font-bold tracking-wider text-sm uppercase">Benefit</div>
            <div className="text-cyan-600 font-bold tracking-wider text-sm uppercase">Impact</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {benefits.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 border-b border-slate-100 hover:bg-cyan-50/50 transition-colors duration-300 group cursor-default"
              >
                <div className="text-3xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {row.metric}
                </div>
                <div className="text-lg text-slate-700 font-medium self-center">
                  {row.benefit}
                </div>
                <div className="text-slate-500 self-center font-medium">
                  {row.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-slate-100 to-white border border-slate-200 shadow-lg rounded-3xl p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px]" />
          
          <div className="flex items-start gap-4 relative z-10">
            <MessageSquareQuote className="w-8 h-8 text-cyan-500 shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-bold text-cyan-600 mb-4">In short:</h4>
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                AI helps your business work <strong className="text-slate-900 font-bold">faster, smarter, and more efficiently</strong> — without hiring a huge team. It's like having a digital assistant that never sleeps and keeps learning how to serve you better.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Layers, CheckCircle2, AlertCircle } from "lucide-react";
import { useRef } from "react";

const nativeData = {
  title: "Native Development",
  icon: <Heart className="w-8 h-8 text-rose-500" />,
  color: "rose",
  advantages: [
    "Highest performance and speed",
    "Full access to all device APIs/SDKs",
    "Most authentic user experience",
  ],
  considerations: [
    "Slower development time",
    "Requires two separate codebases (iOS/Android)",
  ]
};

const crossData = {
  title: "Cross-Platform (React Native)",
  icon: <Layers className="w-8 h-8 text-purple-500" />,
  color: "purple",
  advantages: [
    "Faster time-to-market",
    "Single codebase for iOS/Android",
    "Lower maintenance cost",
  ],
  considerations: [
    "Limited access to niche device APIs",
    "Slight performance trade-off in complex apps",
  ]
};

function StrategyCard({ data }: { data: typeof nativeData }) {
  return (
    <div className="w-[85vw] md:w-[600px] flex-shrink-0 bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-10">
        <div className={`p-4 rounded-2xl bg-${data.color}-50 border border-${data.color}-100`}>
          {data.icon}
        </div>
        <h3 className="text-3xl font-bold text-slate-900">{data.title}</h3>
      </div>

      <div className="flex-1 space-y-10">
        <div>
          <h4 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Advantages</h4>
          <ul className="space-y-4">
            {data.advantages.map((adv, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className={`w-6 h-6 text-emerald-500 shrink-0`} />
                <span className="text-slate-600 font-medium text-lg">{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Considerations</h4>
          <ul className="space-y-4">
            {data.considerations.map((con, i) => (
              <li key={i} className="flex items-start gap-3">
                <AlertCircle className={`w-6 h-6 text-rose-500 shrink-0`} />
                <span className="text-slate-600 font-medium text-lg">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SoftAppStrategy() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-slate-50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 text-center"
          >
            Choosing Your Platform Strategy
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-20 items-stretch pb-20 w-[max-content]">
          <StrategyCard data={nativeData} />
          <StrategyCard data={crossData} />
          
          {/* A third card to fill the scroll space, summarizing the choice */}
          <div className="w-[85vw] md:w-[500px] flex-shrink-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-[3rem] p-10 md:p-14 shadow-2xl flex flex-col h-full justify-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
             
             <h3 className="text-4xl font-bold mb-6 relative z-10">Which one to choose?</h3>
             <p className="text-xl font-medium text-purple-100 leading-relaxed relative z-10">
               If your app requires heavy processing, complex 3D rendering, or deep OS integration, go <strong className="text-white">Native</strong>.
               <br/><br/>
               If you need to move fast, test the market, and share business logic across iOS and Android, go <strong className="text-white">Cross-Platform</strong>.
             </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

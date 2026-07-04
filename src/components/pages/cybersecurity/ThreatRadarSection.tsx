"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

interface ThreatMetric {
  id: number;
  label: string;
  value: number;
  suffix?: string;
  nodeName: string;
  orbitRadius: number;
  highlightColor: string;
}

const metrics: ThreatMetric[] = [
  { id: 1, label: "Active Monitoring Nodes", value: 2450, suffix: "+", nodeName: "Edge-Sec", orbitRadius: 120, highlightColor: "#10b981" },
  { id: 2, label: "Threats Blocked/mo", value: 1.2, suffix: "M", nodeName: "Firewall", orbitRadius: 160, highlightColor: "#ef4444" },
  { id: 3, label: "Uptime Guaranteed", value: 99.99, suffix: "%", nodeName: "Cloud-Shield", orbitRadius: 200, highlightColor: "#3b82f6" },
  { id: 4, label: "Avg Response Time", value: 45, suffix: "ms", nodeName: "SOC-Alpha", orbitRadius: 240, highlightColor: "#f59e0b" },
  { id: 5, label: "Global Datacenters", value: 12, suffix: "", nodeName: "Core-Net", orbitRadius: 280, highlightColor: "#8b5cf6" },
  { id: 6, label: "Encryption Keys Rotated", value: 140, suffix: "k", nodeName: "KMS-Zero", orbitRadius: 320, highlightColor: "#14b8a6" },
];

metrics.sort((a, b) => a.orbitRadius - b.orbitRadius);

export function ThreatRadarSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const controls = useAnimation();
  const [highlightedNode, setHighlightedNode] = useState<ThreatMetric | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} className="relative flex flex-col items-center justify-center py-32 overflow-hidden bg-white border-b border-slate-200">
      {/* Radar scanning background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center">
        {/* Radar Base Rings */}
        <div className="w-[800px] h-[800px] rounded-full border border-[#10b981]/20 absolute flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border border-[#10b981]/10 absolute" />
          <div className="w-[400px] h-[400px] rounded-full border border-dashed border-[#10b981]/20 animate-[spin_60s_linear_infinite_reverse] absolute" />
          <div className="w-[200px] h-[200px] rounded-full border border-[#10b981]/20 absolute" />
        </div>

        {/* Radar Sweep */}
        <div className="w-[800px] h-[800px] rounded-full absolute animate-[spin_4s_linear_infinite]"
             style={{
               background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 0.1) 90%, rgba(16, 185, 129, 0.4) 100%)',
             }}
        >
          {/* Radar Line */}
          <div className="absolute top-0 right-1/2 w-[2px] h-1/2 bg-gradient-to-t from-[#10b981] to-transparent shadow-[0_0_15px_#10b981]" />
        </div>
      </div>

      <div className="z-10 text-center mb-24 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Global Threat <span className="text-[#10b981]">Radar</span>
        </h2>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Hover over active security nodes to decrypt real-time performance metrics and defense statistics.
        </p>
      </div>

      <div className="relative w-full max-w-2xl h-[650px] flex items-center justify-center z-10">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {metrics.map((metric) => (
            <motion.div
              key={`orbit-${metric.id}`}
              className="absolute rounded-full border border-dashed"
              style={{
                width: metric.orbitRadius * 2,
                height: metric.orbitRadius * 2,
                borderColor: highlightedNode?.id === metric.id ? metric.highlightColor : "rgba(16, 185, 129, 0.2)",
                boxShadow: highlightedNode?.id === metric.id ? `0 0 20px 2px ${metric.highlightColor}40` : "none",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          ))}
        </motion.div>

        {/* Center SOC Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-20 relative flex flex-col items-center justify-center text-center p-8 rounded-full bg-white border-4 border-[#10b981]/20 shadow-[0_0_40px_rgba(16,185,129,0.2)] w-56 h-56"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-[#10b981]/5" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 rounded-full border border-[#10b981]/20 animate-[spin_10s_linear_infinite]" />
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            {highlightedNode ? (
              <>
                <div className="text-4xl font-extrabold mb-1 drop-shadow-md" style={{ color: highlightedNode.highlightColor }}>
                  {highlightedNode.value}{highlightedNode.suffix}
                </div>
                <div className="text-sm text-slate-600 font-mono font-semibold max-w-[120px]">
                  {highlightedNode.label}
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-black text-[#10b981] mb-2 font-mono tracking-widest drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  SOC
                </div>
                <div className="text-xs text-slate-500 font-mono uppercase font-bold tracking-widest">
                  Active Core
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Orbiting Nodes */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360, transition: { duration: 40, ease: "linear", repeat: Infinity } }}
        >
          {metrics.map((metric, i) => {
            const angle = (i / metrics.length) * 2 * Math.PI;
            const x = Math.round(metric.orbitRadius * Math.cos(angle));
            const y = Math.round(metric.orbitRadius * Math.sin(angle));

            return (
              <motion.div
                key={metric.id}
                className="absolute cursor-crosshair rounded-full flex items-center justify-center transition-all duration-300"
                custom={i}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, scale: 0.2 },
                  visible: (i) => ({
                    opacity: 1,
                    scale: highlightedNode?.id === metric.id ? 1.5 : 1,
                    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
                  }),
                }}
                style={{
                  top: `calc(50% ${y >= 0 ? '+' : '-'} ${Math.abs(y)}px)`,
                  left: `calc(50% ${x >= 0 ? '+' : '-'} ${Math.abs(x)}px)`,
                  transform: `translate(-50%, -50%) rotate(-${(360 / metrics.length) * i}deg)`,
                  width: 16,
                  height: 16,
                  backgroundColor: metric.highlightColor,
                  boxShadow: `0 0 15px ${metric.highlightColor}`,
                  zIndex: highlightedNode?.id === metric.id ? 30 : 20,
                }}
                onMouseEnter={() => setHighlightedNode(metric)}
                onMouseLeave={() => setHighlightedNode(null)}
              >
                <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping" />
                
                <span
                  className="absolute text-[10px] font-mono text-slate-700 w-[120px] text-center pointer-events-none bg-white/90 px-2 py-1 rounded border border-slate-200 shadow-sm"
                  style={{ transform: `translateY(24px) rotate(${(360 / metrics.length) * i}deg)` }}
                >
                  {metric.nodeName}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

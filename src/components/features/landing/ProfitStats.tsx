"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp(props: { end: number; suffix?: string; trigger: boolean }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!props.trigger) return;
        let cur = 0;
        const step = props.end / (1600 / 16);
        const t = setInterval(() => {
            cur += step;
            if (cur >= props.end) { setVal(props.end); clearInterval(t); }
            else setVal(Math.floor(cur));
        }, 16);
        return () => clearInterval(t);
    }, [props.trigger, props.end]);
    return <>{val}{props.suffix}</>;
}

const stats = [
    { value: 10, suffix: "+", label: "Live projects", sub: "Websites, systems & MVPs across 6 industries" },
    { value: 5, suffix: "+", label: "Fitness brands", sub: "Revolution, Wave, Arnold Gold & more" },
    { value: 3, suffix: "", label: "RE clients", sub: "Live in Nagpur with proven results" },
    { value: 14, suffix: "+", label: "Collaborators", sub: "From local gyms to Bridgestone" },
];

export default function ProfitStats() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="py-24 bg-[#010D18] relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0B4E61]/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64B0C6] mb-4">Impact</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.08]">
                        Numbers that speak<br />for themselves.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 text-center hover:bg-white/[0.07] transition-colors"
                        >
                            <div className="text-5xl md:text-6xl font-black text-white mb-2">
                                <CountUp end={s.value} suffix={s.suffix} trigger={isInView} />
                            </div>
                            <p className="text-[#64B0C6] font-semibold text-sm mb-1 uppercase tracking-wider">{s.label}</p>
                            <p className="text-white/40 text-xs leading-relaxed">{s.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

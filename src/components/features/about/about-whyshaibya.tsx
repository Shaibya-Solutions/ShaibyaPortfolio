// components/WhyShaibyaCreative.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Section } from "@/components/shared/section";

const features = [
  {
    icon: "✨",
    title: "Customized Solutions",
    description:
      "Built precisely around your unique business needs for maximum impact and relevance.",
  },
  {
    icon: "🚀",
    title: "AI-Enabled Growth",
    description:
      "Leverage the power of AI to deliver measurable results and unlock new opportunities for expansion.",
  },
  {
    icon: "🤝",
    title: "Global Trust",
    description:
      "Trusted by diverse clients across multiple industries and continents, a testament to our quality.",
  },
  {
    icon: "💡",
    title: "End-to-End Excellence",
    description:
      "From initial product design to robust digital marketing strategies, we cover every aspect of your project.",
  },
  {
    icon: "🔮",
    title: "Future-Ready",
    description:
      "Always ahead of the curve, we provide solutions that are relevant today and resilient for tomorrow’s challenges.",
  },
];

export function WhyShaibyaCreative() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  return (
    <Section ref={ref} className='py-20 relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-tr from-[#0f172a] to-[#1e293b] opacity-20 -z-10'></div>
      <div className='max-w-6xl mx-auto text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className='text-4xl md:text-5xl font-bold text-white mb-12'
        >
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500'>
            Why Partner with Shaibya Solutions?
          </span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className='flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/60 shadow-lg hover:shadow-2xl transition-transform hover:scale-105 group'
            >
              <div className='w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-blue-500/40'>
                <span className='text-3xl'>{feature.icon}</span>
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>
                {feature.title}
              </h3>
              <p className='text-slate-300 text-center'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

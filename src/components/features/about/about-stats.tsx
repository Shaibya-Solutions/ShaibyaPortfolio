"use client";
import { motion, Variants, Transition } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Section } from "@/components/shared/section";

export function Stats() {
  // Correctly passing options inside an object
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const stats = [
    {
      title: "YEARS",
      value: "6+",
      description:
        "Proud of our history and our accomplishments, we're loyal to our future and not our past.",
    },
    {
      title: "GROWTH",
      value: "168%",
      description:
        "We've strengthened our company with new leadership, talent, and clients over the past two years.",
    },
    {
      title: "SERVICES",
      value: "10+",
      description:
        "Our offerings span from mobile apps to AI-powered business tools and cybersecurity.",
    },
    {
      title: "CLIENTS",
      value: "30+",
      description:
        "Trusted by clients across diverse industries, from retail to healthcare and more.",
    },
  ];

  const transition: Transition = {
    duration: 0.6,
    ease: "easeOut",
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition },
  };

  return (
    <Section ref={ref} className="py-20">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 p-8 rounded-xl border border-slate-700"
          >
            {/* ... stat content ... */}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

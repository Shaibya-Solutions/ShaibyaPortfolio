"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4";

/* ─── Case study data using real project screenshots ─────────────────── */
const caseStudies: Gallery4Item[] = [
  {
    id: "vims-hospital",
    title: "VIMS Hospital — Complete Digital Presence",
    description:
      "From zero digital presence to 10k+ monthly visitors. Built SEO-optimized website with online booking for 150+ doctors, driving a 2.5x increase in new patient inquiries.",
    href: "/portfolio",
    image: "/images/screenshots/vims-hospital.png",
  },
  {
    id: "sonar-killa-tours",
    title: "Sonar Killa Tours — Heritage Hotel Booking",
    description:
      "Boutique heritage hotel in Jaisalmer went from phone-only bookings to a visually rich online platform. 3x online bookings, Page 1 Google ranking, 60% fewer phone calls.",
    href: "/portfolio",
    image: "/images/screenshots/sonar-killa.png",
  },
  {
    id: "revolution-fitness",
    title: "Revolution Fitness — Digital Identity & Growth",
    description:
      "High-energy website with class schedules, trainer profiles, and WhatsApp enrollment. Members grew from 120 to 350 with 60% enrolling online.",
    href: "/industry/fitness",
    image: "/images/screenshots/revolution-fitness.png",
  },
  {
    id: "mg-infra-properties",
    title: "MG Infra Properties — Real Estate Lead Engine",
    description:
      "Professional property listing website with search filters, lead capture forms, and CRM integration. 3x lead capture increase with zero missed inquiries.",
    href: "/portfolio",
    image: "/images/screenshots/mg-infra.png",
  },
  {
    id: "touchwood-furnitech",
    title: "Touchwood Furnitech — Premium Digital Showroom",
    description:
      "Elegant digital showroom with high-res product galleries and WhatsApp inquiry. 40% more inquiries and 5x reach beyond Nagpur.",
    href: "/portfolio",
    image: "/images/screenshots/touchwood.png",
  },
  {
    id: "parmatma-ek-realestate",
    title: "Parmatma Ek Real Estate — Lead Generation Engine",
    description:
      "Conversion-optimized website with property showcases, neighborhood guides, and automated WhatsApp lead capture. 2x lead generation, 50% organic traffic growth.",
    href: "/portfolio",
    image: "/images/screenshots/parmatma-ek.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function GLCaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      id="case-studies"
      className="relative py-28 lg:py-40 overflow-hidden bg-white"
    >
      {/* Section header with brand accent */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-0">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="accent-line w-12 mb-8 origin-left"
        />
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-5"
        >
          Case Studies
        </motion.span>
      </div>

      {/* Gallery4 carousel with real project data */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Gallery4
          title="Websites we've built."
          description="Real projects. Real screenshots. Every site was designed, developed, and launched by our team — from concept to production."
          items={caseStudies}
        />
      </motion.div>
    </section>
  );
}

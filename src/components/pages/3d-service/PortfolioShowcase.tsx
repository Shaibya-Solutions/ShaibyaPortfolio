"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const portfolioItems = [
  {
    id: "walkthrough-example",
    title: "Residential Walkthrough",
    category: "Walkthrough Videos",
    img: "/images/3d/architectural-residence.webp",
    alt: "Architectural concept of a modern residence for planning an exterior-to-interior camera tour",
    description: "A concept still for an exterior approach and room-to-room tour. Camera paths, pacing, and lighting can be planned around the property brief.",
  },
  {
    id: "product-example",
    title: "Precision in Sound",
    category: "Product Animation",
    img: "/images/3d/headphone-product.webp",
    alt: "Headphone product concept showing the materials and details suitable for a turntable animation",
    description: "A product visualization concept for turntables, feature reveals, and material close-ups. The sequence can focus on construction, finish, or product operation.",
  },
  {
    id: "interior-example",
    title: "Light & Living",
    category: "Interior Visualisation",
    img: "/images/3d/living-room-render.webp",
    alt: "Photorealistic architectural interior concept with walnut furniture, stone finishes, and natural light",
    description: "An architectural interior concept exploring furniture, finishes, daylight, and composition. Compare its structure and final rendering in the room reveal above.",
  },
];

export function PortfolioShowcase() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="featured-work" className="scroll-mt-28 py-24 lg:py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-slate-900">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Examples</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mt-6">Illustrative stills showing the visual direction for each service. Video showreels will be added when they are available.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <motion.article
              id={item.id}
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.08 }}
              className="scroll-mt-32 group rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 flex flex-col"
            >
              <a
                href={`https://wa.me/917498341146?text=${encodeURIComponent(`Hi Shaibya Solutions, I'd like something like your ${item.title} concept for ${item.category.toLowerCase()}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
                aria-label={`Discuss ${item.category}: ${item.title} on WhatsApp`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={item.img} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-slate-950/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">Illustrative Concept</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-3">{item.category}</p>
                  <h3 className="text-xl lg:text-2xl font-bold font-heading text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{item.description}</p>
                  <span className="inline-flex items-center gap-2 mt-auto text-sm font-semibold text-sky-600">Discuss a similar project <ArrowUpRight size={16} aria-hidden="true" /></span>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

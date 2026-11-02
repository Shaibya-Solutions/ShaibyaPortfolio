"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cuboid, Layers, Video } from "lucide-react";
import TiltCard from "@/components/shared/TiltCard";

const services = [
  {
    id: "walkthrough-videos",
    title: "Walkthrough Videos",
    description: "Camera-led 3D tours that help viewers understand a property, its layout, and how its spaces connect.",
    includes: ["Room-to-room camera paths and exterior approaches", "Lighting, staging, and transitions between spaces", "Presentation sequences for residential and commercial projects"],
    example: "Residential walkthrough planning",
    href: "#walkthrough-example",
    icon: Video,
    color: "#06b6d4",
  },
  {
    id: "product-animation",
    title: "Product Animation",
    description: "Show a product’s form, materials, and operation through carefully planned 3D movement and lighting.",
    includes: ["Turntable sequences and product reveals", "Exploded views and feature demonstrations", "Material close-ups for launches, websites, and campaigns"],
    example: "Headphone product visualization",
    href: "#product-example",
    icon: Cuboid,
    color: "#a855f7",
  },
  {
    id: "interior-visualisation",
    title: "Interior Visualisation",
    description: "Photorealistic interior and architectural renderings that communicate a design before it is built.",
    includes: ["Rooms, furnishings, finishes, and lighting studies", "Architectural renderings of buildings and spaces", "Wireframe-to-render comparisons and presentation stills"],
    example: "Contemporary living room render",
    href: "#interior-example",
    icon: Layers,
    color: "#ec4899",
  },
];

export function ServicesSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="3d-services" className="scroll-mt-28 py-24 lg:py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 text-center md:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-500 mb-4">Three Ways to Bring Ideas to Life</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">3D Services</span>
          </h2>
          <p className="text-slate-600 max-w-2xl text-lg">Choose the visual format that fits your project, from a guided tour to a product story or a detailed architectural still.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.1 }}
              >
                <TiltCard className="h-full rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-shadow" tiltAmount={reduceMotion ? 0 : 5} scale={1}>
                  <article data-3d-service={service.id} className="h-full p-6 lg:p-8 flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-8 h-8" style={{ color: service.color }} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold font-heading text-slate-900 mb-4">{service.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{service.description}</p>
                    <ul className="text-sm text-slate-600 leading-relaxed space-y-3 mb-6">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-2.5"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full shrink-0 mt-2" style={{ background: service.color }} />{item}</li>
                      ))}
                    </ul>
                    <div className="mt-auto border-t border-slate-200 pt-5 space-y-4">
                      <p className="text-xs text-slate-500">Example: {service.example}</p>
                      <a href={service.href} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700">Explore the example <ArrowRight size={15} aria-hidden="true" /></a>
                      <a
                        href={`https://wa.me/917498341146?text=${encodeURIComponent(`Hi Shaibya Solutions, I'd like to discuss ${service.title.toLowerCase()} for a project.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full justify-center items-center rounded-full bg-slate-900 text-white px-4 py-3 text-xs font-semibold hover:bg-slate-800 transition-colors"
                      >Discuss {service.title}</a>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const bentoServices = [
  {
    image: "/images/landing/bento_penetration_vertical.png",
    title: "Penetration Testing",
    subtitle: "Identify Vulnerabilities",
    desc: "Simulated cyber attacks to proactively secure your infrastructure before malicious actors exploit them.",
    gridClass: "lg:col-span-1 lg:row-span-2 min-h-[460px] lg:min-h-[624px]",
    href: "/contact?service=Penetration%20Testing",
    tag: "Ethical Hacking",
    color: "#10b981", // green accent
  },
  {
    image: "/images/landing/bento_cloud_security.png",
    title: "Cloud Security",
    subtitle: "Secure Architecture",
    desc: "Hardening cloud environments, managing access controls, and data encryption.",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[280px] lg:min-h-[300px]",
    href: "/contact?service=Cloud%20Security",
    tag: "Cloud Hardening",
    color: "#3b82f6", // blue accent
  },
  {
    image: "/images/landing/bento_compliance_audits.png",
    title: "Compliance & Audits",
    subtitle: "SOC2, HIPAA, GDPR",
    desc: "Ensuring operations meet regulatory standards with technical compliance audits.",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[280px] lg:min-h-[300px]",
    href: "/contact?service=Compliance%20Audits",
    tag: "Regulatory Audit",
    color: "#f59e0b", // orange accent
  },
  {
    image: "/images/landing/bento_threat_intelligence.png",
    title: "Threat Intelligence",
    subtitle: "Real-time Monitoring",
    desc: "24/7 proactive monitoring to detect, analyze, and neutralize active threats.",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[280px] lg:min-h-[300px]",
    href: "/contact?service=Threat%20Intelligence",
    tag: "24/7 Threat Radar",
    color: "#f43f5e", // red accent
  },
  {
    image: "/images/landing/bento_incident_response.png",
    title: "Incident Response",
    subtitle: "Rapid Containment",
    desc: "Active containment, root-cause forensics, and emergency recovery pipelines.",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[280px] lg:min-h-[300px]",
    href: "/contact?service=Incident%20Response",
    tag: "Breach Control",
    color: "#8b5cf6", // purple accent
  },
];

export function CyberServicesSection() {
  return (
    <section className="pt-44 pb-32 bg-slate-50 relative z-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold font-heading text-slate-900 mb-6 leading-none tracking-tight">
              Tactical <span className="text-[#10b981]">Defense</span> Capabilities
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Click on a module to decrypt technical specifications. Our comprehensive suite covers every vector of your digital landscape.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* Custom Bento Grid Layout matching the Explore by Space ratio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] max-w-[1240px] mx-auto">
            {bentoServices.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className={`group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] flex flex-col justify-end p-8 ${service.gridClass}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dark Overlay gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />
                </div>

                {/* Card Content Overlay */}
                <div className="relative z-10 w-full flex flex-col justify-end h-full">
                  {/* Tag pill */}
                  <span 
                    style={{ borderColor: `${service.color}40`, background: `${service.color}15`, color: service.color }}
                    className="self-start inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-4"
                  >
                    {service.tag}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-none mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-300 text-xs md:text-sm font-medium mb-3">
                    {service.subtitle}
                  </p>
                  
                  <p className="text-slate-400 text-xs leading-relaxed max-w-sm opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto transition-all duration-500 ease-out">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest mt-2 group-hover:text-sky-400 transition-colors duration-300">
                    Request Module <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

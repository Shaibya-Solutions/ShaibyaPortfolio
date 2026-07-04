"use client";

import { motion } from "framer-motion";
import ChromaGrid, { ChromaItem } from "@/components/ui/ChromaGrid";

const cyberServices: ChromaItem[] = [
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    title: "Penetration Testing",
    subtitle: "Identify Vulnerabilities",
    borderColor: "#10b981",
    gradient: "linear-gradient(145deg, #10b981, #f8fafc)",
    quote: "Simulated cyber attacks to proactively secure your infrastructure before malicious actors exploit them."
  },
  {
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    title: "Cloud Security",
    subtitle: "Secure Architecture",
    borderColor: "#3b82f6",
    gradient: "linear-gradient(210deg, #3b82f6, #f8fafc)",
    quote: "Hardening cloud environments, managing access controls, and ensuring data encryption across AWS, GCP, and Azure."
  },
  {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    title: "Threat Intelligence",
    subtitle: "Real-time Monitoring",
    borderColor: "#f43f5e",
    gradient: "linear-gradient(165deg, #f43f5e, #f8fafc)",
    quote: "24/7 proactive monitoring to detect, analyze, and neutralize active threats within milliseconds."
  },
  {
    image: "https://images.unsplash.com/photo-1614064641913-6b7140414c71?q=80&w=800&auto=format&fit=crop",
    title: "Compliance & Audits",
    subtitle: "SOC2, HIPAA, GDPR",
    borderColor: "#f59e0b",
    gradient: "linear-gradient(145deg, #f59e0b, #f8fafc)",
    quote: "Ensuring your business operations meet global regulatory standards with comprehensive technical audits."
  }
];

export function CyberServicesSection() {
  return (
    <section className="py-32 bg-slate-50 relative z-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-6">
              Tactical <span className="text-[#10b981]">Defense</span> Capabilities
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
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
          {/* We pass rows=2 and cols=2 for 4 items on desktop */}
          <ChromaGrid 
            items={cyberServices} 
            columns={2} 
            rows={2} 
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

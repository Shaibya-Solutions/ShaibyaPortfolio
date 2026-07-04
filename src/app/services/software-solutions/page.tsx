"use client";

import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function SoftwareSolutionsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden font-sans">
      <SiteHeader />
      
      <section className="relative pt-44 pb-32 flex-grow flex items-center justify-center">
        {/* Background grid */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#0ea5e9 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center mx-auto mb-8 text-[#0ea5e9]">
              <Code2 className="w-8 h-8" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-slate-900 dark:text-white">
              Software Solutions
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto mb-10">
              We design and engineer bespoke web applications, automated workflows, and database systems that eliminate manual overhead and drive business scale.
            </p>

            <span className="inline-block px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              Content under development
            </span>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

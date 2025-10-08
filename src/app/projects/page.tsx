"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { projects, Projects } from "@/app/projects/data";
import AnalyticsOrbit from "@/components/analytics-orbit";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  Search,
  Eye,
  BookOpen,
  Globe,
  Briefcase,
  Users,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

// Typing Animation
const TypingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="text-cyan-400 font-semibold">{displayed}</span>;
};

const DynamicHeadline = () => {
  const words = ["Web Apps", "Mobile Apps", "AI Tools", "MVPs"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <h3 className="text-lg md:text-2xl text-slate-300">
      We craft impactful <TypingText key={index} text={words[index]} />.
    </h3>
  );
};

// Product Card
const ProductCard = ({ projects }: { projects: Projects }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
  >
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={projects.image}
        alt={projects.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
        {projects.deployedLink && (
          <Link
            href={String(projects.deployedLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
        )}
        {projects.githubLink && (
          <Link
            href={String(projects.githubLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          >
            <FaGithub className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
    <div className="p-5 text-center">
      <div className="mb-2 text-sm text-slate-300">
        <span className="rounded-full bg-blue-600/20 px-3 py-1 font-medium text-blue-300">
          {projects.category}
        </span>
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-1">
        {projects.title}
      </h2>
      <p className="text-sm text-slate-400">{projects.tagline}</p>
    </div>
  </motion.div>
);

const categories = [
  "All",
  "Websites",
  "Apps",
  "CGI & 3D",
  "Cybersecurity",
  "Others",
];

export default function PortfolioPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[65vh] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#0f1117] to-[#181b24]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-3">
          My Project Showcase
        </h1>
        <DynamicHeadline />
        <p className="text-slate-400 mt-3 text-lg">
          "The perfect moment for creation is right now."
        </p>
        <ArrowDown className="w-8 h-8 text-white/50 mt-10 animate-bounce" />
      </section>

      {/* Search + Category */}
      <div className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-sm py-6">
        <Section className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 bg-slate-900/50 p-2 rounded-full border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  category === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Section>
      </div>

      {/* Project Cards */}
      <Section className="py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.length ? (
            filtered.map((p) => <ProductCard key={p.id} projects={p} />)
          ) : (
            <div className="col-span-full text-center text-slate-500">
              No projects found.
            </div>
          )}
        </motion.div>
      </Section>
      <AnalyticsOrbit />
      <SiteFooter />
    </main>
  );
}

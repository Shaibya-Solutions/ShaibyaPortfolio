"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import IndiaMap from "@/components/ui/india-map";
import {
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {
  RemotePerkCard,
  TimePerkCard,
  GrowthPerkCard,
  FounderPerkCard
} from "@/components/features/careers/InteractivePerks";

const BRAND = "#0ea5e9";

interface CareersClientProps {
  TEAM_BUILDERS: Array<{
    name: string;
    role: string;
    contribution: string;
    quote: string;
    image: string;
  }>;
  IMPACT_LOCATIONS: Array<{
    id: string;
    name: string;
    role: string;
    description: string;
    details: string;
    badge: string;
  }>;
  MANIFESTO_ITEMS: Array<{
    title: string;
    description: string;
  }>;
}

export default function CareersClient({ TEAM_BUILDERS, IMPACT_LOCATIONS, MANIFESTO_ITEMS }: CareersClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const manifestoRef = useRef<HTMLDivElement>(null);
  const manifestoInView = useInView(manifestoRef, { once: true, amount: 0.15 });

  const teamScrollRef = useRef<HTMLDivElement>(null);

  const scrollTeam = (direction: "left" | "right") => {
    if (teamScrollRef.current) {
      const { scrollLeft, clientWidth } = teamScrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      teamScrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const [activeCity, setActiveCity] = useState<string | null>("Nagpur");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "intern-founder",
    portfolio: "",
    project: "",
    goal: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
    }, 600);
  };

  const currentCityInfo = IMPACT_LOCATIONS.find((loc) => loc.id === activeCity) || IMPACT_LOCATIONS[0];

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden font-sans">
      <SiteHeader />

      {/* ══ HERO SECTION (Editorial, Premium) ════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-48 pb-32 overflow-hidden bg-slate-50/40 dark:bg-slate-900/10 border-b border-gray-100 dark:border-slate-900"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]"
            style={{
              backgroundImage: `radial-gradient(ellipse 60% 50% at 50% -10%, rgba(14,165,233,0.15), transparent)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px",
              opacity: 0.12,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] mb-6 inline-block px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-100/60 dark:border-sky-900/30"
              style={{ color: BRAND }}
            >
              Careers & Purpose
            </p>
            <h1
              className="font-bold tracking-tight leading-[1.05] mb-8 font-heading text-slate-900 dark:text-white"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              The launchpad for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-500 font-bold">
                the next generation.
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-slate-500 dark:text-slate-400 font-light mb-12">
              We provide 100% remote internships designed to turn ambitious students into world-class engineers. 
              No sandbox environments, no busywork. You work on production code alongside senior builders 
              collaborating across borders.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#pitch"
                className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 hover:scale-105 shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20"
                style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}
              >
                Apply to a Track
              </a>
              <a
                href="#manifesto"
                className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                How We Think
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ MANIFESTO SECTION (Apple-Like Unique Feel) ════════════════ */}
      <section
        id="manifesto"
        ref={manifestoRef}
        className="py-28 bg-slate-950 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#334155 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={manifestoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 mb-4 block">
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 tracking-tight leading-tight text-white dark:text-white">
                Building the Future, Together
              </h2>
              <div className="space-y-6 text-slate-300 dark:text-slate-300 font-light text-base md:text-lg leading-relaxed">
                <p>
                  At our company, we believe internships are more than temporary roles—they are opportunities to develop the next generation of exceptional engineers and innovators. Rather than assigning routine tasks or maintenance work, we empower interns to contribute meaningfully to products, solve real business challenges, and grow alongside experienced professionals.
                </p>
                <p>
                  We view software as a force multiplier for businesses, not simply a collection of features. Every design decision, user interaction, system architecture, and performance optimization matters because exceptional products are built through thoughtful attention to detail.
                </p>
                <p>
                  Our culture is built on trust, ownership, and collaboration. By working closely with our clients and business partners, we create practical software solutions that eliminate manual processes, improve efficiency, and deliver measurable business value.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={manifestoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 space-y-8 lg:pl-8 border-l border-slate-800"
            >
              {MANIFESTO_ITEMS.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-xl font-bold text-white dark:text-white font-heading flex items-center gap-3">
                    <span className="text-orange-500 text-sm">0{idx + 1}.</span> {item.title}
                  </h3>
                  <p className="text-slate-300 dark:text-slate-300 font-light leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ THE BUILDERS: STUDENT TEAM SHOWCASE ════════════════ */}
      <section className="py-28 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="text-left max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500 mb-3 block">
                The Builders
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                A Team That Works
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-light mt-3">
                Meet some of our past and current student interns who have built production systems.
              </p>
            </div>
            
            {/* Scroll navigation buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => scrollTeam("left")}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500 hover:text-sky-500 transition-colors cursor-pointer"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollTeam("right")}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500 hover:text-sky-500 transition-colors cursor-pointer"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable list of Intern Cards */}
          <div 
            ref={teamScrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-hide"
          >
            {TEAM_BUILDERS.map((intern, idx) => (
              <motion.div
                key={intern.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="w-[280px] md:w-[320px] shrink-0 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900/60 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group snap-start"
              >
                <div>
                  {/* Photo container */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-800 group-hover:border-sky-500/40 transition-colors">
                    <img
                      src={intern.image}
                      alt={intern.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-0.5">
                    {intern.name}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block mb-4">
                    {intern.role}
                  </span>

                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
                    "{intern.quote}"
                  </p>
                </div>

                <div className="border-t border-slate-200/50 dark:border-slate-800/80 pt-4 mt-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">
                    Proudest Contribution
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    {intern.contribution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BORDERLESS PERKS & CULTURE SECTION ════════════════ */}
      <section className="py-28 bg-slate-50/50 dark:bg-slate-900/10 border-b border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500 mb-3 block">
              Perks & Flexibility
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Designed for Modern Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RemotePerkCard />
            <TimePerkCard />
            <GrowthPerkCard />
            <FounderPerkCard />
          </div>
        </div>
      </section>

      {/* ══ IMPACT MAP SECTION (High-Fidelity State Boundaries) ══════════════ */}
      <section id="impact-map" className="py-28 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Map descriptions / Details */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500 mb-3">Our Footprint</span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6 leading-tight font-heading">
                Delivering Impact <br />
                Across Regions
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
                From our main engineering center in Nagpur to enterprise collaborations and remote teams working across major states.
              </p>

              {/* Interactive list of cities */}
              <div className="space-y-3 mb-8">
                {IMPACT_LOCATIONS.map((loc) => {
                  const isActive = activeCity === loc.id;
                  const isHQ = loc.id === "Nagpur";
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setActiveCity(loc.id)}
                      onMouseEnter={() => setActiveCity(loc.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                        isActive
                          ? "border-sky-500/40 bg-sky-50/50 dark:bg-sky-950/20 text-slate-900 dark:text-white"
                          : "border-slate-100 dark:border-slate-900 bg-transparent hover:border-slate-200 dark:hover:border-slate-800"
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm block font-heading flex items-center gap-2">
                          {loc.name}
                          {isHQ && (
                            <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                              HQ
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-slate-400 font-light">{loc.role}</span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-sky-500 transition-transform duration-300 ${
                          isActive ? "translate-x-1" : "opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Display card for hovered/selected city details */}
              <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900/60 rounded-3xl p-6 relative overflow-hidden">
                <span className="absolute top-6 right-6 text-[10px] uppercase font-bold tracking-wider text-sky-600 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-md">
                  {currentCityInfo.badge}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Active Location Detail
                </span>
                <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2">
                  {currentCityInfo.name}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">
                  {currentCityInfo.description}
                </p>
                <div className="border-t border-slate-200/50 dark:border-slate-800/80 pt-3">
                  <p className="text-xs italic text-slate-400 font-light">
                    {currentCityInfo.details}
                  </p>
                </div>
              </div>
            </div>

            {/* India Map Component */}
            <div className="lg:col-span-7 flex items-center justify-center relative bg-slate-50/30 dark:bg-slate-900/5 border border-slate-100/50 dark:border-slate-900/20 rounded-4xl p-6 lg:p-12 overflow-hidden">
              <IndiaMap
                activeCity={activeCity}
                onCityHover={(cityName) => setActiveCity(cityName || activeCity)}
                className="w-full max-w-[480px] drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ APPLICATION / PITCH FORM (Polished & Seamless) ═════════════════ */}
      <section id="pitch" className="py-28 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
              style={{ color: BRAND }}
            >
              Pitch Your Talent
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
              Start Your Journey
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Introduce yourself, pitch a project you've built, or apply to our active tracks. We review every single submission personally.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3 text-slate-900 dark:text-white">
                  Pitch Received!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 font-light">
                  Thank you for applying. One of our founders will review your pitch/portfolio and reach out within 24 hours. Keep building!
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-sm font-semibold text-sky-500 hover:text-sky-600 underline"
                >
                  Submit another application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="careers-name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Your Name
                    </label>
                    <input
                      id="careers-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Carter"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors text-sm text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="careers-email" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Email Address
                    </label>
                    <input
                      id="careers-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors text-sm text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="careers-role" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Track or Role of Interest
                    </label>
                    <select
                      id="careers-role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors text-sm text-slate-800 dark:text-slate-200"
                    >
                      <option value="intern-founder">Software Engineer Intern (Founder Track)</option>
                      <option value="fullstack-engineer">Full Stack Engineer (MVPs & Products)</option>
                      <option value="speculative">Create / Pitch Your Own Track</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="careers-portfolio" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Portfolio or GitHub Link
                    </label>
                    <input
                      id="careers-portfolio"
                      type="url"
                      name="portfolio"
                      required
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="e.g. github.com/username"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors text-sm text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="careers-project" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Tell us about one project you built that you are proud of.
                  </label>
                  <textarea
                    id="careers-project"
                    name="project"
                    rows={4}
                    required
                    value={formData.project}
                    onChange={handleInputChange}
                    placeholder="Describe what it does, the technologies you used, and what you learned from building it..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors text-sm text-slate-900 dark:text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="careers-goal" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    What is your long-term startup or technology goal?
                  </label>
                  <textarea
                    id="careers-goal"
                    name="goal"
                    rows={3}
                    required
                    value={formData.goal}
                    onChange={handleInputChange}
                    placeholder="Tell us what you want to grow into (e.g. founder, CTO, open source maintainer)..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors text-sm text-slate-900 dark:text-slate-100 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 hover:scale-[1.01] hover:shadow-lg shadow-sky-500/10 hover:shadow-sky-500/25"
                    style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}
                  >
                    Submit Pitch <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

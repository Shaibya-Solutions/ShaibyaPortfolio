"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import IndiaMap from "@/components/ui/india-map";
import { ArrowRight, Mail } from "lucide-react";
import { CAREERS_EMAIL, OPEN_ROLES, careersApplicationUrl } from "@/data/careers";
import {
  RemotePerkCard,
  TimePerkCard,
  GrowthPerkCard,
  OwnershipPerkCard
} from "@/components/features/careers/InteractivePerks";

const BRAND = "#0ea5e9";

interface CareersClientProps {
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
  roles?: readonly any[] | any[];
}

export default function CareersClient({ IMPACT_LOCATIONS, MANIFESTO_ITEMS, roles }: CareersClientProps) {
  const roleList = roles && roles.length > 0 ? roles : OPEN_ROLES;
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const manifestoRef = useRef<HTMLDivElement>(null);
  const manifestoInView = useInView(manifestoRef, { once: true, amount: 0.15 });

  const [activeCity, setActiveCity] = useState<string | null>("Nagpur");

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
              Careers at Shaibya
            </p>
            <h1
              className="font-bold tracking-tight leading-[1.05] mb-8 font-heading text-slate-900 dark:text-white"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Build what matters. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-500 font-bold">
                Grow with us.
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-slate-500 dark:text-slate-400 font-light mb-12">
              Shaibya Solutions builds software, digital experiences, and automation for businesses.
              We’re hiring across engineering, creative, and business roles to support that work.
              Explore our current openings, with internship opportunities listed separately below.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#open-roles"
                className="rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 hover:scale-105 shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20"
                style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}
              >
                Explore Open Roles
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
                  Our work brings together development, design, content, and business collaboration.
                  We value clear responsibilities, thoughtful decisions, and reliable communication
                  throughout a project. Every role contributes to the quality of what we deliver.
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

      {/* ══ CURRENT OPENINGS ════════════════ */}
      <section id="open-roles" className="scroll-mt-32 py-28 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-left max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500 mb-3 block">
              We’re Hiring
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Find Your Next Role
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light mt-3">
              Bring your skills to engineering, creative work, or client relationships.
              Tell us what you do well and what you would like to contribute.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {roleList.map((role, idx) => (
              <motion.article
                id={role.id}
                key={role.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="scroll-mt-32 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900/60 rounded-3xl p-8 flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block mb-4">
                  {role.team} · Open Role
                </span>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                  {role.title}
                </h3>
                <p className="text-sm font-semibold text-sky-600 mb-5">{role.experience}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
                  {role.description}
                </p>
                <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-300">
                  {role.responsibilities.map((item: any) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-slate-200/50 dark:border-slate-800/80 pt-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{role.applicationNote}</p>
                  <a
                    href={careersApplicationUrl(role.title)}
                    aria-label={`Apply now for ${role.title} by email`}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider text-white transition-all hover:shadow-lg hover:shadow-sky-500/20"
                    style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}
                  >
                    Apply now <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8">
            Apply by email with the role in your subject line. Work arrangements and role details will be discussed during the application process.
          </p>
        </div>
      </section>

      {/* ══ INTERNSHIP OPPORTUNITIES ════════════════ */}
      <section id="internships" className="py-24 bg-sky-50/40 dark:bg-sky-950/10 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500 mb-3 block">Early Careers</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mb-5">
              Internship Opportunities
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Internships are a separate learning pathway within our wider work across technology,
              creative services, and business. Students and early-career applicants can enquire
              about opportunities that match their interests and current skills.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-4">A Clear Learning Scope</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              We’ll discuss the scope of the internship, the point of contact for guidance,
              and how feedback and review will work before you join. Share your interests,
              availability, and any coursework or projects you would like us to see.
            </p>
            <a href={careersApplicationUrl("Internship enquiry")} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700">
              Enquire about internships <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ══ BORDERLESS PERKS & CULTURE SECTION ════════════════ */}
      <section className="py-28 bg-slate-50/50 dark:bg-slate-900/10 border-b border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500 mb-3 block">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Space to Do Meaningful Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RemotePerkCard />
            <TimePerkCard />
            <GrowthPerkCard />
            <OwnershipPerkCard />
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

      {/* ══ EMAIL APPLICATION ════════════════ */}
      <section id="pitch" className="py-28 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-3xl p-8 md:p-12 text-center">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block text-sky-500">Join the Conversation</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4 tracking-tight">
              Tell Us What You Can Bring
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Send your CV, the role you’re interested in, and relevant work samples.
              If your skills don’t fit an opening listed here, you’re welcome to introduce yourself.
            </p>
            <a
              href={careersApplicationUrl()}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider text-white transition-all hover:shadow-lg hover:shadow-sky-500/20"
              style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}
            >
              Apply now <Mail size={16} aria-hidden="true" />
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 break-words">
              Or email <a href={`mailto:${CAREERS_EMAIL}`} className="text-sky-600 hover:underline">{CAREERS_EMAIL}</a>
            </p>
            <p className="text-xs text-slate-400 mt-3">The button opens your email app. Attach your CV and send your application from there.</p>
            <p className="text-xs text-slate-500 mt-3">Read our <Link href="/privacy-policy" className="text-sky-600 underline underline-offset-4">Privacy Policy</Link> for how application information is handled.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

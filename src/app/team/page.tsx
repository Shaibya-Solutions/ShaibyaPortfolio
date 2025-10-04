"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  Code,
  Zap,
  Palette,
  MapPin,
  Briefcase,
  Rocket,
  Sun,
  Moon,
  Link,
  Settings,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Section } from "@/components/shared/section";

// --- Placeholder Components for External Imports ---
const SiteHeader = () => (
  <header className="sticky top-0 z-50 w-full p-4 bg-[#0a0f1f]/90 backdrop-blur-sm shadow-xl shadow-black/10">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
      <div className="font-bold text-xl text-[#00f6ff]">SHAIBYA</div>
      <nav className="space-x-4 text-[#a8b2d1]">
        <a href="/" className="hover:text-white transition-colors">
          Home
        </a>
        <a href="/services" className="hover:text-white transition-colors">
          Services
        </a>
      </nav>
    </div>
  </header>
);
const SiteFooter = () => (
  <footer className="bg-[#010101] border-t border-slate-800/50 py-10 text-center text-sm text-[#a8b2d1]">
    <div className="max-w-7xl mx-auto">
      <p>
        Wanna join The Crew? We're full-time professionals, part-time dreamers.
      </p>
      <p className="mt-2 text-xs text-slate-700">
        © 2025 Shaibya. Built by the Night Crew.
      </p>
    </div>
  </footer>
);

// We'll use this ref to scroll to a section.
const useScrollToRef = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTo = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return [ref, scrollTo] as const;
};

// --- 1. Data Structure for the Night Crew ---
interface CrewMember {
  codename: string;
  dayJob: string;
  nightSkill: string;
  location: string;
  hoverQuote: string;
  icon: React.ElementType;
  color: string;
  lat: number;
  lng: number;
}

const TEAM_MEMBERS: CrewMember[] = [
  {
    codename: "The Coder",
    dayJob: "Principal Engineer",
    nightSkill: "Scalable System Architecture",
    location: "Pune, IN",
    hoverQuote: "Speaks fluent logic & coffee. Builds scalable systems.",
    icon: Code,
    color: "#00f6ff",
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    codename: "The Automator",
    dayJob: "Lead Data Scientist",
    nightSkill: "Workflow Magician",
    location: "Noida, IN",
    hoverQuote: "Automates what others overthink. Finds signal in the noise.",
    icon: Zap,
    color: "#e400f6",
    lat: 28.5355,
    lng: 77.391,
  },
  {
    codename: "The Visionary",
    dayJob: "UX Lead",
    nightSkill: "Human-Centered Design",
    location: "Nagpur, IN",
    hoverQuote: "Translates chaos into clean, human-centered UI/UX design.",
    icon: Palette,
    color: "#ffc700",
    lat: 21.1458,
    lng: 79.0882,
  },
  {
    codename: "The Strategist",
    dayJob: "Project Manager",
    nightSkill: "Critical Path Mapping",
    location: "Bangalore, IN",
    hoverQuote: "Navigates complexity. Delivers projects on time, every time.",
    icon: Settings,
    color: "#00f6ff",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    codename: "The Architect",
    dayJob: "CTO",
    nightSkill: "Full-Stack Mastery",
    location: "Pune, IN",
    hoverQuote:
      "Designs the future architecture. The master of the full stack.",
    icon: Link,
    color: "#ffc700",
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    codename: "The Explorer",
    dayJob: "ML Engineer",
    nightSkill: "Generative AI Prototyping",
    location: "Noida, IN",
    hoverQuote: "Pushes boundaries of what's possible with generative AI.",
    icon: Rocket,
    color: "#e400f6",
    lat: 28.5355,
    lng: 77.391,
  },
  {
    codename: "The Sentinel",
    dayJob: "Security Consultant",
    nightSkill: "Threat Modeling & Pentesting",
    location: "Texas, US",
    hoverQuote: "Monitors the perimeter. Sleeps only when the code is secure.",
    icon: Settings,
    color: "#e400f6",
    lat: 31.9686,
    lng: -99.9018,
  },
];

// --- 2. Codename Card Component (Framer Motion) ---
const CodenameCard: React.FC<
  CrewMember & { isActive: boolean; onClick: () => void }
> = ({
  codename,
  dayJob,
  nightSkill,
  location,
  hoverQuote,
  icon: Icon,
  color,
  isActive,
  onClick,
}) => {
  const TypedIcon = Icon as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <motion.div
      className={`relative p-6 rounded-xl overflow-hidden cursor-pointer bg-[#0a0f1f] border border-slate-800/50 shadow-lg group flex flex-col justify-between h-[220px] transition-all duration-300 ${
        isActive ? "z-30 scale-105" : ""
      }`}
      whileHover={{ scale: 1.05, rotate: isActive ? 0 : -1.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        boxShadow: `0 0 15px ${color}10`,
        border: `1px solid ${color}40`,
      }}
      onClick={onClick}
    >
      {/* Animated Star Field Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at bottom, #0a0f1f 0%, #010101 100%)",
          backgroundSize: "200% 200%",
        }}
      >
        <div
          className="star-field absolute inset-0"
          style={{
            background: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')`,
          }}
        ></div>
      </div>

      {/* Neon Hover Glow Effect and Active Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: `0 0 25px ${color}` }}
      />

      {/* Default Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-between h-full"
        initial={{ opacity: 1, scale: 1, z: 1 }}
        whileHover={{ opacity: 0, scale: 0.9, z: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="flex items-start justify-between">
          <TypedIcon
            style={{ color: color }}
            className="w-8 h-8 flex-shrink-0"
          />
          <p className="text-xs text-[#a8b2d1] flex items-center pt-1">
            <MapPin className="w-3 h-3 mr-1 text-slate-500" /> {location}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-3xl font-extrabold text-white leading-none mb-1">
            {codename}
          </h3>
          <p className="text-sm text-slate-400">
            Day Job:{" "}
            <span className="text-[#00f6ff] font-semibold">{dayJob}</span>
          </p>
          <p className="text-sm text-slate-400">
            Night Skill:{" "}
            <span className="text-[#ffc700] font-semibold">{nightSkill}</span>
          </p>
        </div>
      </motion.div>

      {/* Hover Quote Content */}
      <motion.div
        className="absolute inset-0 p-6 flex items-center justify-center bg-black/95 rounded-xl border-2 border-transparent z-20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ border: `2px solid ${color}80` }}
      >
        <p className="text-xl italic text-center font-medium text-white max-w-[80%]">
          “{hoverQuote}”
        </p>
      </motion.div>
    </motion.div>
  );
};

/// --- 3. Dynamic Interactive Map Component ---
interface GlobeProps {
  globeImageUrl: string;
  backgroundImageUrl: string;
  pointsData: CrewMember[];
  pointColor: (d: CrewMember) => string;
  pointAltitude: number;
  pointRadius: (d: CrewMember) => number;
  pointsMerge: boolean;
  onGlobeReady: () => void;
  labelsData: CrewMember[];
  labelLat: (d: CrewMember) => number;
  labelLng: (d: CrewMember) => number;
  labelText: (d: CrewMember) => string;
  labelColor: (d: CrewMember) => string;
  labelSize: (d: CrewMember) => number;
  labelDotRadius: (d: CrewMember) => number;
  labelResolution: number;
  arcsData: CrewMember[];
  arcStartLat: (d: CrewMember) => number;
  arcStartLng: (d: CrewMember) => number;
  arcEndLat: (d: CrewMember) => number;
  arcEndLng: (d: CrewMember) => number;
  arcColor: (d: CrewMember) => string;
  arcDashLength: number;
  arcDashGap: number;
  arcDashAnimateTime: number;
  arcsTransitionDuration: number;
  initialThreeConfig: any;
  ref: React.Ref<any>;
}

const Globe = dynamic(
  () =>
    import("react-globe.gl").then((mod) => mod.default as React.FC<GlobeProps>),
  { ssr: false }
);

const InteractiveMap: React.FC<{
  team: CrewMember[];
  activeLocation: string | null;
  setActiveLocation: (loc: string) => void;
}> = ({ team, activeLocation, setActiveLocation }) => {
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);

  const indiaCenter = { lat: 22.351114, lng: 78.66774 };

  useEffect(() => {
    if (globeEl.current && activeLocation) {
      const member = team.find((m) => m.location === activeLocation);
      if (member) {
        globeEl.current.pointOfView(
          { lat: member.lat, lng: member.lng, altitude: 0.5 },
          1500
        );
      }
    }
  }, [activeLocation, team]);

  const INITIAL_CAMERA_CONFIG = {
    cameraController: {
      initialOrbit: {
        lat: 22.351114,
        lng: 78.66774,
        altitude: 1.5,
      },
    },
  };

  return (
    <div className="h-[550px] w-full rounded-2xl bg-black border border-cyan-500/20 overflow-hidden shadow-2xl shadow-cyan-500/20 relative">
      <AnimatePresence>
        {!globeReady && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/90 z-20 text-white"
          >
            Loading Global Network...
          </motion.div>
        )}
      </AnimatePresence>

      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        onGlobeReady={() => setGlobeReady(true)}
        initialThreeConfig={INITIAL_CAMERA_CONFIG}
        // 1. Point Data
        pointsData={team}
        pointColor={(d: CrewMember) => d.color}
        pointAltitude={0.01}
        pointRadius={(_: CrewMember) => 0.4}
        pointsMerge={true}
        // 2. Arc Data
        arcsData={team}
        arcColor={(d: CrewMember) => d.color}
        arcStartLat={() => indiaCenter.lat}
        arcStartLng={() => indiaCenter.lng}
        arcEndLat={(d: CrewMember) => d.lat}
        arcEndLng={(d: CrewMember) => d.lng}
        arcDashLength={0.4}
        arcDashGap={0.1}
        arcDashAnimateTime={2000}
        arcsTransitionDuration={0}
        // 3. Labels (Now managed by the legend)
        labelsData={[]}
        labelLat={() => 0} // Fix: Provide empty accessor functions
        labelLng={() => 0} // Fix: Provide empty accessor functions
        labelText={() => ""} // Fix: Provide empty accessor functions
        labelColor={() => ""} // Fix: Provide empty accessor functions
        labelSize={() => 0} // Fix: Provide empty accessor functions
        labelDotRadius={() => 0} // Fix: Provide empty accessor functions
        labelResolution={0}
      />
    </div>
  );
};

// ... Rest of the code remains the same
// --- NEW: Legend Component ---
const CrewLegend: React.FC<{
  team: CrewMember[];
  activeLocation: string | null;
  setActiveLocation: (loc: string) => void;
}> = ({ team, activeLocation, setActiveLocation }) => {
  const locations = useMemo(() => {
    const locMap = new Map<string, CrewMember[]>();
    team.forEach((member) => {
      const loc = member.location;
      if (!locMap.has(loc)) {
        locMap.set(loc, []);
      }
      locMap.get(loc)?.push(member);
    });
    return Array.from(locMap.entries());
  }, [team]);

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 bg-[#0a0f1f]/80 backdrop-blur-sm rounded-xl border border-slate-800/50 shadow-lg w-56">
      <h4 className="text-white font-bold text-lg mb-4">Core Hubs</h4>
      <ul className="space-y-3">
        {locations.map(([location, members]) => (
          <motion.li
            key={location}
            className={`cursor-pointer transition-colors p-2 rounded-lg ${
              activeLocation === location
                ? "bg-cyan-500/20 border border-cyan-500/50"
                : "hover:bg-slate-800/50"
            }`}
            onClick={() => setActiveLocation(location)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <MapPin
                className="w-4 h-4 mr-2"
                style={{ color: members[0].color }}
              />
              <span className="text-sm font-semibold">{location}</span>
            </div>
            <p className="text-xs mt-1 text-slate-400">
              {members.map((m) => m.codename).join(", ")}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

// --- NEW: Manifesto Carousel Component ---
const MANIFESTO_QUOTES = [
  "We're not moonlighters. We're dream-shapers.",
  "Passion doesn't clock out at 6PM.",
  "Weekends are our launchpads.",
  "Not rebels — just restless.",
  "We don’t chase hype. We build quietly.",
];

const ManifestoCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % MANIFESTO_QUOTES.length);
    }, 5000); // Change quote every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="relative h-48 flex items-center justify-center text-center px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="text-2xl sm:text-3xl lg:text-4xl italic text-white font-medium max-w-4xl mx-auto absolute"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{ textShadow: "0 0 10px #ffc70040" }}
        >
          “{MANIFESTO_QUOTES[index]}”
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

// --- 4. Animated Vertical Divider ---
const AnimatedDivider: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <div ref={ref} className="hidden lg:block w-px h-full relative">
      <motion.div
        className="absolute w-full bg-gradient-to-b from-transparent via-[#e400f6]/80 to-transparent"
        style={{ height: "30%", top: "0%" }}
        animate={
          inView
            ? {
                top: ["0%", "70%", "0%"],
              }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-0 bg-slate-800/50 w-px h-full" />
    </div>
  );
};

// --- Main Page Component ---
export default function NightCrewPage() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [crewGridRef, scrollToCrewGrid] = useScrollToRef();

  return (
    <main className="min-h-screen bg-[#0a0f1f] text-[#a8b2d1]">
      <SiteHeader />

      {/* 1. Hero Section */}
      <Section className="mt-16 mb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#e400f6] opacity-5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#00f6ff] opacity-5 blur-3xl" />
        </div>

        <motion.h1
          className="relative text-7xl sm:text-8xl lg:text-[10rem] font-extrabold tracking-tighter text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textShadow: "0 0 15px #00f6ff80" }}
        >
          Meet The <span className="text-[#00f6ff]">Night Crew</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Builders of dreams between deadlines. We are{" "}
          <span
            className="font-bold"
            style={{ color: "#ffc700", textShadow: "0 0 5px #ffc70080" }}
          >
            <Typewriter
              words={[
                "Coders.",
                "Designers.",
                "Automators.",
                "Creators.",
                "Hustlers.",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </motion.p>

        <motion.p
          className="mt-4 text-lg max-w-4xl mx-auto italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          "We build by day for others, and by night for ourselves."
        </motion.p>

        <motion.button
          onClick={scrollToCrewGrid}
          className="mt-12 px-8 py-3 text-lg font-bold rounded-full bg-cyan-500/10 border border-cyan-500/50 text-white shadow-lg relative overflow-hidden"
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 25px #00f6ff`,
            transition: { duration: 0.3 },
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="relative z-10"
            initial={{ textShadow: "0 0 10px #00f6ff" }}
            animate={{ textShadow: "0 0 20px #00f6ff" }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
          >
            See Our Crew
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-cyan-500/20"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.button>
      </Section>

      {/* 2. Team Grid Section ("Our Crew") */}
      <Section className="mb-24" ref={crewGridRef}>
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Our Operatives (Codename Cards)
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.codename}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CodenameCard
                  {...member}
                  isActive={activeLocation === member.location}
                  onClick={() => setActiveLocation(member.location)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* 3. "Where We Hustle" Section (Interactive Map) */}
      <Section className="mb-24">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Where We Hustle (Global Network)
        </h2>
        <div className="relative">
          <InteractiveMap
            team={TEAM_MEMBERS}
            activeLocation={activeLocation}
            setActiveLocation={setActiveLocation}
          />
          <CrewLegend
            team={TEAM_MEMBERS}
            activeLocation={activeLocation}
            setActiveLocation={setActiveLocation}
          />
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">
          Click on a city in the legend to zoom in.
        </p>
      </Section>

      {/* 4. "Day vs. Night" Section */}
      <Section className="mb-24">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 items-start">
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center text-3xl font-bold text-[#00f6ff] mb-4">
              <Briefcase className="w-6 h-6 mr-3" /> By Day
            </div>
            <h3 className="text-xl text-white mb-4">The Professionals</h3>
            <p className="text-lg">
              We clock in as **Senior Developers, Data Scientists, and
              Engineering Leaders** for top-tier global companies. This is where
              we hone our craft, learn new tech, and master scalable production
              environments.
            </p>
          </div>

          <AnimatedDivider />

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center text-3xl font-bold text-[#ffc700] mb-4">
              <Moon className="w-6 h-6 mr-3" /> By Night
            </div>
            <h3 className="text-xl text-white mb-4">The Creators</h3>
            <p className="text-lg">
              When the 9-to-5 ends, the passion begins. We are **builders,
              creators, and innovators** working on decentralized apps,
              open-source tools, custom prototypes, and our own dream projects.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. Manifesto Carousel */}
      <Section className="mb-24">
        <ManifestoCarousel />
      </Section>

      {/* Footer CTA */}
      <SiteFooter />
    </main>
  );
}

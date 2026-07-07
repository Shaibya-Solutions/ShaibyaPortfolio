"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Globe, Clock, BookOpen, Sparkles, Rocket, Sun, Moon } from "lucide-react";

// ──────────────────────────────────────────────────────────────────────
// SPOTLIGHT WRAPPER CARD
// Tracks cursor position and creates a moving border/background glow.
// ──────────────────────────────────────────────────────────────────────
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(14, 165, 233, 0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 transition-all duration-300 group hover:shadow-2xl hover:border-sky-500/20 dark:hover:border-sky-500/10 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// CARD 1: REMOTE & BORDERLESS CARD
// Features an SVG node connection map that pulses from HQ on hover.
// ──────────────────────────────────────────────────────────────────────
export function RemotePerkCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SpotlightCard
      className="h-[540px] flex flex-col justify-between p-8"
      spotlightColor="rgba(14, 165, 233, 0.15)"
    >
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="h-full flex flex-col justify-between">
        <div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: "rgba(14, 165, 233, 0.1)" }}
          >
            <Globe className="w-6 h-6 text-[#0ea5e9]" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
            100% Remote & Borderless
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Work from your college dorm, a quiet cafe in Nagpur, or anywhere else globally. We hire for ambition, not location.
          </p>
        </div>

        {/* Interactive network visualization */}
        <div className="h-56 w-full relative overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/50 mt-6 flex items-center justify-center">
          <svg className="w-full h-full p-4" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Connection Lines */}
            <g className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1.5">
              {/* Nagpur to Noida */}
              <line x1="150" y1="130" x2="80" y2="50" />
              {/* Nagpur to Bangalore */}
              <line x1="150" y1="130" x2="130" y2="40" />
              {/* Nagpur to Mumbai */}
              <line x1="150" y1="130" x2="220" y2="70" />
              {/* Nagpur to Global/Remote */}
              <line x1="150" y1="130" x2="240" y2="150" />
            </g>

            {/* Pulsing Animated Connections on Hover */}
            {isHovered && (
              <g className="stroke-sky-500/60 dark:stroke-sky-400/60" strokeWidth="2" strokeLinecap="round">
                <motion.line
                  x1="150" y1="130" x2="80" y2="50"
                  strokeDasharray="8 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <motion.line
                  x1="150" y1="130" x2="130" y2="40"
                  strokeDasharray="8 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                />
                <motion.line
                  x1="150" y1="130" x2="220" y2="70"
                  strokeDasharray="8 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                />
                <motion.line
                  x1="150" y1="130" x2="240" y2="150"
                  strokeDasharray="8 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </g>
            )}

            {/* Nodes */}
            {/* Noida */}
            <circle cx="80" cy="50" r="4" className="fill-slate-400 dark:fill-slate-600" />
            {isHovered && <circle cx="80" cy="50" r="10" className="stroke-sky-500/40 animate-ping" strokeWidth="1" />}
            {isHovered && <circle cx="80" cy="50" r="4" className="fill-sky-500" />}

            {/* Bangalore */}
            <circle cx="130" cy="40" r="4" className="fill-slate-400 dark:fill-slate-600" />
            {isHovered && <circle cx="130" cy="40" r="10" className="stroke-sky-500/40 animate-ping" strokeWidth="1" />}
            {isHovered && <circle cx="130" cy="40" r="4" className="fill-sky-500" />}

            {/* Mumbai */}
            <circle cx="220" cy="70" r="4" className="fill-slate-400 dark:fill-slate-600" />
            {isHovered && <circle cx="220" cy="70" r="10" className="stroke-sky-500/40 animate-ping" strokeWidth="1" />}
            {isHovered && <circle cx="220" cy="70" r="4" className="fill-sky-500" />}

            {/* Global/Remote */}
            <circle cx="240" cy="150" r="4" className="fill-slate-400 dark:fill-slate-600" />
            {isHovered && <circle cx="240" cy="150" r="10" className="stroke-sky-500/40 animate-ping" strokeWidth="1" />}
            {isHovered && <circle cx="240" cy="150" r="4" className="fill-sky-500" />}

            {/* Nagpur HQ Node */}
            <circle cx="150" cy="130" r="7" className="fill-sky-500" />
            <circle cx="150" cy="130" r="14" className="stroke-sky-500/30 animate-pulse" strokeWidth="2" />
            <circle cx="150" cy="130" r="3" className="fill-white" />

            {/* Labels on Hover */}
            <g className="fill-slate-600 dark:fill-slate-400 text-[8px] font-mono select-none pointer-events-none">
              <text x="162" y="134" className="fill-sky-500 font-bold">HQ (Nagpur)</text>
              {isHovered && (
                <>
                  <text x="44" y="53">Noida</text>
                  <text x="105" y="32">Bangalore</text>
                  <text x="228" y="66">Mumbai</text>
                  <text x="210" y="165">Global Remote</text>
                </>
              )}
            </g>
          </svg>

          {/* Hover suggestion banner */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-wider opacity-60 uppercase pointer-events-none text-slate-400">
            {isHovered ? "Connection active" : "Hover to establish link"}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

// ──────────────────────────────────────────────────────────────────────
// CARD 2: FULLY FLEXIBLE TIME CARD
// Features a dial that rotates with cursor movement, changing background from Day to Night.
// ──────────────────────────────────────────────────────────────────────
export function TimePerkCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverProgress, setHoverProgress] = useState(0.3); // ranges from 0 to 1
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.min(Math.max(x / rect.width, 0), 1);
    setHoverProgress(progress);
  };

  // Convert hoverProgress into hours for the clock (0 -> 8:00 AM, 1 -> 11:00 PM)
  const calculateTime = () => {
    const totalMinutes = 8 * 60 + hoverProgress * (15 * 60); // 8:00 AM to 11:00 PM is 15 hours
    const hour = Math.floor(totalMinutes / 60);
    const minute = Math.floor(totalMinutes % 60);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  const isNight = hoverProgress > 0.55;

  return (
    <SpotlightCard
      className="h-[540px] flex flex-col justify-between p-8"
      spotlightColor="rgba(249, 115, 22, 0.15)"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          // Gently drift back to center/neutral
          setHoverProgress(0.3);
        }}
        className="h-full flex flex-col justify-between"
      >
        <div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: "rgba(249, 115, 22, 0.1)" }}
          >
            <Clock className="w-6 h-6 text-[#f97316]" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
            Fully Flexible Time
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            No rigid timetables or micromanagement. You own your schedule and work hours. As long as you deliver impact, you are free.
          </p>
        </div>

        {/* Day/Night slider canvas */}
        <div
          className="h-56 w-full relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900/50 mt-6 flex flex-col items-center justify-center transition-colors duration-500"
          style={{
            background: isNight
              ? "radial-gradient(circle at center, #0f172a 0%, #020617 100%)"
              : "radial-gradient(circle at center, #fffbeb 0%, #fef3c7 60%, #ffedd5 100%)",
          }}
        >
          {/* Stars for night view */}
          <div
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{ opacity: isNight ? 1 : 0 }}
          >
            {[
              { top: "20%", left: "15%" },
              { top: "35%", left: "80%" },
              { top: "15%", left: "70%" },
              { top: "60%", left: "25%" },
              { top: "70%", left: "75%" },
            ].map((star, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: star.top,
                  left: star.left,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Orbit Line */}
          <div className="w-36 h-36 border-2 border-dashed border-slate-300/40 dark:border-slate-800/40 rounded-full absolute flex items-center justify-center">
            {/* Celestial Body Rotator */}
            <motion.div
              className="w-full h-full absolute flex items-start justify-center"
              style={{ rotate: hoverProgress * 360 - 90 }}
            >
              {/* Sun or Moon depending on location on orbit */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg -mt-4 border border-orange-100 dark:border-slate-800">
                {isNight ? (
                  <Moon className="w-4 h-4 text-sky-400 fill-sky-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
                )}
              </div>
            </motion.div>

            {/* Glowing clock display in the middle */}
            <div className="w-24 h-24 bg-white/80 dark:bg-slate-900/90 backdrop-blur border border-white/20 dark:border-white/5 rounded-full shadow-lg flex flex-col items-center justify-center z-10">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {isNight ? "Night Shift" : "Core hours"}
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-1">
                {calculateTime()}
              </span>
            </div>
          </div>

          {/* Interactive trackbar indicator */}
          <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[9px] font-mono text-slate-400 z-10">
            <span>Morning</span>
            <span className="opacity-50">Move cursor left & right</span>
            <span>Midnight</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

// ──────────────────────────────────────────────────────────────────────
// CARD 3: REAL-WORLD GROWTH CARD
// Features a dynamic growing chart and a level counter that increments on hover.
// ──────────────────────────────────────────────────────────────────────
export function GrowthPerkCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [level, setLevel] = useState(1);

  // Counter logic when hovered
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setLevel((prev) => {
          if (prev >= 99) return 99;
          return prev + 2;
        });
      }, 25);
    } else {
      interval = setInterval(() => {
        setLevel((prev) => {
          if (prev <= 1) return 1;
          return prev - 3;
        });
      }, 15);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <SpotlightCard
      className="h-[540px] flex flex-col justify-between p-8"
      spotlightColor="rgba(16, 185, 129, 0.15)"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-full flex flex-col justify-between"
      >
        <div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
          >
            <BookOpen className="w-6 h-6 text-[#10b981]" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
            Real-World Growth
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Forget theoretical tutorials and video courses. We offer growth in perspective—learning through hands-on deployment and business strategy.
          </p>
        </div>

        {/* Telemetry dashboard */}
        <div className="h-56 w-full relative overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/50 mt-6 p-4 flex flex-col justify-between">
          {/* Header metrics */}
          <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-900 pb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">Telemetry Engine</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-mono text-emerald-500">LIVE GAINS</span>
            </div>
          </div>

          {/* Main Visual: Spline Growth Chart */}
          <div className="relative h-24 w-full mt-2">
            {/* The SVG curve */}
            <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area filled path */}
              <motion.path
                d="M0 70 C 40 65, 80 55, 120 40 C 160 25, 180 15, 200 10 L 200 80 L 0 80 Z"
                fill="url(#chartGradient)"
                initial={{ opacity: 0.1, y: 15 }}
                animate={{ opacity: isHovered ? 1 : 0.2, y: isHovered ? 0 : 5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Glowing outline line */}
              <motion.path
                d="M0 70 C 40 65, 80 55, 120 40 C 160 25, 180 15, 200 10"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                initial={{ pathLength: 0.2 }}
                animate={{ pathLength: isHovered ? 1 : 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Glowing particle tracing the curve */}
              {isHovered && (
                <motion.circle
                  r="4"
                  fill="#fff"
                  stroke="#10b981"
                  strokeWidth="2"
                  animate={{
                    cx: [0, 40, 80, 120, 160, 200],
                    cy: [70, 65, 55, 40, 25, 10],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
              )}
            </svg>

            {/* Labels overlay */}
            <div className="absolute left-1 top-12 text-[8px] font-mono text-slate-400">
              Tutorial Hell
            </div>
            <div className="absolute right-1 top-2 text-[8px] font-mono text-emerald-500 font-bold">
              Prod Release (100% Impact)
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-200/50 dark:border-slate-900 pt-2 text-[10px] font-mono">
            <div className="flex flex-col">
              <span className="text-slate-400">ENGINEERING SPEED</span>
              <span className="font-bold text-slate-800 dark:text-white">
                {isHovered ? "10x Faster" : "1x Standard"}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-slate-400">EXPERIENCE RANK</span>
              <span className="font-bold text-emerald-500">
                LEVEL {level} / 99
              </span>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

// ──────────────────────────────────────────────────────────────────────
// CARD 4: FUTURE FOUNDER TRACK CARD
// Features a launch countdown, rocket takeoff simulation, and a valuation ticking up.
// ──────────────────────────────────────────────────────────────────────
export function FounderPerkCard() {
  const [launchState, setLaunchState] = useState<"idle" | "countdown" | "launched">("idle");
  const [countdown, setCountdown] = useState(3);
  const [valuation, setValuation] = useState(0);

  const startLaunch = () => {
    if (launchState !== "idle") return;
    setLaunchState("countdown");
    setCountdown(3);
  };

  // Countdown timer effect
  useEffect(() => {
    if (launchState !== "countdown") return;

    if (countdown > 1) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLaunchState("launched");
        setValuation(0);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [countdown, launchState]);

  // Valuation counter animation effect
  useEffect(() => {
    if (launchState !== "launched") return;

    const interval = setInterval(() => {
      setValuation((prev) => {
        if (prev >= 1250000) {
          clearInterval(interval);
          return 1250000;
        }
        // Increment exponentially
        return prev + Math.floor((1250000 - prev) * 0.15) + 5000;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [launchState]);

  const resetLauncher = () => {
    setLaunchState("idle");
    setValuation(0);
  };

  const formatValuation = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <SpotlightCard
      className="h-[540px] flex flex-col justify-between p-8"
      spotlightColor="rgba(236, 72, 153, 0.15)"
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: "rgba(236, 72, 153, 0.1)" }}
          >
            <Sparkles className="w-6 h-6 text-[#ec4899]" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
            Future Founder Track
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Learn client scoping, engineering economics, and how to launch MVPs. We actively support interns who want to build their own startups.
          </p>
        </div>

        {/* Launch Pad Simulation Canvas */}
        <div className="h-56 w-full relative overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/50 mt-6 flex flex-col items-center justify-between p-4">
          <AnimatePresence mode="wait">
            {launchState === "idle" && (
              <motion.div
                key="launch-idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full w-full"
              >
                <div className="mb-4">
                  <Rocket className="w-10 h-10 text-slate-300 dark:text-slate-700 animate-bounce" />
                </div>
                <button
                  onClick={startLaunch}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs font-mono tracking-wider shadow-lg hover:shadow-pink-500/20 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  LAUNCH STARTUP MVP
                </button>
              </motion.div>
            )}

            {launchState === "countdown" && (
              <motion.div
                key="launch-countdown"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="flex flex-col items-center justify-center h-full w-full"
              >
                <span className="text-[10px] font-mono text-slate-400 mb-1 uppercase tracking-widest">
                  T-MINUS
                </span>
                <span className="text-5xl font-mono font-black text-rose-500 animate-pulse">
                  {countdown}
                </span>
              </motion.div>
            )}

            {launchState === "launched" && (
              <motion.div
                key="launch-active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden"
              >
                {/* Shake simulation backdrop */}
                <motion.div
                  className="absolute inset-0 bg-rose-500/5 pointer-events-none"
                  animate={{
                    x: valuation < 1250000 ? [-1, 1, -1, 1, 0] : 0,
                    y: valuation < 1250000 ? [1, -1, 1, -1, 0] : 0,
                  }}
                  transition={{ repeat: Infinity, duration: 0.1 }}
                />

                {/* Vertical Rocket Launch */}
                <div className="absolute h-full w-full flex justify-center items-start pointer-events-none">
                  <motion.div
                    initial={{ y: 120, scale: 0.8 }}
                    animate={{
                      y: [-20, -180],
                      scale: [0.8, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      times: [0, 1],
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    }}
                    className="flex flex-col items-center"
                  >
                    <Rocket className="w-8 h-8 text-pink-500 fill-pink-500 rotate-0" />
                    {/* Fire engine plume */}
                    <div className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-yellow-300 rounded-full animate-pulse mt-0.5" />
                  </motion.div>
                </div>

                {/* Telemetry output */}
                <div className="z-10 bg-slate-900/90 text-white border border-white/10 px-4 py-3 rounded-xl shadow-2xl flex flex-col items-center">
                  <span className="text-[8px] font-mono text-pink-400 uppercase tracking-widest font-bold">
                    Startup Valuation
                  </span>
                  <span className="text-xl font-mono font-bold tracking-tight text-white mt-1">
                    {formatValuation(valuation)}
                  </span>
                  {valuation >= 1250000 && (
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={resetLauncher}
                      className="mt-2.5 px-2 py-0.5 rounded text-[8px] font-mono bg-white/10 hover:bg-white/20 uppercase tracking-widest text-slate-300 cursor-pointer"
                    >
                      Reset Sim
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SpotlightCard>
  );
}

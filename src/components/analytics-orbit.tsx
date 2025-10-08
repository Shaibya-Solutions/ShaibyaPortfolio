"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

interface Metric {
  id: number;
  label: string;
  value: number;
  suffix?: string;
  planetName: string; // e.g., "Jupiter", "Mars", "Earth", "Mercury"
  orbitRadius: number; // Define a distinct radius for each planet's orbit
  highlightColor: string; // Color for its orbit line when highlighted
}

const metrics: Metric[] = [
  {
    id: 1,
    label: "Projects Completed",
    value: 82,
    suffix: "+",
    planetName: "Mars",
    orbitRadius: 200,
    highlightColor: "#FF8A65",
  }, // Softer Red/Orange
  {
    id: 2,
    label: "Hours Spent",
    value: 4200,
    suffix: "+",
    planetName: "Jupiter",
    orbitRadius: 280,
    highlightColor: "#FFCC80",
  }, // Softer Orange/Yellow
  {
    id: 3,
    label: "Countries Reached",
    value: 14,
    suffix: "+",
    planetName: "Mercury",
    orbitRadius: 140,
    highlightColor: "#E0E0E0",
  }, // Light Gray
  {
    id: 4,
    label: "Active Clients",
    value: 35,
    suffix: "+",
    planetName: "Earth",
    orbitRadius: 240,
    highlightColor: "#81D4FA",
  }, // Light Blue
];

// Sort metrics by orbitRadius so smaller orbits are drawn first (visually behind larger ones)
metrics.sort((a, b) => a.orbitRadius - b.orbitRadius);

export default function AnalyticsOrbit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const controls = useAnimation();
  const [highlightedPlanet, setHighlightedPlanet] = useState<Metric | null>(
    null
  );

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Calculate dynamic planet sizes based on values
  const maxMetricValue = useMemo(
    () => Math.max(...metrics.map((m) => m.value)),
    []
  );

  const getPlanetSize = (value: number) => {
    // Map value to a size range, e.g., 40px to 100px
    const minSize = 40;
    const maxSize = 100;
    return minSize + (value / maxMetricValue) * (maxSize - minSize);
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center py-28 overflow-hidden bg-gradient-to-b from-[#0b0f17] to-[#10131c]"
    >
      {/* Soft glow background */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/10 blur-[120px] rounded-full" />

      {/* Headline */}
      <div className="z-10 text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Numbers that Orbit Us
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto drop-shadow-sm">
          Our journey visualized — data that revolves around creativity.
        </p>
      </div>

      {/* Orbit visualization */}
      <div className="relative w-full max-w-2xl h-[600px] flex items-center justify-center">
        {/* Orbit rings with dynamic highlighting */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {metrics.map((metric) => (
            <motion.div
              key={`orbit-${metric.id}`}
              className="absolute rounded-full border-2"
              style={{
                width: metric.orbitRadius * 2,
                height: metric.orbitRadius * 2,
                borderColor:
                  highlightedPlanet?.id === metric.id
                    ? metric.highlightColor
                    : "rgba(255,255,255,0.08)",
                boxShadow:
                  highlightedPlanet?.id === metric.id
                    ? `0 0 15px 3px ${metric.highlightColor}88`
                    : "none",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          ))}
        </motion.div>

        {/* Center Core / Highlighted Planet Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col items-center justify-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
          style={{ textShadow: "0 0 8px rgba(255,255,255,0.3)" }}
        >
          {highlightedPlanet ? (
            <>
              <div className="text-4xl font-extrabold text-white mb-1 drop-shadow-md">
                {highlightedPlanet.value}
                {highlightedPlanet.suffix}
              </div>
              <div className="text-lg text-slate-200 mt-1 drop-shadow-sm">
                {highlightedPlanet.label}
              </div>
              <div className="text-sm text-slate-400 mt-0.5 font-light">
                ({highlightedPlanet.planetName})
              </div>
            </>
          ) : (
            <>
              <div className="text-3xl font-semibold text-white/90 drop-shadow-md">
                Creativity
              </div>
              <div className="text-base text-slate-400 drop-shadow-sm">
                At Our Core
              </div>
            </>
          )}
        </motion.div>

        {/* Orbiting Container for Planets */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{
            rotate: 360,
            transition: {
              duration: 60, // Slower rotation
              ease: "linear",
              repeat: Infinity,
            },
          }}
        >
          {/* Orbiting Planets */}
          {metrics.map((metric, i) => {
            const angle = (i / metrics.length) * 2 * Math.PI; // Calculate angle in radians for initial placement
            const x = metric.orbitRadius * Math.cos(angle);
            const y = metric.orbitRadius * Math.sin(angle);
            const planetSize = getPlanetSize(metric.value);

            return (
              <motion.div
                key={metric.id}
                className="absolute cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 ease-out bg-cover bg-center"
                custom={i}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, scale: 0.2 },
                  visible: (i) => ({
                    opacity: 1,
                    scale: highlightedPlanet?.id === metric.id ? 1.2 : 1, // Highlight scale
                    transition: {
                      delay: i * 0.2,
                      duration: 0.8,
                      ease: "easeOut",
                    },
                  }),
                }}
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: `translate(-50%, -50%) rotate(-${
                    (360 / metrics.length) * i
                  }deg)`, // Counter-rotate for text alignment
                  width: planetSize,
                  height: planetSize,
                  backgroundImage: `url(/${metric.planetName.toLowerCase()}.png)`, // Use the generated images
                  boxShadow:
                    highlightedPlanet?.id === metric.id
                      ? `0 0 25px 8px ${metric.highlightColor}aa`
                      : "0 0 10px rgba(0,0,0,0.5)", // Stronger glow
                  zIndex: highlightedPlanet?.id === metric.id ? 20 : 10, // Bring highlighted planet to front
                }}
                onClick={() => setHighlightedPlanet(metric)}
                onMouseEnter={() =>
                  !highlightedPlanet && setHighlightedPlanet(metric)
                }
                onMouseLeave={() =>
                  !highlightedPlanet && setHighlightedPlanet(null)
                }
              >
                {/* Planet name label beside the planet */}
                <span
                  className="absolute text-xs text-slate-300 w-[100px] text-center pointer-events-none drop-shadow-sm font-medium"
                  style={{
                    transform: `translateY(${planetSize / 2 + 20}px) rotate(${
                      (360 / metrics.length) * i
                    }deg)`,
                  }}
                >
                  {" "}
                  {/* Counter-rotate text */}
                  {metric.planetName}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* Animated Counter (not used in this version but kept for potential future use) */
function AnimatedCounter({
  target,
  suffix,
  trigger,
}: {
  target: number;
  suffix?: string;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1500;
    const stepTime = Math.max(16, Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <motion.div
      className="text-2xl md:text-3xl font-bold text-white mb-1"
      whileHover={{ scale: 1.08 }}
    >
      {count}
      {suffix}
    </motion.div>
  );
}

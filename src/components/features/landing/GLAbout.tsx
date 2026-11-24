"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { ArrowRight, AudioLines, Code2, DraftingCompass, Rocket, Search, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { formations, pieceTone } from "./process-formations";
import styles from "./GLAbout.module.css";

const ProcessScene = dynamic(() => import("./ProcessScene"), { ssr: false });
const scrollLayout = "(min-width: 1280px) and (min-height: 850px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

const stages = [
  {
    title: "Discovery",
    time: "Week 1",
    heading: "Understand what matters.",
    body: "In a free 30-minute WhatsApp call, we learn how your business works, where you’re getting stuck, and what a better outcome looks like.",
    outcomes: ["A map of your current workflow", "High-impact improvements to tackle first", "A clear next step for your project"],
    icon: Search,
    accent: "#81d9ff",
    background: "#0a182a",
  },
  {
    title: "Design",
    time: "Weeks 1–2",
    heading: "See it before we build it.",
    body: "We turn the plan into wireframes, user flows, and a technical blueprint. You can see how it will work and approve the design before development starts.",
    outcomes: ["Wireframes for the main screens", "Agreed architecture and data structure", "Design sign-off before development"],
    icon: DraftingCompass,
    accent: "#b3c5ff",
    background: "#15203a",
  },
  {
    title: "Build",
    time: "Weeks 2–4",
    heading: "Build in the open.",
    body: "We deliver working software in focused sprints, show you progress every week, and refine each release with your feedback.",
    outcomes: ["Working software in increments", "Weekly demos and a clear view of progress", "Testing throughout development"],
    icon: Code2,
    accent: "#83ead7",
    background: "#0a222c",
  },
  {
    title: "Launch",
    time: "Weeks 4–5",
    heading: "Launch with a plan.",
    body: "We run final QA, configure the domain, and roll out your system. Your team gets the documentation, access, and training to run it.",
    outcomes: ["Staged rollout and final checks", "Performance and search readiness", "Documentation and full handover"],
    icon: Rocket,
    accent: "#8edcff",
    background: "#102442",
  },
  {
    title: "Support",
    time: "Post-launch",
    heading: "Keep things running.",
    body: "Every project includes 30 days of post-launch support. We monitor performance, fix issues, and help your team get comfortable using the system.",
    outcomes: ["30 days of included support", "Uptime and performance monitoring", "Hands-on team walkthroughs"],
    icon: AudioLines,
    accent: "#d2baff",
    background: "#1b1c37",
  },
  {
    title: "Optimize",
    time: "Ongoing",
    heading: "Improve what’s working.",
    body: "Analytics help us decide what to improve next. As your business grows, we can streamline workflows, add automation, and connect tools such as your CRM.",
    outcomes: ["Analytics to guide improvements", "Automation for repeated work", "Room to scale as your needs change"],
    icon: TrendingUp,
    accent: "#b9edb3",
    background: "#102832",
  },
];

const positions = stages.map((_, index) => index / (stages.length - 1));
const stageBackgrounds = stages.map(({ background }) => background);

function ProcessPreview({ stage, accent }: { stage: number; accent: string }) {
  return (
    <div className={styles.preview} data-process-preview>
      {formations[stage].map(({ x, y, z, angle, width, height }, index) => (
        <span
          key={index}
          style={{
            left: `${50 + (x * 0.95 - z * 0.3) * 18}%`,
            top: `${50 - (y * 0.98 - x * 0.05 - z * 0.21) * 24}%`,
            width: `${width * 18}%`,
            height: `${height * 24}%`,
            rotate: `${-angle}rad`,
            zIndex: Math.round((z + 2) * 10),
            backgroundColor: pieceTone(stage, index, accent),
          }}
        />
      ))}
    </div>
  );
}

export default function GLAbout() {
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reducedMotion = useReducedMotion();
  const { ref: artwork, inView: showScene } = useInView({ rootMargin: "240px 0px", triggerOnce: true });
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const easedProgress = useSpring(scrollYProgress, { stiffness: 175, damping: 30, restDelta: 0.001 });
  const scrollColor = useTransform(easedProgress, positions, stageBackgrounds);

  useEffect(() => {
    const media = window.matchMedia(scrollLayout);
    const sync = () => {
      setPinned(media.matches);
      if (media.matches) setActive(Math.round(scrollYProgress.get() * (stages.length - 1)));
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (pinned) setActive(Math.round(progress * (stages.length - 1)));
  });

  function select(index: number) {
    const bounds = section.current?.getBoundingClientRect();
    if (pinned && bounds) {
      const distance = Math.max(0, bounds.height - window.innerHeight);
      window.scrollTo({ top: window.scrollY + bounds.top + distance * positions[index], behavior: "instant" });
    }
    setActive(index);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const key = event.key;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const last = stages.length - 1;
    const next = key === "Home" ? 0 : key === "End" ? last
      : (index + (key === "ArrowRight" ? 1 : -1) + stages.length) % stages.length;
    tabs.current[next]?.focus({ preventScroll: true });
    select(next);
  }

  const step = stages[active];
  const inquiry = encodeURIComponent(`Hi Shaibya Solutions, I'd like to discuss the ${step.title.toLowerCase()} stage of a project.`);

  return (
    <motion.section
      id="about"
      ref={section}
      aria-labelledby="process-heading"
      className={styles.section}
      data-process-section
      data-process-layout={pinned ? "immersive" : "compact"}
      style={{
        "--process-accent": step.accent,
        "--process-background": step.background,
        backgroundColor: pinned ? scrollColor : undefined,
      } as MotionStyle}
    >
      <div className={styles.inner}>
        <div className={styles.container}>
          <header className={styles.heading}>
            <h2 id="process-heading">How we build with you<span>.</span></h2>
            <nav className={styles.tabs} role="tablist" aria-label="Project stages">
              {stages.map(({ title, icon: Icon }, index) => (
                <button
                  key={title}
                  ref={(element) => { tabs.current[index] = element; }}
                  id={`process-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-controls="process-panel"
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => navigate(event, index)}
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.7} />
                  {title}
                </button>
              ))}
            </nav>
          </header>

          <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${active}`} className={styles.panel}>
            <motion.div
              key={step.title}
              className={styles.copy}
              data-process-copy
              initial={reducedMotion ? false : { opacity: 0.72, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
            >
              <p className={styles.timing}>{step.time}</p>
              <h3>{step.heading}</h3>
              <p className={styles.description}>{step.body}</p>
              <ul className={styles.outcomes}>
                {step.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
              <a className={styles.contact} href={`https://wa.me/917498341146?text=${inquiry}`} target="_blank" rel="noopener noreferrer">
                Discuss your project <ArrowRight aria-hidden="true" size={17} />
              </a>
            </motion.div>

            <div ref={artwork} className={styles.art} data-process-art aria-hidden="true">
              <ProcessPreview stage={active} accent={step.accent} />
              {showScene && !reducedMotion && <ProcessScene stage={active} accent={step.accent} />}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

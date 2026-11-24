"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { formations, pieceTone } from "./process-formations";
import styles from "./GLAbout.module.css";

const ProcessScene = dynamic(() => import("./ProcessScene"), { ssr: false });

const stages = [
  {
    title: "Discovery",
    time: "Week 1",
    heading: "Understand what matters.",
    body: "In a free 30-minute WhatsApp call, we learn how your business works, where you’re getting stuck, and what a better outcome looks like.",
    outcomes: ["A map of your current workflow", "High-impact improvements to tackle first", "A clear next step for your project"],
    accent: "#81d9ff",
    background: "#0a182a",
  },
  {
    title: "Design",
    time: "Weeks 1–2",
    heading: "See it before we build it.",
    body: "We turn the plan into wireframes, user flows, and a technical blueprint. You can see how it will work and approve the design before development starts.",
    outcomes: ["Wireframes for the main screens", "Agreed architecture and data structure", "Design sign-off before development"],
    accent: "#b3c5ff",
    background: "#15203a",
  },
  {
    title: "Build",
    time: "Weeks 2–4",
    heading: "Build in the open.",
    body: "We deliver working software in focused sprints, show you progress every week, and refine each release with your feedback.",
    outcomes: ["Working software in increments", "Weekly demos and a clear view of progress", "Testing throughout development"],
    accent: "#83ead7",
    background: "#0a222c",
  },
  {
    title: "Launch",
    time: "Weeks 4–5",
    heading: "Launch with a plan.",
    body: "We run final QA, configure the domain, and roll out your system. Your team gets the documentation, access, and training to run it.",
    outcomes: ["Staged rollout and final checks", "Performance and search readiness", "Documentation and full handover"],
    accent: "#8edcff",
    background: "#102442",
  },
  {
    title: "Support",
    time: "Post-launch",
    heading: "Keep things running.",
    body: "Every project includes 30 days of post-launch support. We monitor performance, fix issues, and help your team get comfortable using the system.",
    outcomes: ["30 days of included support", "Uptime and performance monitoring", "Hands-on team walkthroughs"],
    accent: "#d2baff",
    background: "#1b1c37",
  },
  {
    title: "Optimize",
    time: "Ongoing",
    heading: "Improve what’s working.",
    body: "Analytics help us decide what to improve next. As your business grows, we can streamline workflows, add automation, and connect tools such as your CRM.",
    outcomes: ["Analytics to guide improvements", "Automation for repeated work", "Room to scale as your needs change"],
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
  const inner = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const { ref: artwork, inView: showScene } = useInView({ rootMargin: "240px 0px", triggerOnce: true });
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const leadIn = useMotionValue(0);
  const stageProgress = useTransform(() => {
    const start = leadIn.get();
    return Math.max(0, (scrollYProgress.get() - start) / (1 - start));
  });
  const easedProgress = useSpring(stageProgress, { stiffness: 175, damping: 30, restDelta: 0.001 });
  const scrollColor = useTransform(easedProgress, positions, stageBackgrounds);

  useEffect(() => {
    const content = inner.current;
    const container = section.current;
    if (!content || !container) return;
    const measure = () => {
      const viewport = window.innerHeight;
      const overflow = Math.max(0, content.offsetHeight - viewport);
      const distance = Math.max(1, container.offsetHeight - viewport);
      content.style.top = `${-overflow}px`;
      leadIn.set(Math.min(0.95, overflow / distance));
    };
    const resize = new ResizeObserver(measure);
    resize.observe(content);
    resize.observe(container);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      resize.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [leadIn]);

  useMotionValueEvent(stageProgress, "change", (progress) => {
    setActive(Math.min(stages.length - 1, Math.floor(progress * stages.length)));
  });

  const step = stages[active];

  return (
    <motion.section
      id="about"
      ref={section}
      aria-labelledby="process-heading"
      className={styles.section}
      data-process-section
      style={{
        "--process-accent": step.accent,
        "--process-background": step.background,
        backgroundColor: reducedMotion ? undefined : scrollColor,
      } as MotionStyle}
    >
      <div ref={inner} className={styles.inner}>
        <div className={styles.container}>
          <header className={styles.heading}>
            <h2 id="process-heading">How we build with you<span>.</span></h2>
            <ol className={styles.stages} aria-label="Project stages">
              {stages.map(({ title }, index) => (
                <li key={title} aria-current={index === active ? "step" : undefined}>
                  <span>{title}</span>
                </li>
              ))}
            </ol>
          </header>

          <div className={styles.panel}>
            <div className={styles.copies}>
              {stages.map((stage, index) => {
                const current = index === active;
                const inquiry = encodeURIComponent(`Hi Shaibya Solutions, I'd like to discuss the ${stage.title.toLowerCase()} stage of a project.`);
                return (
                  <div key={stage.title} className={styles.copy} aria-hidden={!current} data-process-copy={current ? "active" : undefined}>
                    <p className={styles.timing}>{stage.title} · {stage.time}</p>
                    <h3>{stage.heading}</h3>
                    <p className={styles.description}>{stage.body}</p>
                    <ul className={styles.outcomes}>
                      {stage.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                    </ul>
                    <a className={styles.contact} href={`https://wa.me/917498341146?text=${inquiry}`} target="_blank" rel="noopener noreferrer">
                      Discuss your project <ArrowRight aria-hidden="true" size={17} />
                    </a>
                  </div>
                );
              })}
            </div>

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

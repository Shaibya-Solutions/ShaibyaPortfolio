"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Home01Icon,
    Dumbbell01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const FEATURES = [
    {
        id: "real-estate",
        label: "Real Estate",
        icon: Home01Icon,
        image: "/images/screenshots/mg-infra.png",
        description: "Automated lead capture, WhatsApp bots, and SEO-first property portals.",
        href: "/industry/real-estate",
    },
    {
        id: "fitness",
        label: "Fitness & Gyms",
        icon: Dumbbell01Icon,
        image: "/images/screenshots/revolution-fitness.png",
        description: "Membership management, renewals, and multi-branch dashboards.",
        href: "/industry/fitness",
    },
];

export function FeatureCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChipClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="w-full max-w-7xl mx-auto md:p-8">
            <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-border/40">

                {/* Left — chip list */}
                <div className="w-full lg:w-[40%] min-h-[250px] md:min-h-[300px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-[#0ea5e9]">

                    <div className="relative w-full flex flex-col items-center lg:items-start gap-4 z-20 py-8">
                        {FEATURES.map((feature, index) => {
                            const isActive = index === currentIndex;

                            return (
                                <motion.div
                                    key={feature.id}
                                    layout
                                    transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                                    className="flex items-center justify-start"
                                >
                                    <button
                                        onClick={() => handleChipClick(index)}
                                        className={cn(
                                            "relative flex items-center gap-5 px-8 md:px-12 lg:px-10 py-4 md:py-6 lg:py-5 rounded-full transition-all duration-700 text-left group border cursor-pointer",
                                            isActive
                                                ? "bg-white text-[#0ea5e9] border-white z-10 scale-105 shadow-lg shadow-black/10"
                                                : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                                        )}
                                    >
                                        <div className={cn("flex items-center justify-center transition-colors duration-500", isActive ? "text-[#0ea5e9]" : "text-white/40")}>
                                            <HugeiconsIcon icon={feature.icon} size={24} strokeWidth={2} />
                                        </div>
                                        <span className="font-bold text-lg md:text-xl lg:text-2xl tracking-tight whitespace-nowrap uppercase">
                                            {feature.label}
                                        </span>
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right — image cards */}
                <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-secondary/30 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
                    <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
                        {FEATURES.map((feature, index) => {
                            const isActive = index === currentIndex;

                            return (
                                <motion.div
                                    key={feature.id}
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : index < currentIndex ? -100 : 100,
                                        scale: isActive ? 1 : 0.85,
                                        opacity: isActive ? 1 : 0.4,
                                        rotate: isActive ? 0 : index < currentIndex ? -3 : 3,
                                        zIndex: isActive ? 20 : 10,
                                        pointerEvents: isActive ? "auto" : "none",
                                    }}
                                    transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                                    className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-background bg-background origin-center"
                                >
                                    <img
                                        src={feature.image}
                                        alt={feature.label}
                                        className={cn(
                                            "w-full h-full object-cover object-top transition-all duration-700",
                                            isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                                        )}
                                    />

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end"
                                            >
                                                <div className="bg-background text-foreground px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-border/50">
                                                    {index + 1} • {feature.label}
                                                </div>
                                                <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight mb-4">
                                                    {feature.description}
                                                </p>
                                                <Link
                                                    href={feature.href}
                                                    className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group/link"
                                                >
                                                    <span className="underline underline-offset-4 decoration-white/40 group-hover/link:decoration-white">
                                                        View Case Study
                                                    </span>
                                                    <svg
                                                        className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className={cn("absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300", isActive ? "opacity-100" : "opacity-0")}>
                                        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                                        <span className="text-white/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                                            Live Work
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FeatureCarousel;

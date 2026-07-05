"use client";

import React, { useState, useEffect } from "react";
import {
    Home01Icon,
    Dumbbell01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FEATURES = [
    {
        id: "real-estate",
        label: "Real Estate",
        icon: Home01Icon,
        image: "/images/landing/real_estate_vertical.png",
        description: "Automated lead capture, WhatsApp bots, and SEO-first property portals. Build Nagpur's premium property listing web experiences.",
        href: "/industry/real-estate",
    },
    {
        id: "fitness",
        label: "Fitness & Gyms",
        icon: Dumbbell01Icon,
        image: "/images/landing/fitness_vertical.png",
        description: "Membership management, renewals, and multi-branch dashboards. Automate client check-ins and payment reminders seamlessly.",
        href: "/industry/fitness",
    },
];

export function FeatureCarousel() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:min-h-[600px] max-w-[1340px] mx-auto items-stretch">
                {FEATURES.map((item, index) => {
                    const isAnyHovered = hoveredIndex !== null;
                    const isActive = isAnyHovered ? hoveredIndex === index : false;
                    const isCollapsed = isAnyHovered ? hoveredIndex !== index : false;

                    return (
                        <div
                            key={item.id}
                            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                            onClick={() => isMobile && setHoveredIndex(hoveredIndex === index ? null : index)}
                            style={{
                                flex: isMobile ? 1 : (isActive ? 2.8 : (isCollapsed ? 1.2 : 2)),
                                transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)"
                            }}
                            className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-slate-200/60 relative overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[600px] w-full cursor-pointer"
                        >
                            {/* Image Container — animated width for desktop slide, height for mobile view */}
                            <div
                                style={{
                                    width: isMobile ? "100%" : (isActive ? "50%" : "0%"),
                                    height: isMobile ? "400px" : "100%",
                                    transition: "width 0.65s cubic-bezier(0.16, 1, 0.3, 1), height 0.65s cubic-bezier(0.16, 1, 0.3, 1)"
                                }}
                                className={`overflow-hidden relative shrink-0 ${
                                    isMobile ? "block" : "hidden lg:block"
                                } ${index === 1 ? "lg:order-first" : "lg:order-last"}`}
                            >
                                <div className="h-full w-full absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Content Container — adjusts automatically to fill the remaining width */}
                            <div
                                style={{
                                    width: isMobile ? "100%" : (isActive ? "50%" : "100%"),
                                    transition: "width 0.65s cubic-bezier(0.16, 1, 0.3, 1)"
                                }}
                                className={`p-10 md:p-14 lg:p-16 flex flex-col justify-center relative z-10 bg-white shrink-0 overflow-hidden lg:order-none min-h-[300px] lg:min-h-0 transition-all duration-500 ${
                                    isMobile || isActive ? "items-start text-left" : "items-center text-center"
                                }`}
                            >
                                <div className={`w-full flex-1 flex flex-col justify-center ${
                                    isMobile || isActive ? "items-start text-left" : "items-center text-center"
                                }`}>
                                    {/* Icon & Label */}
                                    <div className={`flex ${isMobile || isActive ? "flex-row items-center text-left" : "flex-col items-center text-center"} gap-5 mb-8`}>
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] shrink-0">
                                            <HugeiconsIcon icon={item.icon} size={28} strokeWidth={2} />
                                        </div>
                                        <div className={`flex flex-col ${isMobile || isActive ? "items-start text-left" : "items-center text-center"}`}>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0ea5e9] mb-1">
                                                Industry Vertical
                                            </span>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 uppercase leading-none" style={{ fontFamily: "var(--font-syne)" }}>
                                                {item.label}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Collapsible Info Section: hides description and CTA when card is collapsed on desktop */}
                                    <div
                                        style={{
                                            opacity: isMobile ? 1 : (isActive ? 1 : 0),
                                            height: isMobile ? "auto" : (isActive ? "auto" : 0),
                                            pointerEvents: isMobile ? "auto" : (isActive ? "auto" : "none"),
                                            transition: "opacity 0.4s ease-out, height 0.4s ease-out",
                                            overflow: "hidden"
                                        }}
                                        className="w-full"
                                    >
                                        <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                                            {item.description}
                                        </p>
                                        
                                        <div>
                                            <Link
                                                href={item.href}
                                                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-5 px-10 rounded-[1.25rem] shadow-lg shadow-sky-500/25 transition-all active:scale-95 uppercase tracking-wider text-xs md:text-sm"
                                            >
                                                View Case Study
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FeatureCarousel;

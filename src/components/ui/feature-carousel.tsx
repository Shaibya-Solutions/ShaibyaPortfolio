"use client";

import { useState } from "react";
import {
    Home01Icon,
    Dumbbell01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { getImageUrl } from "@/lib/imagekit";

const FEATURES = [
    {
        id: "real-estate",
        label: "Real Estate",
        icon: Home01Icon,
        image: getImageUrl("/images/landing/real_estate_vertical.webp"),
        description: "Automated lead capture, WhatsApp bots, and SEO-first property portals. Build Nagpur's premium property listing web experiences.",
        href: "/industry/real-estate",
    },
    {
        id: "fitness",
        label: "Fitness & Gyms",
        icon: Dumbbell01Icon,
        image: getImageUrl("/images/landing/fitness_vertical.webp"),
        description: "Membership management, renewals, and multi-branch dashboards. Automate client check-ins and payment reminders seamlessly.",
        href: "/industry/fitness",
    },
];

export function FeatureCarousel() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <div className="mx-auto w-full max-w-7xl px-6">
            <div className="flex flex-col items-stretch gap-6 sm:grid sm:grid-cols-2 lg:pointer-fine:flex lg:pointer-fine:flex-row lg:pointer-fine:gap-8">
                {FEATURES.map((item, index) => {
                    const isAnyHovered = hoveredIndex !== null;
                    const isActive = isAnyHovered ? hoveredIndex === index : false;
                    const isCollapsed = isAnyHovered ? hoveredIndex !== index : false;

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            aria-label={`Explore ${item.label} case studies`}
                            data-active={isActive}
                            data-collapsed={isCollapsed}
                            onFocus={() => setHoveredIndex(index)}
                            onBlur={() => setHoveredIndex(null)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-lg shadow-slate-900/5 transition-[flex] duration-650 ease-out lg:pointer-fine:h-[600px] lg:pointer-fine:flex-[2] lg:pointer-fine:flex-row lg:pointer-fine:data-[active=true]:flex-[2.8] lg:pointer-fine:data-[collapsed=true]:flex-[1.2]"
                        >
                            {/* Image Container — animated width for desktop slide, height for mobile view */}
                            <div
                                className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100 transition-[width] duration-650 ease-out lg:pointer-fine:aspect-auto lg:pointer-fine:w-0 lg:pointer-fine:group-data-[active=true]:w-1/2 ${index === 1 ? "lg:order-first" : "lg:order-last"}`}
                            >
                                <div className="h-full w-full absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        loading="lazy"
                                        decoding="async"
                                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Content Container — adjusts automatically to fill the remaining width */}
                            <div
                                className="relative flex w-full shrink-0 flex-1 flex-col justify-center bg-white p-5 transition-[width] duration-650 ease-out sm:p-6 lg:pointer-fine:flex-none lg:pointer-fine:p-8 lg:pointer-fine:group-data-[active=true]:w-1/2 xl:pointer-fine:p-12"
                            >
                                <div className="flex w-full flex-1 flex-col items-start justify-center lg:pointer-fine:group-data-[active=false]:items-center">
                                    {/* Icon & Label */}
                                    <div className="mb-4 flex items-center gap-3 lg:pointer-fine:group-data-[active=false]:mb-0 lg:pointer-fine:group-data-[active=false]:flex-col lg:pointer-fine:group-data-[active=false]:text-center">
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 md:size-14">
                                            <HugeiconsIcon icon={item.icon} size={28} strokeWidth={2} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl" style={{ fontFamily: "var(--font-syne)" }}>
                                                {item.label}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Collapsible Info Section: hides description and CTA when card is collapsed on desktop */}
                                    <div
                                        className="flex w-full flex-col justify-between overflow-hidden transition-opacity lg:pointer-fine:group-data-[active=false]:h-0 lg:pointer-fine:group-data-[active=false]:opacity-0"
                                    >
                                        <p className="mb-4 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                                            {item.description}
                                        </p>

                                        <div className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition-transform group-hover:translate-x-1">
                                            <span>Explore Solutions</span>
                                            <span>&rarr;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

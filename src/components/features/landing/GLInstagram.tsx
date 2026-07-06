"use client";

import React from "react";
import { FaPlay } from "react-icons/fa";

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
    alt: "Software development at Shaibya Solutions",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    alt: "Designing beautiful mobile applications",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    alt: "3D modelling & animations showcase",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    alt: "Team pair programming and collaboration",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=600",
    alt: "Modern workspace and tech infrastructure",
  },
];

export default function GLInstagram() {
  const instagramUrl = "https://www.instagram.com/shaibya.solutions/";

  return (
    <section className="bg-[#faf5ef] py-16 md:py-24 overflow-hidden border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        {/* Giant bold pink title */}
        <h2
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none select-none animate-fade-in"
          style={{ fontFamily: "var(--font-syne)", color: "#0ea5e9" }}
        >
          Follow Us
        </h2>
        {/* Handle linked to instagram */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-base sm:text-lg font-bold hover:underline tracking-wide transition-all"
          style={{ color: "rgba(14,165,233,0.75)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#0ea5e9")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(14,165,233,0.75)")}
        >
          @shaibya.solutions
        </a>
      </div>

      {/* Infinite scrolling marquee of reels/posts with left and right gradient blur masks */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left and Right blur masks */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#faf5ef] via-[#faf5ef]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#faf5ef] via-[#faf5ef]/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track container */}
        <div className="marquee-track flex gap-5">
          {/* First set of posts */}
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={`set1-${post.id}`}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-64 md:w-72 aspect-square rounded-2xl overflow-hidden group shrink-0 block cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Translucent play icon overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-slate-800 transform transition-transform duration-300 group-hover:scale-110">
                  <FaPlay size={14} className="ml-1 text-[#e11d48]" />
                </div>
              </div>
            </a>
          ))}

          {/* Second identical set of posts for seamless loop */}
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={`set2-${post.id}`}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-64 md:w-72 aspect-square rounded-2xl overflow-hidden group shrink-0 block cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Translucent play icon overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-slate-800 transform transition-transform duration-300 group-hover:scale-110">
                  <FaPlay size={14} className="ml-1 text-[#e11d48]" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

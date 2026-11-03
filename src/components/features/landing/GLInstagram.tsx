"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { site } from "@/config/site";

const posts = [
  {
    image: "/images/social/creator-shoot.webp",
    title: "Stories worth stopping for",
    alt: "Illustrative cafe content shoot with a camera operator and barista",
  },
  {
    image: "/images/social/product-story.webp",
    title: "A closer look at the details",
    alt: "Illustrative product photography set with soft studio lighting",
  },
  {
    image: "/images/social/editing-studio.webp",
    title: "Behind the edit",
    alt: "Illustrative video editing workspace with a creator at the timeline",
  },
];

export default function GLInstagram() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="bg-[#faf5ef] py-16 md:py-24 overflow-hidden border-t border-slate-200/50"
      aria-label="Instagram creative studio"
    >
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h2
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none text-sky-500"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Follow Us
        </h2>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-lg font-bold text-sky-700 hover:underline"
        >
          @deepoffduty
        </a>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
          Creative concepts from shoot to story. Explore the actual reels on
          Instagram.
        </p>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-white"
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          {paused ? "Resume gallery" : "Pause gallery"}
        </button>
      </div>
      <div className="relative w-full overflow-hidden py-4">
        <div
          className="marquee-track social-gallery-track flex gap-5"
          style={{ animationPlayState: paused ? "paused" : undefined }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex gap-5"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {posts.map((post) => (
                <a
                  key={post.image}
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={copy === 1 ? -1 : 0}
                  className="relative block w-64 md:w-80 aspect-[4/5] shrink-0 overflow-hidden rounded-2xl bg-slate-200 shadow-sm group focus-visible:outline-4 focus-visible:outline-sky-500"
                  aria-label={`${post.title} — visit @deepoffduty on Instagram`}
                >
                  <Image
                    src={post.image}
                    alt={copy === 1 ? "" : post.alt}
                    fill
                    sizes="(max-width: 767px) 256px, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-20 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-white/75">
                      Illustrative creative
                    </span>
                    <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
                      Explore Instagram <ArrowUpRight size={14} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

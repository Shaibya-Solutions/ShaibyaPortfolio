"use client";

import { useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getProjectMediaPoster, getProjectMediaUrl, getProjectVideoSource, isProjectVideo, isPortfolioMediaUrl } from "@/lib/imagekit";

export default function ProjectMedia({ cover, gallery = [], title, alt, sizes = "(max-width: 1024px) 100vw, 50vw", imageStyle }: {
  cover?: string;
  gallery?: string[];
  title: string;
  alt?: string;
  sizes?: string;
  imageStyle?: CSSProperties;
}) {
  const [selected, setSelected] = useState(0);
  const media = [...new Set([cover, ...gallery].map(getProjectMediaUrl).filter(Boolean))];
  const index = selected < media.length ? selected : 0;
  const source = media[index];
  if (!source) return <div className="absolute inset-0 grid place-items-center bg-slate-100 text-sm text-slate-500">No preview</div>;

  const name = index === 0 ? alt || title : `${title} media ${index + 1}`;
  return (
    <div className="absolute inset-0" aria-label={`${title} showcase`}>
      {isProjectVideo(source) ? (
        <video key={source} src={getProjectVideoSource(source)}
          poster={isPortfolioMediaUrl(source) ? getProjectMediaPoster(source) : undefined} controls playsInline preload="none"
          aria-label={name} className="absolute inset-0 z-[2] h-full w-full bg-slate-950 object-contain" />
      ) : (
        <Image key={source} src={source} alt={name} fill sizes={sizes} className="object-cover object-top" style={imageStyle} />
      )}
      {media.length > 1 && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-slate-950/90 px-1 text-white shadow-md">
          <button type="button" aria-label="Previous project media" className="grid size-11 place-items-center rounded-full hover:bg-white/15 focus-visible:outline-2"
            onClick={() => setSelected((index + media.length - 1) % media.length)}><ChevronLeft size={18} aria-hidden /></button>
          <span aria-live="polite" className="text-xs tabular-nums">{index + 1} / {media.length}</span>
          <button type="button" aria-label="Next project media" className="grid size-11 place-items-center rounded-full hover:bg-white/15 focus-visible:outline-2"
            onClick={() => setSelected((index + 1) % media.length)}><ChevronRight size={18} aria-hidden /></button>
        </div>
      )}
    </div>
  );
}

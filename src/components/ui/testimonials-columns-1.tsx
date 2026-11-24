"use client";

import { useState } from "react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex h-full w-full min-w-0 flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <blockquote className="text-[0.95rem] leading-relaxed break-words text-slate-700">{item.text}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <img width={44} height={44} src={item.image} alt="" loading="lazy"
          className="size-11 shrink-0 rounded-full object-cover" />
        <div className="min-w-0 break-words">
          <p className="font-semibold text-slate-900">{item.name}</p>
          <p className="text-sm text-slate-600">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsColumn({ testimonials, duration }: { testimonials: TestimonialItem[]; duration: number }) {
  const [paused, setPaused] = useState(false);
  const repeated = Array.from({ length: Math.max(3, testimonials.length) }, (_, index) =>
    testimonials[index % testimonials.length]);
  return (
    <div className="min-w-0 max-w-xs flex-1" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="testimonial-track" style={{ animationDuration: duration + "s", animationPlayState: paused ? "paused" : undefined }}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="grid gap-6 pb-6">
            {repeated.map((item, index) => (
              <div key={index} aria-hidden={index >= testimonials.length || undefined}>
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard, TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { testimonials as rawTestimonials } from "@/data";

const portraitImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
];

function TestimonialRail({ testimonials }: { testimonials: TestimonialItem[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  function goTo(index: number) {
    const list = rail.current;
    const card = list?.children[index] as HTMLElement | undefined;
    if (!list || !card) return;
    list.scrollTo({ left: card.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function syncActiveCard() {
    const list = rail.current;
    const second = list?.children[1] as HTMLElement | undefined;
    if (!list || !second) return;
    const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 2;
    setActive(atEnd ? testimonials.length - 1 : Math.round(list.scrollLeft / second.offsetLeft));
  }

  return (
    <div className="lg:motion-safe:hidden">
      <ul ref={rail} aria-label="Client stories" onScroll={syncActiveCard}
        className="relative grid auto-cols-[calc(100%-1.25rem)] grid-flow-col snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-3 sm:auto-cols-[75%] md:auto-cols-[62%]">
        {testimonials.map((item, index) => (
          <li key={index} className="min-w-0 snap-start last:snap-end">
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
      {testimonials.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button type="button" aria-label="Previous client story" disabled={active === 0} onClick={() => goTo(active - 1)}
            className="grid size-11 place-items-center rounded-full border border-slate-200 text-slate-800 hover:bg-sky-50 disabled:opacity-45">
            <ChevronLeft size={18} aria-hidden />
          </button>
          <span className="min-w-12 text-center text-sm tabular-nums text-slate-600" aria-live="polite">
            {active + 1} / {testimonials.length}
          </span>
          <button type="button" aria-label="Next client story" disabled={active === testimonials.length - 1} onClick={() => goTo(active + 1)}
            className="grid size-11 place-items-center rounded-full border border-slate-200 text-slate-800 hover:bg-sky-50 disabled:opacity-45">
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

type TestimonialSource = { text: string; author: string; role: string };

export default function GLTestimonials({ items }: { items?: readonly TestimonialSource[] }) {
  const testimonials = (items?.length ? items : rawTestimonials).map((item, index) => ({
    text: item.text,
    image: portraitImages[index % portraitImages.length],
    name: item.author,
    role: item.role,
  }));
  const columnCount = Math.min(3, testimonials.length);
  const columns = Array.from({ length: columnCount }, (_, index) =>
    testimonials.filter((_, position) => position % columnCount === index));

  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-slate-200 bg-white py-16 sm:py-24 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-sky-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center lg:mb-20"
        >
          <div className="mb-4 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Client Stories
          </div>
          <h2 className="font-heading text-[clamp(1.85rem,6vw,3rem)] leading-tight font-bold tracking-tight text-slate-900 text-balance">
            What founders and operators say about working with us.
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Real outcomes from real businesses. Here is how our software and automation helped them scale.
          </p>
        </motion.div>

        <TestimonialRail testimonials={testimonials} />
        <div className="hidden overflow-hidden lg:motion-safe:block [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
          <div className="mx-auto flex max-h-[700px] max-w-5xl justify-center gap-6">
            {columns.map((column, index) => (
              <TestimonialsColumn key={index} testimonials={column} duration={35 + index * 5} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  /** Optional brand accent colour for nav controls and indicators */
  accent?: string;
}

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items,
  accent = "#0ea5e9",
}: Gallery4Props) => {
  const [carouselRef, carouselApi] = useEmblaCarousel({
    breakpoints: {
      "(max-width: 768px)": { dragFree: true },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
      setScrollSnaps(carouselApi.scrollSnapList());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <div className="flex flex-col gap-3">
            <h2
              className="text-2xl font-bold md:text-3xl text-[#111827]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {title}
            </h2>
            <p className="max-w-lg text-sm text-[#6B7280] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Prev / Next buttons */}
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Previous project"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto rounded-full border border-[#e5e7eb] hover:border-current transition-colors"
              style={{ color: canScrollPrev ? accent : undefined }}
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Next project"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto rounded-full border border-[#e5e7eb] hover:border-current transition-colors"
              style={{ color: canScrollNext ? accent : undefined }}
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel — full bleed */}
      <div className="w-full">
        <div
          ref={carouselRef}
          className="overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label={title}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              carouselApi?.scrollPrev();
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              carouselApi?.scrollNext();
            }
          }}
        >
          <div className="flex touch-pan-y touch-pinch-zoom ml-[max(1.5rem,calc(50vw-42rem))] mr-[max(1.5rem,calc(50vw-42rem))]">
            {items.map((item) => (
              <div
                key={item.id}
                role="group"
                aria-roledescription="slide"
                className="min-w-0 shrink-0 grow-0 basis-full max-w-[300px] pl-[16px] lg:max-w-[340px]"
              >
                <a href={item.href} className="group block rounded-2xl">
                  {/* Card */}
                  <div className="relative overflow-hidden rounded-2xl shadow-md shadow-black/5 min-h-[22rem] lg:min-h-[24rem]">
                    {/* Photo */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Strong gradient — dark at bottom where text sits */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/0" />

                    {/* Subtle accent tint on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${accent}40 0%, transparent 55%)`,
                      }}
                    />

                    {/* Text content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col gap-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                        {item.id
                          .split("-")
                          .map((w) => w[0].toUpperCase() + w.slice(1))
                          .join(" ")}
                      </p>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-white/75 line-clamp-2">
                        {item.description}
                      </p>
                      <div
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                        style={{ color: accent }}
                      >
                        View project
                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : undefined}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: currentSlide === index ? "1.5rem" : "0.5rem",
                background:
                  currentSlide === index ? accent : `${accent}40`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };

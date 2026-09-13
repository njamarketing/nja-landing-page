"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useState } from "react";

type FeedbackShowcaseItem = {
  avatarSrc: string;
  company: string;
  name: string;
  rating: number;
  sourceUrl: string;
  text: string;
  language: string;
};

type FeedbackShowcaseProps = {
  items: FeedbackShowcaseItem[];
};

const AUTO_ADVANCE_MS = 5000;

function KunaiIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`h-6 w-6 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
    >
      <circle cx="11" cy="32" r="7.5" stroke="currentColor" strokeWidth="3.5" />
      <path
        d="M18.5 32H35"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M35 18L57 32L35 46L41.5 32L35 18Z"
        fill="currentColor"
      />
      <path
        d="M24 24L18.5 32L24 40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 18L30 32L35 46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-[0.92rem] tracking-[0.24em] text-[#ffd166]">
      {"\u2605".repeat(rating)}{"\u2606".repeat(5 - rating)}
    </div>
  );
}

export default function FeedbackShowcase({ items }: FeedbackShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "keepSnaps",
    dragFree: false,
    loop: items.length > 1,
  });

  const marqueeItems = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    // Keep both halves wide enough for the existing animation with fewer reviews.
    const repetitions = Math.max(1, Math.ceil(8 / items.length));
    const sequence = Array.from({ length: repetitions }, () => items).flat();

    return [...sequence, ...sequence];
  }, [items]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || items.length <= 1) {
      return;
    }

    const autoAdvance = window.setInterval(() => {
      emblaApi.scrollNext();
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearInterval(autoAdvance);
    };
  }, [emblaApi, items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-14"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
    >
      <div className="relative mx-auto w-full max-w-[20rem] py-3 md:max-w-[31rem] md:py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-black via-black/90 to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-black via-black/90 to-transparent md:w-20" />

        <div className="flex min-h-16 items-center justify-center overflow-hidden md:min-h-20">
          <div className="landing-feedback-marquee flex w-max items-center gap-3 md:gap-4">
            {marqueeItems.map((item, index) => {
              const normalizedIndex = index % items.length;
              const isActive = normalizedIndex === selectedIndex;

              return (
                <button
                  key={`${item.name}-${index}`}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(normalizedIndex)}
                  className={`relative shrink-0 rounded-full transition-all duration-500 ${
                    isActive ? "scale-105 opacity-100" : "scale-90 opacity-55 hover:opacity-80"
                  }`}
                  aria-label={`Ver feedback de ${item.name}`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      isActive
                        ? "ring-brand-cyan/80 shadow-[0_0_24px_rgba(62,229,250,0.24)] ring-2 ring-offset-3 ring-offset-black"
                        : "ring-1 ring-white/10"
                    }`}
                  />
                  <img
                    src={item.avatarSrc}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="overflow-hidden" ref={emblaRef} aria-live="polite">
          <div className="flex">
            {items.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={`${item.name}-${item.company}`}
                  className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_76%] lg:flex-[0_0_62%]"
                >
                  <article
                    className={`landing-glass-strong mx-auto h-full max-w-3xl rounded-[1.8rem] border p-8 transition-all duration-500 md:p-10 ${
                      isSelected
                        ? "border-brand-cyan/30 shadow-[0_18px_60px_rgba(62,229,250,0.14)] opacity-100"
                        : "border-white/8 opacity-72"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.avatarSrc}
                        alt={item.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-sm text-white/55">
                          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                            {item.company}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <Stars rating={item.rating} />
                      <span className="text-sm text-white/72">{item.rating.toFixed(1)}</span>
                    </div>

                    <p lang={item.language} className="mt-6 text-lg leading-8 whitespace-pre-line text-white/86">"{item.text}"</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="landing-glass-strong flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white transition hover:scale-105 hover:border-brand-cyan/50 hover:text-brand-cyan disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Ver feedback anterior"
            disabled={!emblaApi?.canScrollPrev() && items.length <= 1}
          >
            <KunaiIcon direction="left" />
          </button>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="landing-glass-strong flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white transition hover:scale-105 hover:border-brand-cyan/50 hover:text-brand-cyan disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Ver proximo feedback"
            disabled={!emblaApi?.canScrollNext() && items.length <= 1}
          >
            <KunaiIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

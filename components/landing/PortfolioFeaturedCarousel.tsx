"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type PortfolioSlide = {
  category: string;
  title: string;
  description: string;
  image: string;
};

type PortfolioFeaturedCarouselProps = {
  slides: readonly PortfolioSlide[];
};

const AUTO_ADVANCE_MS = 5500;

function KunaiIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`h-6 w-6 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
    >
      <circle cx="11" cy="32" r="7.5" stroke="currentColor" strokeWidth="3.5" />
      <path d="M18.5 32H35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 18L57 32L35 46L41.5 32L35 18Z" fill="currentColor" />
      <path
        d="M24 24L18.5 32L24 40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M35 18L30 32L35 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function PortfolioFeaturedCarousel({ slides }: PortfolioFeaturedCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: slides.length > 1,
  });

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const updateSelectedIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || slides.length <= 1) {
      return;
    }

    const autoAdvance = window.setInterval(() => emblaApi.scrollNext(), AUTO_ADVANCE_MS);

    return () => window.clearInterval(autoAdvance);
  }, [emblaApi, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <article
        className="landing-glass landing-panel overflow-hidden rounded-[2rem] border border-white/10"
        aria-roledescription="carrossel"
        aria-label="Projetos em destaque"
      >
        <div className="overflow-hidden" ref={emblaRef} aria-live="polite">
          <div className="flex">
            {slides.map((slide, index) => (
              <div key={`${slide.title}-${index}`} className="min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="landing-label">{slide.category}</div>
                    <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                      {slide.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 md:text-base">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {slides.length > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:mt-7">
          <div className="order-2 flex items-center gap-2 sm:order-1" aria-label="Selecionar projeto">
            {slides.map((slide, index) => (
              <button
                key={`${slide.title}-indicator-${index}`}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "bg-brand-cyan w-7"
                    : "w-2.5 bg-white/30 hover:bg-white/65"
                }`}
                aria-label={`Ir para o projeto ${index + 1}: ${slide.title}`}
                aria-current={selectedIndex === index ? "true" : undefined}
              />
            ))}
          </div>
          <div className="order-1 flex items-center gap-4 sm:order-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="landing-glass-strong hover:border-brand-cyan/50 hover:text-brand-cyan flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white transition hover:scale-105"
            aria-label="Ver projeto anterior"
          >
            <KunaiIcon direction="left" />
          </button>
          <span className="min-w-11 text-center text-xs font-medium tracking-[0.14em] text-white/72">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="landing-glass-strong hover:border-brand-cyan/50 hover:text-brand-cyan flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white transition hover:scale-105"
            aria-label="Ver próximo projeto"
          >
            <KunaiIcon direction="right" />
          </button>
        </div>
        </div>
      )}
    </div>
  );
}

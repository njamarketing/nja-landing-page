"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionReveal from "@/components/landing/SectionReveal";

type TeamMember = {
  image: string;
  alt: string;
  objectPosition?: string;
};

type AboutTeamSectionProps = {
  title: string;
  subtitle: string;
  members: TeamMember[];
};

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

export default function AboutTeamSection({
  title,
  subtitle,
  members,
}: AboutTeamSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: members.length > 1,
  });

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

  return (
    <section className="relative overflow-x-clip overflow-y-visible px-4 py-24 sm:px-6 md:py-32">
      <div className="landing-orb landing-orb-left opacity-50" aria-hidden="true" />
      <div className="landing-orb landing-orb-right opacity-50" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
        <SectionReveal className="relative z-10" delay={0.06} distance={26}>
          <span className="landing-label">Equipe NJA</span>
          <h2 className="mt-5 max-w-sm text-4xl leading-[1.02] font-bold text-white md:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/64 md:text-lg">
            {subtitle}
          </p>

        </SectionReveal>

        <SectionReveal delay={0.12} distance={30} className="min-w-0">
          <div className="overflow-hidden" ref={emblaRef} aria-roledescription="carrossel">
            <div className="flex">
              {members.map((member, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <div
                    key={`${member.alt}-${index}`}
                    className="min-w-0 flex-[0_0_82%] pr-4 sm:flex-[0_0_58%] lg:flex-[0_0_54%] xl:flex-[0_0_46%]"
                  >
                    <article
                      className={`landing-panel landing-glass relative overflow-hidden rounded-[2rem] p-3 transition-all duration-500 ${
                        isSelected
                          ? "border-brand-cyan/24 shadow-[0_24px_70px_rgba(62,229,250,0.12)] opacity-100"
                          : "opacity-72"
                      }`}
                    >
                      <div className="absolute inset-x-10 top-3 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-white/5">
                        <Image
                          src={member.image}
                          alt={member.alt}
                          fill
                          sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 78vw"
                          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                          style={{ objectPosition: member.objectPosition ?? "center" }}
                        />
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        <div className="flex items-center gap-4 lg:col-start-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="landing-glass-strong flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white transition hover:scale-105 hover:border-brand-cyan/50 hover:text-brand-cyan"
            aria-label="Ver colaborador anterior"
          >
            <KunaiIcon direction="left" />
          </button>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="landing-glass-strong flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white transition hover:scale-105 hover:border-brand-cyan/50 hover:text-brand-cyan"
            aria-label="Ver próximo colaborador"
          >
            <KunaiIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

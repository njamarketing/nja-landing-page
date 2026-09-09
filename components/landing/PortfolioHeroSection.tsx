"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/landing/SectionReveal";

type HeroCard = {
  label: string;
  image: string;
};

type HeroStat = {
  value: string;
  label: string;
};

type PortfolioHeroSectionProps = {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  description: string;
  stats: readonly HeroStat[];
  cards: HeroCard[];
  showcaseId: string;
  showcaseLabel?: string;
};

const cardPositions = [
  "left-[1%] top-[18%] w-[30%] -rotate-[11deg]",
  "right-[2%] top-[10%] w-[33%] rotate-[9deg]",
  "bottom-[8%] left-[16%] w-[28%] rotate-[7deg]",
  "right-[14%] bottom-[3%] w-[31%] -rotate-[8deg]",
] as const;

type PortfolioHeroCardProps = { card: HeroCard; index: number };

function PortfolioHeroCard({ card, index }: PortfolioHeroCardProps) {
  return (
    <motion.figure
      className={`absolute overflow-hidden rounded-[1.35rem] border border-white/14 bg-[#0d1324] p-2 shadow-[0_28px_70px_rgba(0,0,0,0.48)] ${cardPositions[index]}`}
      initial={{
        opacity: 0,
        scale: 0.72,
        rotate: 0,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[0.85rem]">
        <Image src={card.image} alt="" fill sizes="24vw" className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5" />
        <figcaption className="absolute right-3 bottom-3 left-3 text-xs font-medium tracking-[0.14em] text-white/88 uppercase">
          {card.label}
        </figcaption>
      </div>
    </motion.figure>
  );
}

export default function PortfolioHeroSection({
  titleBefore,
  titleHighlight,
  titleAfter,
  description,
  stats,
  cards,
  showcaseId,
  showcaseLabel = "Explorar projetos",
}: PortfolioHeroSectionProps) {
  const featuredCards = cards.slice(0, 4);

  return (
    <section
      aria-labelledby="portfolio-title"
      className="relative isolate min-h-[900px] overflow-hidden bg-[#03050b] px-4 pt-32 pb-20 sm:px-6 md:min-h-[980px] md:pt-40"
    >
      <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(36,91,215,0.32),transparent_32%),radial-gradient(circle_at_50%_74%,rgba(134,74,255,0.17),transparent_37%)]" />
      <div className="pointer-events-none absolute top-[22%] left-1/2 w-[82vw] max-w-[54rem] -translate-x-1/2 opacity-[0.11] md:top-[19%] md:opacity-[0.14]">
        <Image
          src="/nja-logo-white.png"
          alt=""
          width={900}
          height={260}
          priority
          sizes="(max-width: 768px) 82vw, 54rem"
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[22%] hidden h-[510px] md:block">
        {featuredCards.map((card, index) => (
          <PortfolioHeroCard key={`${card.label}-${index}`} card={card} index={index} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-6xl flex-col items-center justify-center text-center md:min-h-[760px]">
        <SectionReveal className="max-w-4xl" delay={0.08} distance={32}>
          <h1
            id="portfolio-title"
            className="text-4xl leading-[0.98] font-bold tracking-[-0.045em] text-white md:text-6xl xl:text-[5.4rem]"
          >
            {titleBefore} <span className="landing-text-gradient">{titleHighlight}</span>{" "}
            {titleAfter}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
            {description}
          </p>
        </SectionReveal>

        <div className="mt-10 grid w-full max-w-3xl grid-cols-3 border-y border-white/10">
          {stats.map((item, index) => (
            <SectionReveal
              key={`${item.value}-${item.label}`}
              className={`px-3 py-5 ${index > 0 ? "border-l border-white/10" : ""}`}
              delay={0.18 + index * 0.08}
              distance={18}
            >
              <div className="font-display landing-text-gradient text-2xl md:text-3xl">
                {item.value}
              </div>
              <div className="mt-1 text-xs tracking-wide text-white/55 md:text-sm">
                {item.label}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <a
        href={`#${showcaseId}`}
        className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] font-medium tracking-[0.2em] text-white/48 uppercase transition hover:text-white"
      >
        {showcaseLabel}
        <ArrowDown
          className="h-4 w-4 transition-transform group-hover:translate-y-1"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}

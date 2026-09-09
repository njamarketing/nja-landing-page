"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type HeroCard = {
  label: string;
  image: string;
  span: string;
  offset?: string;
};

type HeroVisualIntroProps = {
  cards: HeroCard[];
};

const heroOrigins = [
  { x: -180, y: -150, rotate: -16, scale: 0.84 },
  { x: 165, y: -165, rotate: 18, scale: 0.82 },
  { x: -210, y: 42, rotate: -10, scale: 0.88 },
  { x: 210, y: 28, rotate: 10, scale: 0.86 },
  { x: -140, y: 180, rotate: -14, scale: 0.84 },
  { x: 145, y: 175, rotate: 14, scale: 0.84 },
  { x: -84, y: -200, rotate: -9, scale: 0.9 },
  { x: 92, y: 206, rotate: 9, scale: 0.9 },
] as const;

export default function HeroVisualIntro({ cards }: HeroVisualIntroProps) {
  return (
    <motion.div
      className="relative mt-8 sm:mt-0 lg:col-span-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.08,
          },
        },
      }}
    >
      <motion.div
        className="landing-card-glow absolute -inset-4 rounded-[2rem]"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex -translate-y-6 items-center justify-center px-6 sm:-translate-y-8 lg:-translate-y-10"
        initial={{ opacity: 0, scale: 0.72, y: 36, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
        style={{
          animation: "landingFloat 7.2s ease-in-out 1.45s infinite",
        }}
      >
        <div className="rounded-[2rem] border border-white/14 bg-[linear-gradient(180deg,rgba(35,91,215,0.2),rgba(4,7,16,0.82))] px-0.5 py-4 shadow-[0_24px_70px_rgba(35,91,215,0.32)] backdrop-blur-xl sm:px-1 sm:py-5">
          <Image
            src="/nja-logo-white.png"
            alt="NJA Marketing"
            width={560}
            height={158}
            priority
            className="h-auto w-full max-w-[16rem] drop-shadow-[0_24px_70px_rgba(35,91,215,0.42)] sm:max-w-[20rem] lg:max-w-[24rem]"
          />
        </div>
      </motion.div>

      <div className="relative grid auto-rows-[104px] grid-cols-12 gap-3 sm:auto-rows-[128px]">
        {cards.map((card, index) => {
          const origin = heroOrigins[index % heroOrigins.length];

          return (
            <motion.article
              key={`${card.label}-${index}`}
              className={`landing-glass group relative overflow-hidden rounded-[1.4rem] shadow-[var(--shadow-card)] ${card.span} ${card.offset ?? ""}`}
              initial={{
                opacity: 0,
                x: origin.x,
                y: origin.y,
                rotate: origin.rotate,
                scale: origin.scale,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.95,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                animation: `landingFloat ${6 + index * 0.45}s ease-in-out ${1 + index * 0.18}s infinite`,
              }}
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                priority={index < 2}
                sizes="(max-width: 1024px) 50vw, 28vw"
                className="object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="text-xs font-medium text-white/90">{card.label}</span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}

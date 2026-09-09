"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import SectionReveal from "@/components/landing/SectionReveal";
import type { LenisInstance } from "@/utils/lenis";

type AboutHeroSectionProps = {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  description: string;
};

const aboutHeroShurikens = [
  { left: "5%", top: "10%", size: 34, duration: "18s", delay: "-4s", opacity: 0.36 },
  { left: "12%", top: "22%", size: 18, duration: "15s", delay: "-8s", opacity: 0.12 },
  { left: "18%", top: "36%", size: 24, duration: "21s", delay: "-11s", opacity: 0.2 },
  { left: "9%", top: "56%", size: 20, duration: "17s", delay: "-2s", opacity: 0.1 },
  { left: "24%", top: "70%", size: 28, duration: "20s", delay: "-5s", opacity: 0.3 },
  { left: "32%", top: "16%", size: 16, duration: "14s", delay: "-7s", opacity: 0.08 },
  { left: "39%", top: "28%", size: 22, duration: "19s", delay: "-10s", opacity: 0.18 },
  { left: "44%", top: "60%", size: 18, duration: "16s", delay: "-6s", opacity: 0.1 },
  { left: "54%", top: "12%", size: 30, duration: "22s", delay: "-9s", opacity: 0.26 },
  { left: "61%", top: "26%", size: 14, duration: "13s", delay: "-3s", opacity: 0.08 },
  { left: "68%", top: "14%", size: 38, duration: "20s", delay: "-6s", opacity: 0.4 },
  { left: "76%", top: "24%", size: 22, duration: "15s", delay: "-11s", opacity: 0.16 },
  { left: "84%", top: "12%", size: 26, duration: "17s", delay: "-1s", opacity: 0.24 },
  { left: "88%", top: "34%", size: 18, duration: "14s", delay: "-9s", opacity: 0.1 },
  { left: "74%", top: "48%", size: 20, duration: "18s", delay: "-12s", opacity: 0.12 },
  { left: "66%", top: "64%", size: 24, duration: "19s", delay: "-8s", opacity: 0.18 },
  { left: "80%", top: "70%", size: 30, duration: "18s", delay: "-3s", opacity: 0.28 },
  { left: "91%", top: "62%", size: 16, duration: "15s", delay: "-5s", opacity: 0.09 },
] as const;

export default function AboutHeroSection({
  titleBefore,
  titleHighlight,
  titleAfter,
  description,
}: AboutHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const frameId = requestAnimationFrame(() => {
      const section = sectionRef.current;
      const lenis = window.lenis as unknown as LenisInstance | undefined;

      if (!section || !lenis) {
        return;
      }

      observer = new IntersectionObserver(([entry]) => {
        lenis.options.wheelMultiplier = entry.isIntersecting ? 1.7 : 1;
      });
      observer.observe(section);
    });

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();

      const lenis = window.lenis as unknown as LenisInstance | undefined;

      if (lenis) {
        lenis.options.wheelMultiplier = 1;
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOffset = 165;

  const planetY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-72 + backgroundOffset, 72 + backgroundOffset]
  );

  const planetScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.08, 1.16]
  );

  const shurikenLayerY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-24 + backgroundOffset, 36 + backgroundOffset]
  );

  const shurikenLayerRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-2, 3]
  );

  const logoY = useTransform(
    scrollYProgress,
    [0.02, 0.65],
    shouldReduceMotion ? [0, 0] : [550 + backgroundOffset, -280 + backgroundOffset]
  );

  const logoOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.18, 0.4],
    shouldReduceMotion ? [1, 1, 1] : [0, 0.6, 1]
  );

  const logoScale = useTransform(
    scrollYProgress,
    [0.02, 0.65],
    shouldReduceMotion ? [1, 1] : [0.88, 1.08]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[940px] overflow-hidden bg-black px-4 pt-32 pb-28 sm:px-6 md:pt-40 md:pb-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0 z-[5] overflow-hidden"
          style={{ y: shurikenLayerY, rotate: shurikenLayerRotate }}
        >
          {aboutHeroShurikens.map((item, index) => (
            <div
              key={`about-shuriken-${index}`}
              className="landing-shuriken absolute"
              style={
                {
                  left: item.left,
                  top: item.top,
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  opacity: item.opacity,
                  animationDuration: item.duration,
                  animationDelay: item.delay,
                  animation: shouldReduceMotion ? "none" : undefined,
                } satisfies CSSProperties
              }
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute top-[390px] left-1/2 z-0 w-full max-w-[900px] -translate-x-1/2 md:top-[420px]"
          style={{
            y: logoY,
            opacity: logoOpacity,
            scale: logoScale,
          }}
        >
          <Image
            src="/nja-logo-white.png"
            alt=""
            width={900}
            height={260}
            priority
            className="h-auto w-full object-contain"
          />
        </motion.div>

        <motion.div
          className="absolute top-[230px] left-1/2 z-10 w-[160vw] max-w-none -translate-x-1/2 sm:w-[150vw] md:top-[250px] md:w-[138vw] xl:w-[128vw]"
          style={{
            y: planetY,
            scale: planetScale,
          }}
        >
          <Image
            src="/images/background.png"
            alt=""
            width={1800}
            height={1012}
            priority
            sizes="100vw"
            className="h-auto w-full object-contain"
          />
        </motion.div>

        <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.58)_22%,rgba(0,0,0,0.1)_46%,rgba(0,0,0,0.82)_86%,#000_100%)]" />

        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_38%,rgba(59,130,246,0.2),transparent_40%)]" />
      </div>

      <div className="relative z-30 mx-auto max-w-6xl">
        <SectionReveal className="mx-auto max-w-5xl text-center" delay={0.08} distance={34}>
          <h1 className="mx-auto max-w-5xl text-4xl leading-[1.02] font-bold text-white md:text-6xl xl:text-[5.2rem]">
            {titleBefore} <span className="landing-text-gradient">{titleHighlight}</span>{" "}
            {titleAfter}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            {description}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

type OpportunityCard = {
  label: string;
  image: string;
};

type CtaOpportunityParallaxProps = {
  cards: OpportunityCard[];
};

export default function CtaOpportunityParallax({ cards }: CtaOpportunityParallaxProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const fallbackCards = cards.length > 0 ? cards : [{ label: "NJA", image: "/images/landing/hero-web.jpg" }];
  const screenCard = fallbackCards[0];
  const { scrollY } = useScroll();
  const rawProgress = useMotionValue(0.5);
  const progress = useSpring(rawProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.34,
  });

  const updateProgress = () => {
    const node = phoneRef.current;

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const nextProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);

    rawProgress.set(Math.max(0, Math.min(1, nextProgress)));
  };

  useMotionValueEvent(scrollY, "change", updateProgress);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const frameY = useTransform(progress, [0, 0.5, 1], [90, -12, -105]);
  const imageY = useTransform(progress, [0, 0.5, 1], [36, 0, -36]);
  const glowY = useTransform(progress, [0, 0.5, 1], [52, 0, -52]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [20, 8, -12]);
  const rotateY = useTransform(progress, [0, 0.5, 1], [-28, -10, 18]);
  const rotateZ = useTransform(progress, [0, 1], [-7, 6]);

  return (
    <div
      ref={phoneRef}
      aria-hidden="true"
      className="relative mx-auto flex min-h-[520px] w-full max-w-[520px] items-center justify-center overflow-visible"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute h-[68%] w-[68%] rounded-full bg-[#235bd7]/20 blur-[90px]" />
      <div className="absolute right-10 bottom-10 h-48 w-48 rounded-full bg-[#3ee5fa]/10 blur-[70px]" />

      <motion.div
        className="relative h-[430px] w-[206px]"
        animate={{ translateY: [0, -12, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          style={{
            y: frameY,
            rotateX,
            rotateY,
            rotateZ,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-y-2 -right-2 z-10 w-8 rounded-r-[2.1rem] bg-[linear-gradient(180deg,rgba(20,26,44,0.98),rgba(8,12,24,0.98)_44%,rgba(3,6,14,1))] shadow-[inset_-2px_0_8px_rgba(255,255,255,0.12)]"
            style={{ transform: "translateZ(-10px)" }}
          />
          <div className="absolute top-24 -right-3 z-30 h-14 w-1.5 rounded-full bg-white/18" />

          <div className="landing-glass absolute inset-0 z-20 overflow-hidden rounded-[2.35rem] border border-white/12 bg-[linear-gradient(145deg,rgba(16,24,44,0.96),rgba(6,10,20,0.98))] p-3 shadow-[0_34px_80px_rgba(0,0,0,0.62),0_18px_44px_-24px_rgba(62,229,250,0.35)]">
            <div className="absolute inset-px rounded-[2.25rem] border border-white/10" />
            <div className="absolute inset-0 rounded-[2.35rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_24%,transparent_72%,rgba(255,255,255,0.08))]" />

            <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-[#020611]">
              <motion.div
                className="absolute inset-0"
                initial={false}
                style={{ y: imageY, willChange: "transform" }}
              >
                <Image
                  src={screenCard.image}
                  alt={screenCard.label}
                  fill
                  sizes="206px"
                  className="object-cover opacity-38 scale-[1.08]"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(62,229,250,0.16),transparent_26%),linear-gradient(180deg,rgba(2,6,17,0.12),rgba(2,6,17,0.82))]"
                initial={false}
                style={{ y: glowY, willChange: "transform" }}
              />

              <div className="absolute top-4 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-[#020611]/85" />
              <div className="absolute inset-x-0 top-24 flex items-center justify-center">
                <Image
                  src="/nja-logo-white.png"
                  alt="NJA Marketing"
                  width={118}
                  height={48}
                  className="h-auto w-[7.4rem] object-contain drop-shadow-[0_0_22px_rgba(62,229,250,0.5)]"
                />
              </div>
              <div className="absolute right-12 bottom-8 left-12 h-1.5 rounded-full bg-white/45" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

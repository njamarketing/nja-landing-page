"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const photos = [
  {
    src: "/images/franquias/Igor-frente.webp",
    alt: "Igor Martins, responsável pela franquia NJA de Teixeira de Freitas",
  },
  {
    src: "/images/franquias/Igor.webp",
    alt: "Igor Martins em retrato lateral",
  },
];

export default function FounderPhotos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const isVisible = useInView(container, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !isVisible) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => 1 - currentIndex);
    }, 4500);
    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion, isVisible]);

  return (
    <div ref={container} className="mx-auto w-full max-w-lg">
      <div className="relative aspect-[2/3]">
        {photos.map((photo, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
              aria-label={
                isActive
                  ? "Foto de Igor Martins em destaque"
                  : "Colocar esta foto de Igor Martins em destaque"
              }
              aria-pressed={isActive}
              initial={false}
              animate={{
                x: isActive ? "0%" : "66%",
                y: isActive ? "0%" : "66%",
                scale: isActive ? 1 : 0.49,
                rotate: shouldReduceMotion ? 0 : [0, isActive ? -7 : 7, 0],
                zIndex: isActive ? 1 : 2,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.95,
                ease: [0.22, 1, 0.36, 1],
                zIndex: { delay: shouldReduceMotion ? 0 : 0.4 },
              }}
              className={`absolute top-0 left-0 w-[86%] origin-top-left overflow-hidden rounded-[2rem] border-4 border-background bg-background p-0 shadow-2xl focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${isActive ? "cursor-default" : "cursor-pointer"}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={4000}
                height={6000}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 448px, 40vw"
                className="h-auto w-full"
                priority
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

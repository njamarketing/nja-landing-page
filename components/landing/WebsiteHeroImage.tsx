"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";

const fragments = [
  { left: "5%", top: "7%", width: "12%", angle: -28, duration: 6.2, delay: 0 },
  { left: "33%", top: "0%", width: "8%", angle: 65, duration: 5.4, delay: 0.8 },
  { left: "72%", top: "3%", width: "14%", angle: 22, duration: 7, delay: 0.3 },
  {
    left: "87%",
    top: "30%",
    width: "9%",
    angle: -65,
    duration: 5.8,
    delay: 1.4,
  },
  {
    left: "78%",
    top: "73%",
    width: "17%",
    angle: 105,
    duration: 7.4,
    delay: 0.6,
  },
  {
    left: "48%",
    top: "82%",
    width: "9%",
    angle: -12,
    duration: 6.6,
    delay: 1.8,
  },
  {
    left: "17%",
    top: "76%",
    width: "13%",
    angle: 145,
    duration: 6,
    delay: 1.1,
  },
  { left: "1%", top: "44%", width: "7%", angle: 38, duration: 5.2, delay: 0.4 },
];

export default function WebsiteHeroImage() {
  const reducedMotion = useReducedMotion();
  const spring = { stiffness: 140, damping: 24 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const glassX = useTransform(x, (value) => value * 1.8);
  const glassY = useTransform(y, (value) => value * 1.8);

  function followMouse(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    x.set(horizontal * 36);
    y.set(vertical * 28);
    rotateX.set(vertical * -8);
    rotateY.set(horizontal * 8);
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      className="relative"
      style={{ perspective: 1200 }}
      onPointerMove={followMouse}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
    >
      <motion.div
        className="pointer-events-none"
        style={{
          x: reducedMotion ? 0 : x,
          y: reducedMotion ? 0 : y,
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
      >
        <Image
          src="/images/website-ninja.png"
          alt="Ninja da NJA em uma ilustração de criação de sites para empresas"
          width={1536}
          height={1024}
          sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 55vw, 770px"
          className="h-auto w-full rounded-3xl"
          priority
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ x: reducedMotion ? 0 : glassX, y: reducedMotion ? 0 : glassY }}
      >
        {fragments.map((fragment, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: fragment.left,
              top: fragment.top,
              width: fragment.width,
            }}
            initial={{ y: 0, rotate: fragment.angle }}
            animate={
              reducedMotion
                ? { y: 0, rotate: fragment.angle }
                : {
                    y: [0, -14 - (index % 3) * 4, 0],
                    rotate: [
                      fragment.angle,
                      fragment.angle + 10,
                      fragment.angle,
                    ],
                  }
            }
            transition={{
              duration: fragment.duration,
              delay: fragment.delay,
              repeat: reducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/particles/glass.png"
              alt=""
              width={500}
              height={500}
              sizes="(max-width: 1024px) 17vw, 135px"
              className="h-auto w-full drop-shadow-[0_8px_16px_rgba(0,130,255,0.3)]"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

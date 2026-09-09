"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  style?: CSSProperties;
};

function getOffset(direction: NonNullable<SectionRevealProps["direction"]>, distance: number) {
  if (direction === "left") {
    return { x: distance, y: 0 };
  }

  if (direction === "right") {
    return { x: -distance, y: 0 };
  }

  if (direction === "down") {
    return { x: 0, y: -distance };
  }

  return { x: 0, y: distance };
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  distance = 32,
  direction = "up",
  once = true,
  style,
}: SectionRevealProps) {
  const offset = getOffset(direction, distance);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.22 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

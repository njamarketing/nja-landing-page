"use client";

import { useEffect } from "react";
import { createLenis, type LenisInstance } from "@/utils/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");

    if (reducedMotion.matches || !desktop.matches) {
      return;
    }

    let frameId = 0;
    let lenis: LenisInstance | null = null;
    const raf = (time: number) => {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    lenis = createLenis();
    window.njaLenis = lenis;
    frameId = requestAnimationFrame(raf);

    const handleVisibilityChange = () => {
      cancelAnimationFrame(frameId);

      if (!document.hidden) {
        frameId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(frameId);
      lenis?.destroy();
      delete window.njaLenis;
    };
  }, []);

  return <>{children}</>;
}

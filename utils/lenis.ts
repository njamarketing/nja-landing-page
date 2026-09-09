import Lenis from "lenis";

export const defaultLenisOptions = {
  anchors: true,
  autoRaf: false,
  duration: 0.9,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  prevent: (node: HTMLElement | null) => node?.closest?.("[data-lenis-prevent]") != null,
} satisfies ConstructorParameters<typeof Lenis>[0];

export function createLenis(options?: ConstructorParameters<typeof Lenis>[0]) {
  return new Lenis({
    ...defaultLenisOptions,
    ...options,
  });
}

export type LenisInstance = ReturnType<typeof createLenis>;

declare global {
  interface Window {
    njaLenis?: LenisInstance;
  }
}

import type { Transition } from "motion/react";

export const spring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.5,
} satisfies Transition;

export const quickSpring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.3,
} satisfies Transition;

export const leave = { duration: 0.2, ease: "easeIn" } satisfies Transition;
export const fade = { duration: 0.2, ease: "easeOut" } satisfies Transition;
export const slowFade = { duration: 0.6, ease: "easeOut" } satisfies Transition;
export const resize = { duration: 0.3, ease: "easeOut" } satisfies Transition;
export const instant = { duration: 0 } satisfies Transition;

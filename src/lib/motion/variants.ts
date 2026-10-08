import { stagger, type Transition, type Variants } from "motion/react";
import { quickSpring, slowFade, spring } from "./transitions";

export interface EnterOptions {
  /** Horizontal offset to start from, in px. */
  x?: number;
  /** Vertical offset to start from, in px. Negative values start above. */
  y?: number;
  /** How the element reaches its place. */
  transition?: Transition;
}

/** Fades in while moving from an offset to its place. */
export function enterFrom({
  x = 0,
  y = 0,
  transition = spring,
}: EnterOptions): Variants {
  return {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0, transition },
  };
}

/** Rises into place from 24px below. */
export function fadeUp() {
  return enterFrom({ y: 24 });
}

/** Drops into place from 16px above, quickly. */
export function fadeDown() {
  return enterFrom({ y: -16, transition: quickSpring });
}

/** Slides in from `x` px: negative from the left, positive from the right. */
export function slideIn(x: number) {
  return enterFrom({ x });
}

/** Fades in slowly without moving, for large surfaces such as the footer. */
export function fadeIn(): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: slowFade },
  };
}

/**
 * For a parent with no animation of its own: its children enter one after
 * another, `step` seconds apart.
 */
export function staggerChildren(step = 0.08): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren: stagger(step) } },
  };
}

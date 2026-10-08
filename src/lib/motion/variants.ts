import { stagger, type Transition, type Variants } from "motion/react";
import { quickSpring, slowFade, spring } from "./transitions";

/*
 * Entrance presets. Each one returns variants with two states:
 * - "hidden": where the element starts, before it is revealed;
 * - "visible": its place in the layout of the design.
 *
 * They only animate opacity and transforms, so once an animation ends the
 * layout is exactly the one of the design. A parent drives them by switching
 * between the two labels (see `useReveal`), and the labels flow down to every
 * descendant `motion` element that uses these presets.
 */

export interface EnterOptions {
  /** Horizontal offset to start from, in px. */
  x?: number;
  /** Vertical offset to start from, in px. Negative values start above. */
  y?: number;
  /** Scale to start from. */
  scale?: number;
  /** How the element reaches its place. */
  transition?: Transition;
}

/** Fades in while moving from an offset, or a scale, to its place. */
export function enterFrom({
  x = 0,
  y = 0,
  scale = 1,
  transition = spring,
}: EnterOptions = {}): Variants {
  return {
    hidden: { opacity: 0, x, y, scale },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition },
  };
}

/** Rises into place from `distance` px below. */
export function fadeUp(distance = 24) {
  return enterFrom({ y: distance });
}

/** Drops into place from `distance` px above, quickly. */
export function fadeDown(distance = 16) {
  return enterFrom({ y: -distance, transition: quickSpring });
}

/** Slides in from `x` px: negative from the left, positive from the right. */
export function slideIn(x: number) {
  return enterFrom({ x });
}

/** Fades in without moving. */
export function fadeIn(transition: Transition = slowFade): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition },
  };
}

export interface StaggerOptions {
  /** Seconds between two children. */
  step?: number;
  /** Seconds before the first child starts. */
  delay?: number;
}

/**
 * For a parent with no animation of its own: its children run their
 * "visible" variants one after another, in document order.
 */
export function staggerChildren({
  step = 0.08,
  delay = 0,
}: StaggerOptions = {}): Variants {
  return {
    hidden: {},
    visible: {
      transition: { delayChildren: stagger(step, { startDelay: delay }) },
    },
  };
}

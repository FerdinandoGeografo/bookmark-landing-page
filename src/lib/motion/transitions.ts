import type { Transition } from "motion/react";

/*
 * Shared timings for every animation of the page. They are implementation
 * choices, not design measures: tune them here to change the feel everywhere.
 */

/**
 * Default for elements that travel (sections, illustrations, cards). A spring
 * keeps its velocity when it is interrupted, and `visualDuration` is the time
 * it takes to look settled.
 */
export const spring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.5,
} satisfies Transition;

/** The same feel for small elements: links, icons, indicators, popups. */
export const quickSpring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.3,
} satisfies Transition;

/** Exits: short and accelerating, so the next state takes over quickly. */
export const leave = { duration: 0.2, ease: "easeIn" } satisfies Transition;

/** Plain opacity changes, such as an overlay. */
export const fade = { duration: 0.2, ease: "easeOut" } satisfies Transition;

/** Slow fade for large, static surfaces such as the footer. */
export const slowFade = { duration: 0.6, ease: "easeOut" } satisfies Transition;

/**
 * Height changes. Height is not a transform: a tween avoids the overshoot a
 * spring would add to the layout.
 */
export const resize = { duration: 0.3, ease: "easeOut" } satisfies Transition;

/** Jumps straight to the final state, for people who prefer reduced motion. */
export const instant = { duration: 0 } satisfies Transition;

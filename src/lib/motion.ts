import { stagger, type Transition, type Variants } from "motion/react";

// Timings and distances are implementation choices, not design measures.
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

// Every preset animates opacity and transforms only, so the final layout is
// the one of the design.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: quickSpring },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

export function slideIn(x: number): Variants {
  return {
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0, transition: spring },
  };
}

// For a parent whose children run their own variants one after another.
export function staggerChildren(step = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { delayChildren: stagger(step, { startDelay: delay }) },
    },
  };
}

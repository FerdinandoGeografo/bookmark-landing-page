import type { Transition } from "motion/react";
import { instant } from "@/lib/motion/transitions";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * `transition`, or an instant one when the person prefers reduced motion.
 * MotionConfig already makes transforms and sizes jump in that case, but only
 * for elements mounted after the preference was set, and it keeps opacity
 * animated: this hook covers both.
 */
export function useReducedTransition(transition: Transition): Transition {
  return usePrefersReducedMotion() ? instant : transition;
}

import type { Transition } from "motion/react";
import { instant } from "@/lib/motion/transitions";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * `transition`, or an instant one with reduced motion. Unlike MotionConfig, it
 * covers opacity and elements mounted before the preference changed.
 */
export function useReducedTransition(transition: Transition): Transition {
  return usePrefersReducedMotion() ? instant : transition;
}

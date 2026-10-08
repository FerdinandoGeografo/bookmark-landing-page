import { useReducedMotion, type Transition } from "motion/react";
import { instant } from "@/lib/motion/transitions";

/**
 * `transition`, or an instant one when the person prefers reduced motion.
 * MotionConfig already turns transforms off in that case; this also covers
 * opacity and size changes, which it keeps.
 */
export function useReducedTransition(transition: Transition): Transition {
  return useReducedMotion() ? instant : transition;
}

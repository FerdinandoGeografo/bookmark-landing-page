import type { PropsWithChildren } from "react";
import { MotionConfig } from "motion/react";

/**
 * Global Motion settings. With `reducedMotion="user"`, people who ask their
 * system for reduced motion get no transform, size or layout animations on
 * elements mounted after the preference was read. The components also skip
 * fades and delays, and follow later changes, through
 * `usePrefersReducedMotion` and `useReducedTransition`.
 */
export default function MotionProvider({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

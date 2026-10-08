import type { PropsWithChildren } from "react";
import { MotionConfig } from "motion/react";

/**
 * Global Motion settings. With `reducedMotion="user"`, people who ask their
 * system for reduced motion get no transform or layout animations; the
 * components also skip fades and delays through `useReducedMotion`.
 */
export default function MotionProvider({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

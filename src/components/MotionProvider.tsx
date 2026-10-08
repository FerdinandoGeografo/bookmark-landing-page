import type { PropsWithChildren } from "react";
import { MotionConfig } from "motion/react";

/**
 * Global Motion settings. Reduced motion stops transform, size and layout
 * animations; `useReducedTransition` also covers fades and later changes.
 */
export default function MotionProvider({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

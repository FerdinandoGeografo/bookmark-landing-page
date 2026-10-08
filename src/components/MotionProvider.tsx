import type { PropsWithChildren } from "react";
import { MotionConfig } from "motion/react";

export default function MotionProvider({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

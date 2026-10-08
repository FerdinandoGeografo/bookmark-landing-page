import type { PropsWithChildren } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default);

// Components render `m` elements. The animation features, layout included for
// the tab indicator, load in a separate chunk. Reduced motion turns off
// transforms and layout animations.
export default function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

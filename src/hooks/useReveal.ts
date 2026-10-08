import { useRef } from "react";
import { useAnimationControls, useReducedMotion } from "motion/react";

export interface RevealOptions {
  /**
   * Share of the element (0 to 1) that must be in the viewport to start.
   * Keep it low for tall elements: a high share may never be reached.
   */
  amount?: number;
}

/**
 * Motion props that reveal an element once, the first time it enters the
 * viewport. Spread them on a `motion` element: it switches from "hidden" to
 * "visible", and its descendants that use the presets of
 * `@/lib/motion/variants` follow, each with its own animation.
 *
 * - Keyboard focus inside the element shows the final state at once, so a
 *   focused control is never invisible.
 * - With reduced motion the element starts in its final state.
 * - Elements already in the viewport on load play as an entrance.
 */
export function useReveal({ amount = 0.2 }: RevealOptions = {}) {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const isRevealedRef = useRef(false);

  function reveal() {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    controls.start("visible");
  }

  function showAtOnce() {
    isRevealedRef.current = true;
    // The transition override reaches the descendants too.
    controls.start("visible", { duration: 0 });
  }

  if (shouldReduceMotion) {
    return { initial: false, animate: "visible" } as const;
  }

  return {
    initial: "hidden",
    animate: controls,
    viewport: { once: true, amount },
    onViewportEnter: reveal,
    onFocusCapture: showAtOnce,
  } as const;
}

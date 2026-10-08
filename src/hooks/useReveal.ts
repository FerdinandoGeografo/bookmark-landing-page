import { useRef } from "react";
import { useAnimationControls } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Motion props that reveal an element once, the first time it enters the
 * viewport. Spread them on a `motion` element: it switches from "hidden" to
 * "visible", and its descendants that use the presets of
 * `@/lib/motion/variants` follow, each with its own animation.
 *
 * - The reveal starts as soon as the element passes a 48px band at the
 *   bottom of the viewport. A share of the element would not do: with a
 *   short viewport, such as at 400% zoom, it may never fit on screen.
 * - Keyboard focus inside the element shows the final state at once, so a
 *   focused control is never invisible.
 * - With reduced motion the element starts in its final state.
 * - Elements already in the viewport on load play as an entrance.
 */
export function useReveal() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const controls = useAnimationControls();
  const isRevealedRef = useRef(false);

  // Motion calls onViewportEnter again whenever the element comes back.
  function reveal() {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    controls.start("visible");
  }

  function showAtOnce() {
    isRevealedRef.current = true;
    // The transition override reaches the descendants too, and replaces
    // their delays and stagger.
    controls.start("visible", { duration: 0 });
  }

  if (prefersReducedMotion) {
    return { initial: false, animate: "visible" } as const;
  }

  return {
    initial: "hidden",
    animate: controls,
    viewport: { once: true, amount: "some", margin: "0px 0px -48px 0px" },
    onViewportEnter: reveal,
    onFocusCapture: showAtOnce,
  } as const;
}

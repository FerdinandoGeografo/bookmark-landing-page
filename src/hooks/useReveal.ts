import { useRef } from "react";
import { useAnimationControls } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Props that reveal a `motion` element once, past a 48px band at the viewport
 * bottom: a share of a tall element might never fit on screen, as at 400% zoom.
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
    // Keyboard focus shows the final state at once: the override also replaces
    // the descendants' delays and stagger.
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

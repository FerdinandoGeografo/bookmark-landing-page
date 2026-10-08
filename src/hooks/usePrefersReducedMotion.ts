import { useMediaQuery } from "./useMediaQuery";

/**
 * Whether the person asks their system for reduced motion. Unlike Motion's
 * `useReducedMotion`, which reads the setting once, it follows changes made
 * while the page is open.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

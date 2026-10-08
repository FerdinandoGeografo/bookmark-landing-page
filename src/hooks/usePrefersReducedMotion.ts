import { useMediaQuery } from "./useMediaQuery";

/**
 * Whether reduced motion is requested. Unlike Motion's `useReducedMotion`,
 * which reads the setting once, it follows later changes.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

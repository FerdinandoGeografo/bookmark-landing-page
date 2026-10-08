import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getHasScrolled = () => window.scrollY > 0;

/**
 * Whether the page has left the very top. Components re-render only when
 * the answer changes, not on every scroll event.
 */
export function useHasScrolled() {
  return useSyncExternalStore(subscribe, getHasScrolled, () => false);
}

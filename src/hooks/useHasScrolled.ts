import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getHasScrolled = () => window.scrollY > 0;

/** Whether the page has left the top; re-renders only when that changes. */
export function useHasScrolled() {
  return useSyncExternalStore(subscribe, getHasScrolled);
}

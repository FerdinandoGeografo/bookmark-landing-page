import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { slideIn, staggerChildren } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

// Re-renders only when the page leaves or returns to the very top.
const getIsScrolled = () => window.scrollY > 0;

export default function Header() {
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    getIsScrolled,
    () => false,
  );
  const shouldReduceMotion = useReducedMotion();

  return (
    <header
      className={cn(
        "sticky top-0 z-10 bg-white transition-shadow duration-300",
        isScrolled && "shadow-lg shadow-blue-950/10",
      )}
    >
      <m.div
        variants={staggerChildren(0.06)}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        className="mx-auto flex max-w-360 items-center justify-between px-8 py-10 lg:py-12 lg:pr-41.25 lg:pl-42.75"
      >
        <m.a
          variants={slideIn(-16)}
          href="#"
          aria-label="Bookmark home"
          className="-m-2 shrink-0 rounded-sm p-2 transition-colors duration-300 hover:bg-blue-950/5"
        >
          <Logo variant="dark" />
        </m.a>

        <Navigation />
        <MobileMenu />
      </m.div>
    </header>
  );
}

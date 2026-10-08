import { motion } from "motion/react";
import { useHasScrolled } from "@/hooks/useHasScrolled";
import { useReveal } from "@/hooks/useReveal";
import { slideIn, staggerChildren } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

export default function Header() {
  const hasScrolled = useHasScrolled();
  // Always in the viewport, so the reveal plays as soon as the page loads.
  const reveal = useReveal();

  return (
    <header
      className={cn(
        "sticky top-0 z-10 bg-white transition-shadow duration-300",
        hasScrolled && "shadow-lg shadow-blue-950/10",
      )}
    >
      <motion.div
        variants={staggerChildren({ step: 0.06 })}
        {...reveal}
        className="mx-auto flex max-w-360 items-center justify-between px-8 py-10 lg:py-12 lg:pr-41.25 lg:pl-42.75"
      >
        <motion.a
          variants={slideIn(-16)}
          href="#"
          aria-label="Bookmark home"
          className="-m-2 shrink-0 rounded-sm p-2 transition-colors duration-300 hover:bg-blue-950/5"
        >
          <Logo variant="dark" />
        </motion.a>

        <Navigation />
        <MobileMenu />
      </motion.div>
    </header>
  );
}

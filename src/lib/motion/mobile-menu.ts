import { stagger, type Variants } from "motion/react";
import { fade, instant, quickSpring } from "./transitions";

/*
 * Mobile menu: the overlay fades in, then its rows rise 12px in turn; it fades
 * out as a whole. With reduced motion it switches at once.
 */
export function createMobileMenuVariants(isInstant: boolean) {
  return {
    popup: {
      hidden: { opacity: 0, transition: isInstant ? instant : fade },
      visible: {
        opacity: 1,
        transition: {
          ...(isInstant ? instant : fade),
          delayChildren: isInstant ? 0 : stagger(0.05, { startDelay: 0.05 }),
        },
      },
    },
    row: {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: isInstant ? instant : quickSpring,
      },
    },
  } satisfies Record<string, Variants>;
}

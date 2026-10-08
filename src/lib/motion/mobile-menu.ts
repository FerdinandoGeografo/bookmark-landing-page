import { stagger, type Variants } from "motion/react";
import { fade, instant, quickSpring } from "./transitions";

/*
 * Mobile menu: the overlay fades in, then its rows rise one after another.
 * It fades out as a whole. States: "hidden" and "visible".
 */

export interface MobileMenuOptions {
  /** Reduced motion: show and hide the menu at once. */
  isInstant?: boolean;
  /** Distance the rows rise from, in px. */
  rowDistance?: number;
}

export function createMobileMenuVariants({
  isInstant = false,
  rowDistance = 12,
}: MobileMenuOptions = {}) {
  return {
    /** The full-screen popup. */
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
    /** Each row: logo and close button, links, Login, social links. */
    row: {
      hidden: { opacity: 0, y: rowDistance },
      visible: {
        opacity: 1,
        y: 0,
        transition: isInstant ? instant : quickSpring,
      },
    },
  } satisfies Record<string, Variants>;
}

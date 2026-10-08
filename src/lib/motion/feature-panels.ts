import { stagger, type Variants } from "motion/react";
import { instant, leave, spring } from "./transitions";

/*
 * Tab switch of the feature panels. Every panel stays mounted in the same
 * grid cell and animates between two states:
 * - "active": the selected panel enters;
 * - "inactive": the other panels leave (and stay out).
 */

export interface FeaturePanelOptions {
  /** 1 when the new tab follows the previous one, -1 when it precedes it. */
  direction: 1 | -1;
  /**
   * "row": illustration and text side by side (desktop). The content travels
   * in the direction of the new tab, the illustration further than the text.
   * "column": stacked (mobile and tablet). The illustration fades in from
   * slightly smaller and the text rises, without wide sideways movement.
   */
  layout: "row" | "column";
  /** Reduced motion: switch at once, without delays. */
  isInstant?: boolean;
  /** Horizontal travel of the illustration in a row, in px. */
  imageDistance?: number;
  /** Horizontal travel of the text in a row, in px. */
  textDistance?: number;
}

export function createFeaturePanelVariants({
  direction,
  layout,
  isInstant = false,
  imageDistance = 64,
  textDistance = 24,
}: FeaturePanelOptions) {
  const enter = isInstant ? instant : spring;
  const exit = isInstant ? instant : leave;

  // Starts from the side of the new tab and leaves towards the previous one.
  // Keyframes (`[from, to]`) restart the entrance from that side every time.
  const travel = (distance: number): Variants => ({
    active: {
      opacity: [0, 1],
      x: [distance * direction, 0],
      transition: enter,
    },
    inactive: { opacity: 0, x: -distance * direction, transition: exit },
  });

  return {
    /** The panel itself: it only times its children. */
    panel: {
      active: {
        // The new content starts as the previous one is almost gone.
        transition: {
          delayChildren: isInstant ? 0 : stagger(0.06, { startDelay: 0.15 }),
        },
      },
      inactive: {},
    },
    image:
      layout === "row"
        ? travel(imageDistance)
        : {
            active: { opacity: [0, 1], scale: [0.96, 1], transition: enter },
            inactive: { opacity: 0, scale: 0.96, transition: exit },
          },
    text:
      layout === "row"
        ? travel(textDistance)
        : {
            active: { opacity: [0, 1], y: [16, 0], transition: enter },
            inactive: { opacity: 0, transition: exit },
          },
  } satisfies Record<string, Variants>;
}

import { stagger, type Variants } from "motion/react";
import { instant, leave, spring } from "./transitions";

/*
 * Tab switch of the feature panels. Every panel stays mounted in the same
 * grid cell, in one of three states:
 * - "active": the selected panel, in its place;
 * - "before" / "after": a panel whose tab precedes or follows the selected
 *   one, out of sight on that side.
 * A panel enters from the side of its tab and leaves towards the side it
 * now belongs to, so the content always moves in the direction of travel.
 *
 * Each state sets the same values in both layouts, and the active one is
 * identical in both: crossing the breakpoint leaves the visible panel still.
 * A value missing from one layout would fall back to the panel's state at
 * mount instead.
 */

export type FeaturePanelState = "active" | "before" | "after";

export function getFeaturePanelState(
  index: number,
  selectedIndex: number,
): FeaturePanelState {
  if (index === selectedIndex) return "active";
  return index < selectedIndex ? "before" : "after";
}

export interface FeaturePanelOptions {
  /**
   * "row": illustration and text side by side (desktop). The content travels
   * sideways, the illustration further than the text.
   * "column": stacked (mobile and tablet). The illustration fades in from
   * slightly smaller and the text rises, without wide sideways movement.
   */
  layout: "row" | "column";
  /** Reduced motion: switch at once, without delays. */
  isInstant: boolean;
}

// Offsets of the panels out of sight, in px.
const IMAGE_DISTANCE = 64;
const TEXT_DISTANCE = 24;
const TEXT_RISE = 16;

export function createFeaturePanelVariants({
  layout,
  isInstant,
}: FeaturePanelOptions) {
  const enter = isInstant ? instant : spring;
  const exit = isInstant ? instant : leave;
  const isRow = layout === "row";

  // Out of sight on one side: -1 before the selected panel, 1 after it.
  const hiddenImage = (side: -1 | 1) => ({
    opacity: 0,
    x: isRow ? side * IMAGE_DISTANCE : 0,
    scale: isRow ? 1 : 0.96,
    transition: exit,
  });
  const hiddenText = (side: -1 | 1) => ({
    opacity: 0,
    x: isRow ? side * TEXT_DISTANCE : 0,
    y: isRow ? 0 : TEXT_RISE,
    transition: exit,
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
      before: {},
      after: {},
    },
    image: {
      active: { opacity: 1, x: 0, scale: 1, transition: enter },
      before: hiddenImage(-1),
      after: hiddenImage(1),
    },
    text: {
      active: { opacity: 1, x: 0, y: 0, transition: enter },
      before: hiddenText(-1),
      after: hiddenText(1),
    },
  } satisfies Record<string, Variants>;
}

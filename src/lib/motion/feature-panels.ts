import { stagger, type Variants } from "motion/react";
import { instant, leave, spring } from "./transitions";

// Feature panels are "active", or hidden "before" or "after" the selected one.
export type FeaturePanelState = "active" | "before" | "after";

export function getFeaturePanelState(
  index: number,
  selectedIndex: number,
): FeaturePanelState {
  if (index === selectedIndex) return "active";
  return index < selectedIndex ? "before" : "after";
}

export interface FeaturePanelOptions {
  layout: "row" | "column";
  isInstant: boolean;
}

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
    panel: {
      active: {
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

import type { CSSProperties, PropsWithChildren } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

// Pill size in the mobile (375px) and desktop (1440px) design frames.
const PILL_SIZE = {
  mobile: { width: 577, height: 203 },
  desktop: { width: 1000, height: 352 },
};

// Where the pill sits in one design frame, in px, relative to the box of the
// illustration.
interface PillPlacement {
  // Width of the box in that frame.
  image: number;
  // From the top of the box to the top of the pill.
  top: number;
  // From the box edge opposite to `bleed` to the rounded end of the pill.
  inset: number;
}

interface ImageDecorationProps {
  // Side where the pill leaves the viewport.
  bleed: "left" | "right";
  // Width / height of the decorated box.
  aspectRatio: number;
  mobile: PillPlacement;
  desktop: PillPlacement;
  className?: string;
  // Entrance of the box, pill included, driven by a parent such as Reveal.
  variants?: Variants;
}

const round = (value: number) => Math.round(value * 1000) / 1000;

/**
 * A CSS length that goes linearly from its `mobile` value to its `desktop`
 * value while the box grows from its mobile width to its desktop width, and
 * stays at those values outside that range. For example, the hero pill is
 * 577px wide next to a 311px illustration and 1000px wide next to a 578px one.
 *
 * Percentages refer to the box width. Vertical lengths (`top`, `height`)
 * resolve percentages against the box height instead, so they pass
 * `heightRatio`, the width / height ratio of the box.
 */
function fluid(
  mobile: number,
  desktop: number,
  { image: from }: PillPlacement,
  { image: to }: PillPlacement,
  heightRatio = 1,
) {
  const slope = (desktop - mobile) / (to - from);
  const intercept = mobile - slope * from;
  return `clamp(${mobile}px, ${round(intercept)}px + ${round(slope * 100 * heightRatio)}%, ${desktop}px)`;
}

export default function ImageDecoration({
  bleed,
  aspectRatio,
  mobile,
  desktop,
  className,
  variants,
  children,
}: PropsWithChildren<ImageDecorationProps>) {
  const style = {
    aspectRatio,
    "--pill-width": fluid(
      PILL_SIZE.mobile.width,
      PILL_SIZE.desktop.width,
      mobile,
      desktop,
    ),
    "--pill-height": fluid(
      PILL_SIZE.mobile.height,
      PILL_SIZE.desktop.height,
      mobile,
      desktop,
      aspectRatio,
    ),
    "--pill-top": fluid(mobile.top, desktop.top, mobile, desktop, aspectRatio),
    "--pill-inset": fluid(mobile.inset, desktop.inset, mobile, desktop),
  } as CSSProperties;

  return (
    <motion.div
      variants={variants}
      style={style}
      className={cn(
        "relative flex shrink-0 after:absolute after:top-(--pill-top) after:-z-1 after:h-(--pill-height) after:w-(--pill-width) after:rounded-full after:bg-blue-600",
        bleed === "right"
          ? "after:left-(--pill-inset)"
          : "after:right-(--pill-inset)",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

import type { PropsWithChildren } from "react";
import { motion, type Variants } from "motion/react";
import { useReveal, type RevealOptions } from "@/hooks/useReveal";
import { staggerChildren } from "@/lib/motion/variants";

const ELEMENTS = { div: motion.div, section: motion.section, ul: motion.ul };

interface RevealProps extends RevealOptions {
  as?: keyof typeof ELEMENTS;
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  /**
   * Variants of the group itself. By default it has no animation of its own
   * and its children enter one after another.
   */
  variants?: Variants;
}

/**
 * A group revealed once, as it enters the viewport (see `useReveal`). Give
 * its children entrance presets from `@/lib/motion/variants`, such as
 * `fadeUp()`, or pass `variants` to animate the group as a whole.
 */
export default function Reveal({
  as = "div",
  variants = staggerChildren(),
  amount,
  children,
  ...props
}: PropsWithChildren<RevealProps>) {
  const reveal = useReveal({ amount });
  const Element = ELEMENTS[as];

  return (
    <Element {...props} variants={variants} {...reveal}>
      {children}
    </Element>
  );
}

import type { PropsWithChildren } from "react";
import { motion, type Variants } from "motion/react";
import { useReveal } from "@/hooks/useReveal";
import { staggerChildren } from "@/lib/motion/variants";

const ELEMENTS = { div: motion.div, section: motion.section };

interface RevealProps {
  as?: keyof typeof ELEMENTS;
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  variants?: Variants;
}

export default function Reveal({
  as = "div",
  variants = staggerChildren(),
  children,
  ...props
}: PropsWithChildren<RevealProps>) {
  const reveal = useReveal();
  const Element = ELEMENTS[as];

  return (
    <Element {...props} variants={variants} {...reveal}>
      {children}
    </Element>
  );
}

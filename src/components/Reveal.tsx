import { useRef, type PropsWithChildren } from "react";
import {
  useAnimationControls,
  useReducedMotion,
  type Variants,
} from "motion/react";
import * as m from "motion/react-m";
import { staggerChildren } from "@/lib/motion";

const ELEMENTS = { div: m.div, section: m.section, ul: m.ul };

interface RevealProps {
  as?: keyof typeof ELEMENTS;
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  // Variants of the group itself; by default its children run one after another.
  variants?: Variants;
  // Share of the group that must be visible to start.
  amount?: number;
}

// Plays its children's "visible" variants once, when the group enters the
// viewport. Keyboard focus inside the group shows it at once, and so does
// reduced motion.
export default function Reveal({
  as = "div",
  variants = staggerChildren(),
  amount = 0.2,
  children,
  ...props
}: PropsWithChildren<RevealProps>) {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const isRevealedRef = useRef(false);
  const Element = ELEMENTS[as] as typeof m.div;

  function reveal() {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    controls.start("visible");
  }

  function show() {
    isRevealedRef.current = true;
    controls.start("visible", { duration: 0 });
  }

  return (
    <Element
      {...props}
      variants={variants}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? "visible" : controls}
      viewport={{ once: true, amount }}
      onViewportEnter={reveal}
      onFocusCapture={show}
    >
      {children}
    </Element>
  );
}

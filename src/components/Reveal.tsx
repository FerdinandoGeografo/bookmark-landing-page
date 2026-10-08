import { useState, type PropsWithChildren } from "react";
import { useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { staggerChildren } from "@/lib/motion";

interface RevealProps {
  className?: string;
  // Variants of the group itself; by default its children run one after another.
  variants?: Variants;
  // Share of the group that must be visible to start.
  amount?: number;
}

// Plays its children's "visible" variants once, when the group enters the
// viewport or receives keyboard focus. With reduced motion it starts visible.
export default function Reveal({
  className,
  variants = staggerChildren(),
  amount = 0.25,
  children,
}: PropsWithChildren<RevealProps>) {
  const shouldReduceMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const reveal = () => setIsRevealed(true);

  return (
    <m.div
      className={className}
      variants={variants}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={isRevealed || shouldReduceMotion ? "visible" : "hidden"}
      viewport={{ once: true, amount }}
      onViewportEnter={reveal}
      onFocusCapture={reveal}
    >
      {children}
    </m.div>
  );
}

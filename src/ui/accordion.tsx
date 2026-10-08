import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { AnimatePresence, motion } from "motion/react";

import { useReducedTransition } from "@/hooks/useReducedTransition";
import { quickSpring, resize } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";

interface OpenProps {
  // Whether the item is open, from the state that controls the accordion.
  open: boolean;
}

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col md:border-t md:border-t-blue-950/15",
        className,
      )}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-b-blue-950/15", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  open,
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props & OpenProps) {
  const transition = useReducedTransition(quickSpring);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-start justify-between rounded-lg pt-4.75 pb-3 text-left text-sm leading-8 text-blue-950 transition-all duration-300 outline-none hover:text-red-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:pb-3.25 md:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <motion.span
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={transition}
          className="mt-1.75 flex shrink-0 md:mt-2 md:mr-5.75"
        >
          <Icon
            name="arrow"
            className="h-3 w-4.5 text-blue-600 group-aria-expanded:text-red-400"
          />
        </motion.span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// The panel stays mounted while it animates closed: Base UI would hide it at
// once, so `hidden` is left to the animation.
function AccordionContent({
  open,
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props & OpenProps) {
  // MotionConfig would make the height jump but keep the fade.
  const transition = useReducedTransition(resize);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <AccordionPrimitive.Panel
          data-slot="accordion-content"
          keepMounted
          hidden={false}
          render={
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transition}
            />
          }
          className="text-answer md:text-answer-lg overflow-hidden"
          {...props}
        >
          <div
            className={cn(
              "pt-3.5 pb-7 text-blue-950/75 md:pt-4.75 md:pb-7.25",
              className,
            )}
          >
            {children}
          </div>
        </AccordionPrimitive.Panel>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

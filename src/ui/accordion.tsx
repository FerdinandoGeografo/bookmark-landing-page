import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";

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
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
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
        <Icon
          name="arrow"
          className="mt-2.5 h-3 w-4.5 shrink-0 group-aria-expanded:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden text-sm leading-7.5 md:text-base md:leading-9"
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
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

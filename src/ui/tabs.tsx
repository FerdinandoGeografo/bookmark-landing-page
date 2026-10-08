import { useId } from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { LayoutGroup, motion } from "motion/react";
import { TABLET_QUERY } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { quickSpring } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

// The layout group keeps each instance's indicator to its own tabs.
function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <LayoutGroup id={useId()}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-18", className)}
        {...props}
      />
    </LayoutGroup>
  );
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex flex-col divide-y divide-blue-500/20 border-y border-y-blue-500/20 md:w-full md:max-w-182.5 md:flex-row md:divide-y-0 md:self-center md:border-t-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Red bar under the active tab. In a row it slides from the previous tab:
 * every instance shares one `layoutId`, so Motion animates the bar from its
 * old place to the new one. Stacked, sliding would cross the labels in
 * between, so the bar grows from the centre of the new tab instead.
 */
function TabIndicator({ slides }: { slides: boolean }) {
  const className =
    "absolute inset-x-2.25 bottom-0 h-1 bg-red-400 md:inset-x-0";

  return slides ? (
    <motion.span
      layoutId="tabs-indicator"
      transition={quickSpring}
      className={className}
    />
  ) : (
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={quickSpring}
      className={className}
    />
  );
}

// Only the active tab renders the indicator, whose animation depends on
// whether the tabs sit in a row.
function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  const isRow = useMediaQuery(TABLET_QUERY);

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "flex flex-1 justify-center text-center text-base leading-4.25 tracking-wide text-blue-950/75 transition-colors duration-300 outline-none hover:text-red-400 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset data-active:text-blue-950",
        className,
      )}
      render={({ children, ...tabProps }, { active }) => (
        <button {...tabProps}>
          <span className="relative py-5 md:w-full md:py-7.75">
            {children}
            {active && <TabIndicator slides={isRow} />}
          </span>
        </button>
      )}
      {...props}
    />
  );
}

function TabsContent(props: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel data-slot="tabs-content" tabIndex={-1} {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

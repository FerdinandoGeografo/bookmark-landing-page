import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-18", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"

      className={cn(
        "flex flex-col justify-center divide-y divide-blue-500/20 border-y border-y-blue-500/20 md:w-full md:max-w-182.5 md:flex-row md:divide-y-0 md:self-center md:border-t-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative flex flex-1 items-center justify-center py-5 text-base leading-4.25 tracking-wide whitespace-nowrap text-blue-950/75 transition-all duration-300 outline-none hover:text-red-400 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 md:py-7.75",
        "data-active:bg-white data-active:text-blue-950",
        "after:absolute after:bottom-0 after:h-1 after:w-35.75 after:scale-x-0 after:bg-red-400 after:transition-all after:duration-300 data-active:after:scale-x-100 md:after:w-full",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      tabIndex={-1}
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

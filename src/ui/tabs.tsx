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
        "flex flex-col divide-y divide-blue-500/20 border-y border-y-blue-500/20 md:w-full md:max-w-182.5 md:flex-row md:divide-y-0 md:self-center md:border-t-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "group flex flex-1 justify-center text-center text-base leading-4.25 tracking-wide text-blue-950/75 transition-colors duration-300 outline-none hover:text-red-400 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset data-active:text-blue-950",
        className,
      )}
      {...props}
    >
      <span className="relative py-5 after:absolute after:inset-x-2.25 after:bottom-0 after:h-1 after:scale-x-0 after:bg-red-400 after:transition-transform after:duration-300 group-data-active:after:scale-x-100 md:w-full md:py-7.75 md:after:inset-x-0">
        {children}
      </span>
    </TabsPrimitive.Tab>
  );
}

function TabsContent(props: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel data-slot="tabs-content" tabIndex={-1} {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

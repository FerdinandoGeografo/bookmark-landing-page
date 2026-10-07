import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-sm border-2 border-white bg-white px-4.5 py-2 text-xs leading-7 transition-colors duration-300 outline-none placeholder:text-blue-950/25 focus-visible:border-blue-950 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-400",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

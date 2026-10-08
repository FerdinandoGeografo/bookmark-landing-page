import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full rounded-sm border-2 border-white bg-white px-4.5 py-2 text-xs leading-7 text-blue-950 transition-colors duration-300 outline-none placeholder:text-blue-950/25 focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2 aria-invalid:border-red-400 aria-invalid:focus-visible:ring-red-400 aria-invalid:focus-visible:ring-offset-0",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

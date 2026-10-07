import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center shadow-md shadow-blue-500/20 justify-center rounded-sm border-2 text-xs leading-7 font-medium whitespace-nowrap tracking-wide transition-all duration-300 outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-blue-600",
        secondary:
          "bg-neutral-100 text-blue-950/75 border-neutral-100 hover:bg-white hover:border-grey-300",
        accent:
          "text-white bg-red-400 border-red-400 hover:bg-white hover:text-red-400",
      },
      size: {
        default: "h-12 px-3.5 md:px-5.5",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };

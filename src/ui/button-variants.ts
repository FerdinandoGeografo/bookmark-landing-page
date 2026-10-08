import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-sm border-2 font-medium whitespace-nowrap shadow-md shadow-blue-500/20 transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-blue-600 focus-visible:ring-blue-600",
        secondary:
          "border-neutral-100 bg-neutral-100 text-blue-950/75 hover:border-grey-300 hover:bg-white focus-visible:ring-blue-950/75",
        accent:
          "border-red-400 bg-red-400 text-white hover:bg-white hover:text-red-400 focus-visible:ring-red-400",
      },
      size: {
        default: "h-12 px-3.5 text-xs leading-7 tracking-wide md:px-5.5",
        sm: "h-10 px-7.5 text-link uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export { buttonVariants };

import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface ImageDecorationProps {
  className?: string;
}

export default function ImageDecoration({
  children,
  className,
}: PropsWithChildren<ImageDecorationProps>) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 after:absolute after:-z-1 after:h-50.75 after:w-144.25 after:rounded-full after:bg-blue-600 after:transition-all after:duration-300 md:after:h-88 md:after:w-250",
        className,
      )}
    >
      {children}
    </div>
  );
}

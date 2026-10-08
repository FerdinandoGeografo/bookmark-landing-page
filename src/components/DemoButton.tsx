import type { ComponentProps } from "react";
import { demoDialog } from "@/lib/demo-dialog";
import { Button } from "@/ui/button";
import { DialogTrigger } from "@/ui/dialog";

export default function DemoButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <DialogTrigger handle={demoDialog} render={<Button {...props} />}>
      {children}
    </DialogTrigger>
  );
}

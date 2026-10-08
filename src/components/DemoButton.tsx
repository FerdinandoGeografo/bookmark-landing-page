import type { ComponentProps } from "react";
import { ACTION_NOTICE, demoDialog } from "@/lib/demo-dialog";
import { Button } from "@/ui/button";
import { DialogTrigger } from "@/ui/dialog";

export default function DemoButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <DialogTrigger
      handle={demoDialog}
      payload={ACTION_NOTICE}
      render={<Button {...props} />}
    >
      {children}
    </DialogTrigger>
  );
}

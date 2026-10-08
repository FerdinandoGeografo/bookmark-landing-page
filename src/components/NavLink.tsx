import { ACTION_NOTICE, demoDialog } from "@/lib/demo-dialog";
import { cn } from "@/lib/utils";
import type { NavLink as NavLinkData } from "@/types/link";
import { DialogTrigger } from "@/ui/dialog";

interface NavLinkProps {
  link: NavLinkData;
  className?: string;
}

export default function NavLink({ link, className }: NavLinkProps) {
  if (link.href) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <DialogTrigger
      handle={demoDialog}
      payload={ACTION_NOTICE}
      className={cn(
        "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400",
        className,
      )}
    >
      {link.label}
    </DialogTrigger>
  );
}

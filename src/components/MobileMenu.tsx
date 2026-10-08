import { useRef, useState, type MouseEvent } from "react";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import * as m from "motion/react-m";
import { fadeIn } from "@/lib/motion";
import { LINKS } from "@/constants/links";
import { demoDialog } from "@/lib/demo-dialog";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import Icon from "./Icon";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const iconButtonClassName =
  "-m-3 flex rounded-sm p-3 outline-none focus-visible:ring-2 focus-visible:ring-red-400";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  // Action to run once the menu has finished closing.
  const afterCloseRef = useRef<(() => void) | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close the menu when the viewport grows into the desktop layout.
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  if (open && isDesktop) setOpen(false);

  function closeThen(action: () => void) {
    afterCloseRef.current = action;
    setOpen(false);
  }

  // Links are placeholders that lead back to the top. Scroll only once the
  // dialog has closed, so the scroll lock does not swallow the movement.
  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    closeThen(() => window.scrollTo({ top: 0 }));
  }

  // Login has no destination: swap the menu for the demo notice. Focusing the
  // menu button first gives the notice a place to return focus to.
  function handleLoginClick() {
    closeThen(() => {
      triggerRef.current?.focus();
      demoDialog.open(null);
    });
  }

  function handleOpenChangeComplete(isOpen: boolean) {
    if (isOpen) return;

    afterCloseRef.current?.();
    afterCloseRef.current = null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <DialogTrigger
        ref={triggerRef}
        render={<m.button variants={fadeIn} />}
        aria-label="Open menu"
        className={cn(iconButtonClassName, "lg:hidden")}
      >
        <Icon name="menu" className="h-3.75 w-4.5" />
      </DialogTrigger>

      <DialogPortal>
        <DialogPopup className="fixed inset-0 flex flex-col overflow-y-auto bg-blue-950/95 px-8 pt-10 pb-12 text-white">
          <DialogTitle className="sr-only">Menu</DialogTitle>

          <div className="flex items-center justify-between">
            <Logo variant="inverted" />
            <DialogClose
              aria-label="Close menu"
              className={iconButtonClassName}
            >
              <Icon name="close" className="h-3.75 w-4" />
            </DialogClose>
          </div>

          <nav aria-label="Main" className="mt-10 flex flex-col gap-6">
            <ul className="border-t border-white/15">
              {LINKS.map((link) => (
                <li key={link} className="border-b border-white/15">
                  <a
                    href="#"
                    onClick={handleLinkClick}
                    className="block pt-5 pb-5.25 text-center text-xl leading-6 tracking-[2.3px] uppercase transition-colors duration-300 hover:text-red-400"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleLoginClick}
              className="flex h-12 items-center justify-center rounded-sm border-2 border-white text-xl tracking-[2.3px] uppercase transition-colors duration-300 hover:bg-white hover:text-blue-950"
            >
              Login
            </button>
          </nav>

          <SocialLinks className="mt-auto justify-center pt-12" />
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}

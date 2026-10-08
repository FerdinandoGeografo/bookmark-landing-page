import { useRef, useState, type MouseEvent } from "react";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  AnimatePresence,
  stagger,
  useReducedMotion,
  type Variants,
} from "motion/react";
import * as m from "motion/react-m";
import { fadeIn, quickSpring } from "@/lib/motion";
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

// The overlay fades in, then its rows rise one after another; it fades out as
// a whole. Reduced motion shows and hides it at once.
function getMenuVariants(isInstant: boolean) {
  return {
    popup: {
      hidden: { opacity: 0, transition: { duration: isInstant ? 0 : 0.2 } },
      visible: {
        opacity: 1,
        transition: {
          duration: isInstant ? 0 : 0.2,
          delayChildren: isInstant ? 0 : stagger(0.05, { startDelay: 0.05 }),
        },
      },
    },
    row: {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: isInstant ? { duration: 0 } : quickSpring,
      },
    },
  } satisfies Record<string, Variants>;
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  // Action to run once the menu has finished closing.
  const afterCloseRef = useRef<(() => void) | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const variants = getMenuVariants(Boolean(shouldReduceMotion));

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

      <AnimatePresence>
        {open && (
          <DialogPortal keepMounted>
            <DialogPopup
              render={
                <m.div
                  variants={variants.popup}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              }
              className="fixed inset-0 flex flex-col overflow-y-auto bg-blue-950/95 px-8 pt-10 pb-12 text-white"
            >
              <DialogTitle className="sr-only">Menu</DialogTitle>

              <m.div
                variants={variants.row}
                className="flex items-center justify-between"
              >
                <Logo variant="inverted" />
                <DialogClose
                  aria-label="Close menu"
                  className={iconButtonClassName}
                >
                  <Icon name="close" className="h-3.75 w-4" />
                </DialogClose>
              </m.div>

              <nav aria-label="Main" className="mt-10 flex flex-col gap-6">
                <ul className="border-t border-white/15">
                  {LINKS.map((link) => (
                    <m.li
                      key={link}
                      variants={variants.row}
                      className="border-b border-white/15"
                    >
                      <a
                        href="#"
                        onClick={handleLinkClick}
                        className="block pt-5 pb-5.25 text-center text-xl leading-6 tracking-[2.3px] uppercase transition-colors duration-300 hover:text-red-400"
                      >
                        {link}
                      </a>
                    </m.li>
                  ))}
                </ul>
                <m.button
                  variants={variants.row}
                  type="button"
                  onClick={handleLoginClick}
                  className="flex h-12 items-center justify-center rounded-sm border-2 border-white text-xl tracking-[2.3px] uppercase transition-colors duration-300 hover:bg-white hover:text-blue-950"
                >
                  Login
                </m.button>
              </nav>

              <m.div variants={variants.row} className="mt-auto pt-12">
                <SocialLinks className="justify-center" />
              </m.div>
            </DialogPopup>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

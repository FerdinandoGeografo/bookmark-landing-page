import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { LINKS } from "@/constants/links";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ACTION_NOTICE, demoDialog } from "@/lib/demo-dialog";
import { createMobileMenuVariants } from "@/lib/motion/mobile-menu";
import { fadeIn } from "@/lib/motion/variants";
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

const menuLinkClassName =
  "text-menu block pt-5 pb-5.25 text-center uppercase transition-colors duration-300 hover:text-red-400";

const iconButtonClassName =
  "-m-3 flex rounded-sm p-3 outline-none focus-visible:ring-2 focus-visible:ring-red-400";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  // Action to run once the menu has finished closing.
  const afterCloseRef = useRef<(() => void) | null>(null);
  // Whether closing gives focus back to the menu button.
  const returnsFocusRef = useRef(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const variants = createMobileMenuVariants(usePrefersReducedMotion());

  // Close the menu when the viewport grows into the desktop layout.
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  if (open && isDesktop) setOpen(false);

  function closeThen(action: () => void) {
    afterCloseRef.current = action;
    setOpen(false);
  }

  // Follow a section link only once the dialog has closed, so the scroll
  // lock does not swallow the movement. Focus stays off the menu button, so
  // the next Tab continues from the section, as after a link outside the menu.
  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const { href } = event.currentTarget;
    returnsFocusRef.current = false;
    closeThen(() => window.location.assign(href));
  }

  // Pricing and Login have no destination: swap the menu for the demo notice.
  // Focusing the menu button first gives the notice a place to return focus to.
  function handleDemoClick() {
    closeThen(() => {
      triggerRef.current?.focus();
      demoDialog.openWithPayload(ACTION_NOTICE);
    });
  }

  function handleOpenChangeComplete(isOpen: boolean) {
    if (isOpen) {
      returnsFocusRef.current = true;
      return;
    }

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
        render={<motion.button variants={fadeIn()} />}
        aria-label="Open menu"
        className={cn(iconButtonClassName, "lg:hidden")}
      >
        <Icon name="menu" className="h-3.75 w-4.5" />
      </DialogTrigger>

      <AnimatePresence>
        {open && (
          <DialogPortal keepMounted>
            <DialogPopup
              finalFocus={() => returnsFocusRef.current}
              render={
                <motion.div
                  variants={variants.popup}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              }
              className="fixed inset-0 flex flex-col overflow-y-auto bg-blue-950/95 px-8 pt-10 pb-12 text-white"
            >
              <DialogTitle className="sr-only">Menu</DialogTitle>

              <motion.div
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
              </motion.div>

              <nav aria-label="Main" className="mt-10 flex flex-col gap-6">
                <ul className="border-t border-white/15">
                  {LINKS.map((link) => (
                    <motion.li
                      key={link.label}
                      variants={variants.row}
                      className="border-b border-white/15"
                    >
                      {link.href ? (
                        <a
                          href={link.href}
                          onClick={handleLinkClick}
                          className={menuLinkClassName}
                        >
                          <span className="link-underline">{link.label}</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={handleDemoClick}
                          className={cn(
                            menuLinkClassName,
                            "w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400",
                          )}
                        >
                          <span className="link-underline">{link.label}</span>
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  variants={variants.row}
                  type="button"
                  onClick={handleDemoClick}
                  className="text-menu flex h-12 items-center justify-center rounded-sm border-2 border-white uppercase transition-colors duration-300 hover:bg-white hover:text-blue-950"
                >
                  Login
                </motion.button>
              </nav>

              <motion.div variants={variants.row} className="mt-auto pt-12">
                <SocialLinks className="justify-center" />
              </motion.div>
            </DialogPopup>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

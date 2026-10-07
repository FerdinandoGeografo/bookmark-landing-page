import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { LINKS } from "@/constants/links";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const iconButtonClassName =
  "-m-3 flex rounded-sm p-3 outline-none focus-visible:ring-2 focus-visible:ring-red-400";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const scrollToTopRef = useRef(false);

  // Close the menu when the viewport grows into the desktop layout.
  useEffect(() => {
    if (!open) return;

    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [open]);

  // Links are placeholders that lead back to the top. Scroll only once the
  // dialog has closed, so the scroll lock does not swallow the movement.
  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    scrollToTopRef.current = true;
    setOpen(false);
  }

  function handleOpenChangeComplete(isOpen: boolean) {
    if (isOpen || !scrollToTopRef.current) return;

    scrollToTopRef.current = false;
    window.scrollTo({ top: 0 });
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(iconButtonClassName, "lg:hidden")}
      >
        <Icon name="menu" className="h-3.75 w-4.5" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-blue-950/95 px-8 pt-10 pb-12 text-white outline-none">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="flex items-center justify-between">
            <Logo />
            <Dialog.Close
              aria-label="Close menu"
              className={iconButtonClassName}
            >
              <Icon name="close" className="h-3.75 w-4" />
            </Dialog.Close>
          </div>

          <nav aria-label="Main" className="mt-10 flex flex-col gap-6">
            <ul className="border-t border-white/15">
              {LINKS.map((link) => (
                <li key={link} className="border-b border-white/15">
                  <a
                    href="#"
                    onClick={handleLinkClick}
                    className="block py-5 text-center text-xl leading-6 tracking-[2.3px] uppercase transition-colors duration-300 hover:text-red-400"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#"
              onClick={handleLinkClick}
              className="flex h-12 items-center justify-center rounded-sm border-2 border-white text-xl tracking-[2.3px] uppercase transition-colors duration-300 hover:bg-white hover:text-blue-950"
            >
              Login
            </a>
          </nav>

          <SocialLinks className="mt-auto justify-center pt-12" />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

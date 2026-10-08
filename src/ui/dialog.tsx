import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "motion/react";

import { useReducedTransition } from "@/hooks/useReducedTransition";
import { fade, quickSpring } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

function Dialog<Payload>(props: DialogPrimitive.Root.Props<Payload>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger<Payload>(props: DialogPrimitive.Trigger.Props<Payload>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-blue-950/50", className)}
      {...props}
    />
  );
}

function DialogPopup({ className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-popup"
      className={cn("z-50 outline-none", className)}
      {...props}
    />
  );
}

// Pass the `open` state of the Root. AnimatePresence keeps the portal mounted
// (keepMounted) while Motion plays the exit: the overlay fades out and the
// popup shrinks away, the reverse of how they came in.
function DialogContent({
  open,
  className,
  ...props
}: DialogPrimitive.Popup.Props & { open: boolean }) {
  const fadeTransition = useReducedTransition(fade);
  const popTransition = useReducedTransition(quickSpring);

  return (
    <AnimatePresence>
      {open && (
        <DialogPortal keepMounted>
          <DialogOverlay
            render={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fadeTransition}
              />
            }
          />
          <DialogPopup
            data-slot="dialog-content"
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={popTransition}
              />
            }
            className={cn(
              "fixed inset-x-8 top-1/2 mx-auto flex max-w-110 -translate-y-1/2 flex-col items-center gap-4 rounded-lg bg-white px-6 pt-10 pb-6 text-center shadow-xl shadow-blue-950/20 md:px-10",
              className,
            )}
            {...props}
          />
        </DialogPortal>
      )}
    </AnimatePresence>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-2xl leading-8 font-medium text-blue-950", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm leading-6.25 text-blue-950/50 md:text-base md:leading-7",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

import { useState } from "react";
import { ACTION_NOTICE, demoDialog, type DemoNotice } from "@/lib/demo-dialog";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/ui/dialog";

function NoticeText({ notice }: { notice: DemoNotice }) {
  if (notice.kind === "newsletter") {
    return (
      <>
        <DialogTitle>Thanks for trying the form</DialogTitle>
        <DialogDescription>
          <span className="font-medium text-blue-950">{notice.email}</span>{" "}
          looks right, but Bookmark is a demo: the address wasn’t saved and no
          newsletter will arrive.
        </DialogDescription>
      </>
    );
  }

  return (
    <>
      <DialogTitle>This is a demo</DialogTitle>
      <DialogDescription>
        Bookmark is a landing page built for a Frontend Mentor challenge, so
        this action doesn’t lead anywhere. Thanks for taking a look!
      </DialogDescription>
    </>
  );
}

export default function DemoDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog handle={demoDialog} open={open} onOpenChange={setOpen}>
      {({ payload }) => (
        <DialogContent open={open}>
          <NoticeText notice={payload ?? ACTION_NOTICE} />
          <DialogClose render={<Button className="mt-2 px-7.5" />}>
            Got it
          </DialogClose>
        </DialogContent>
      )}
    </Dialog>
  );
}

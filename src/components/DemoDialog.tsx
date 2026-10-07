import { demoDialog } from "@/lib/demo-dialog";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/ui/dialog";

export default function DemoDialog() {
  return (
    <Dialog handle={demoDialog}>
      <DialogContent>
        <DialogTitle>This is a demo</DialogTitle>
        <DialogDescription>
          Bookmark is a landing page built for a Frontend Mentor challenge, so
          this action doesn’t lead anywhere. Thanks for taking a look!
        </DialogDescription>
        <DialogClose render={<Button className="mt-2 px-7.5" />}>
          Got it
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

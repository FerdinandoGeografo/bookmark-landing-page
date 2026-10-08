import { Dialog } from "@base-ui/react/dialog";

// What the demo notice explains: an action without a destination, or a
// newsletter sign-up that nothing stores.
export type DemoNotice =
  { kind: "action" } | { kind: "newsletter"; email: string };

export const ACTION_NOTICE: DemoNotice = { kind: "action" };

// Connects every placeholder action on the page to the single demo notice.
export const demoDialog = Dialog.createHandle<DemoNotice>();

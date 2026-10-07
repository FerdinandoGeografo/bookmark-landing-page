import type { IconName } from "./icon";

export type Social = {
  name: string;
  icon: Extract<IconName, "facebook" | "twitter">;
  iconClassName: string;
};

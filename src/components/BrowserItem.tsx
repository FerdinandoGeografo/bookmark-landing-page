import type { Browser } from "@/types/browser";
import { Button } from "@/ui/button";

interface BrowserItemProps {
  browser: Browser;
}

export default function BrowserItem({ browser }: BrowserItemProps) {
  const { logo, name, minVersion } = browser;

  return (
    <div className="flex w-70 flex-col items-center gap-8 rounded-lg bg-white pt-12.25 pb-6 shadow-xl shadow-blue-500/20">
      <img src={logo} alt="" />
      <div className="inline-flex flex-col items-center gap-1.5">
        <h3 className="text-xl leading-6 font-medium tracking-wide text-blue-950">
          Add to {name}
        </h3>
        <p className="text-sm leading-7 text-blue-950/50">
          Minimum version {minVersion}
        </p>
      </div>

      <div className="flex flex-col gap-6 self-stretch">
        <svg className="h-1" aria-hidden="true">
          <use href="#dots" />
        </svg>

        <Button className="mx-6.5">Add & Install Extension</Button>
      </div>
    </div>
  );
}

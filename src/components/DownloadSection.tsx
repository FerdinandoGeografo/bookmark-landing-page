import type { CSSProperties } from "react";
import { BROWSERS } from "@/constants/browsers";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { spring } from "@/lib/motion/transitions";
import { enterFrom, fadeUp } from "@/lib/motion/variants";
import HeadingBox from "./HeadingBox";
import BrowserItem from "./BrowserItem";
import Reveal from "./Reveal";

// In a row each card sits 40px lower than the previous one (0, 40, 80px).
// The offset lives on the list item, so the card inside it stays free for
// its entrance animation.
function cardOffset(index: number) {
  return { "--card-offset": `${index * 40}px` } satisfies CSSProperties;
}

// In a row the cards drop in one after another; stacked, each card rises on
// its own. Either way every card reveals as it scrolls into view, and the
// list keeps the same elements across the breakpoint, so a focused card
// stays focused and a revealed one stays visible.
function cardEntrance(isDesktop: boolean, index: number) {
  return isDesktop
    ? enterFrom({ y: -40, transition: { ...spring, delay: index * 0.12 } })
    : fadeUp();
}

export default function DownloadSection() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <Reveal
      as="section"
      id="download"
      aria-labelledby="download-title"
      className="mt-19.25 mb-35 flex flex-col items-center gap-10 px-8 lg:mt-59.5 lg:mb-57.25 lg:gap-12"
    >
      <HeadingBox
        titleId="download-title"
        title="Download the extension"
        description="We’ve got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like us to prioritize."
      />

      <ul className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-9">
        {BROWSERS.map((browser, index) => (
          <li
            key={browser.name}
            style={cardOffset(index)}
            className="lg:translate-y-(--card-offset)"
          >
            <Reveal variants={cardEntrance(isDesktop, index)}>
              <BrowserItem browser={browser} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { BROWSERS } from "@/constants/browsers";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { enterFrom, fadeUp, staggerChildren } from "@/lib/motion/variants";
import HeadingBox from "./HeadingBox";
import BrowserItem from "./BrowserItem";
import Reveal from "./Reveal";

const LIST_CLASS_NAME =
  "flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-9";

// In a row each card sits 40px lower than the previous one (0, 40, 80px).
// The offset lives on the list item, so the card inside it stays free for
// its entrance animation.
function cardOffset(index: number) {
  return { "--card-offset": `${index * 40}px` } as CSSProperties;
}

export default function DownloadSection() {
  // In a row the cards drop in one after another; stacked, each card
  // reveals on its own as it scrolls into view.
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

      {isDesktop ? (
        <Reveal
          as="ul"
          variants={staggerChildren({ step: 0.12 })}
          className={LIST_CLASS_NAME}
        >
          {BROWSERS.map((browser, index) => (
            <li
              key={browser.name}
              style={cardOffset(index)}
              className="lg:translate-y-(--card-offset)"
            >
              {/* Drops into the offset of its list item. */}
              <motion.div variants={enterFrom({ y: -40 })}>
                <BrowserItem browser={browser} />
              </motion.div>
            </li>
          ))}
        </Reveal>
      ) : (
        <ul className={LIST_CLASS_NAME}>
          {BROWSERS.map((browser) => (
            <li key={browser.name}>
              <Reveal variants={fadeUp()}>
                <BrowserItem browser={browser} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

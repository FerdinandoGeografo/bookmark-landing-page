import { useState } from "react";
import {
  stagger,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import * as m from "motion/react-m";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { FEATURES } from "@/constants/features";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fadeUp, spring, staggerChildren } from "@/lib/motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import DemoButton from "./DemoButton";
import HeadingBox from "./HeadingBox";
import ImageDecoration from "./ImageDecoration";
import Reveal from "./Reveal";

// As in the design frames, every tab keeps the box of the first illustration:
// the others start at the same top and the taller ones overflow it downwards,
// so switching tabs never moves the page.
const FRAME = FEATURES[0].image;

const LEAVE = { duration: 0.2, ease: "easeIn" } satisfies Transition;
const INSTANT = { duration: 0 } satisfies Transition;

// Tab switch. In a row, the content travels in the direction of the new tab:
// the illustration further than the text, which follows it. Stacked, the
// illustration fades in from slightly smaller and the text rises. The pill
// behind the illustration stays still.
function getPanelVariants(
  direction: number,
  isRow: boolean,
  isInstant: boolean,
) {
  const enter = isInstant ? INSTANT : spring;
  const leave = isInstant ? INSTANT : LEAVE;

  return {
    panel: {
      active: {
        // The new content starts as the previous one is almost gone.
        transition: {
          delayChildren: isInstant ? 0 : stagger(0.06, { startDelay: 0.15 }),
        },
      },
      inactive: {},
    },
    image: isRow
      ? {
          active: {
            opacity: [0, 1],
            x: [64 * direction, 0],
            transition: enter,
          },
          inactive: { opacity: 0, x: -64 * direction, transition: leave },
        }
      : {
          active: { opacity: [0, 1], scale: [0.96, 1], transition: enter },
          inactive: { opacity: 0, scale: 0.96, transition: leave },
        },
    text: isRow
      ? {
          active: {
            opacity: [0, 1],
            x: [24 * direction, 0],
            transition: enter,
          },
          inactive: { opacity: 0, x: -24 * direction, transition: leave },
        }
      : {
          active: { opacity: [0, 1], y: [16, 0], transition: enter },
          inactive: { opacity: 0, transition: leave },
        },
  } satisfies Record<string, Variants>;
}

export default function FeaturesSection() {
  // One source for the selected tab and the direction it was reached from.
  const [selection, setSelection] = useState({
    id: FEATURES[0].id,
    direction: 1,
  });
  const isRow = useMediaQuery(DESKTOP_QUERY);
  const shouldReduceMotion = useReducedMotion();
  const variants = getPanelVariants(
    selection.direction,
    isRow,
    Boolean(shouldReduceMotion),
  );

  function handleValueChange(id: string) {
    const index = (featureId: string) =>
      FEATURES.findIndex((feature) => feature.id === featureId);
    setSelection({
      id,
      direction: index(id) > index(selection.id) ? 1 : -1,
    });
  }

  return (
    <Reveal
      as="section"
      id="features"
      aria-labelledby="features-title"
      className="mt-35 flex flex-col items-center gap-10 px-8 md:mt-45 md:gap-10.25"
    >
      <HeadingBox
        titleId="features-title"
        title="Features"
        description="Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between your devices so you can access them on the go."
      />

      <Tabs
        value={selection.id}
        onValueChange={handleValueChange}
        render={<m.div variants={staggerChildren(0.1)} />}
      >
        <TabsList render={<m.div variants={fadeUp} />}>
          {FEATURES.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id}>
              {feature.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* All panels share one grid cell, so the section always keeps the
            same height. Inactive panels stay mounted and inert (Base UI) and
            become invisible once their content has animated out. */}
        <m.div variants={fadeUp} className="grid *:col-start-1 *:row-start-1">
          {FEATURES.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              keepMounted
              hidden={false}
              className="transition-[visibility] data-hidden:invisible data-hidden:delay-250 motion-reduce:delay-0"
            >
              <m.div
                variants={variants.panel}
                initial={false}
                animate={feature.id === selection.id ? "active" : "inactive"}
                className="flex flex-col items-center gap-17.25 md:gap-20 lg:flex-row lg:gap-31.25"
              >
                <ImageDecoration
                  bleed="left"
                  aspectRatio={FRAME.width / FRAME.height}
                  mobile={{ image: 311, top: 34.875, inset: 34.875 }}
                  desktop={{ image: FRAME.width, top: 83, inset: 64.32 }}
                  className="min-h-0 w-full max-w-134 items-start lg:max-w-[min(100vw*536/1440,536px)]"
                >
                  <m.img
                    variants={variants.image}
                    src={feature.image.src}
                    width={feature.image.width}
                    height={feature.image.height}
                    alt=""
                    className="h-auto shrink-0"
                    style={{
                      width: `${(feature.image.width / FRAME.width) * 100}%`,
                      marginLeft: `${(feature.image.left / FRAME.width) * 100}%`,
                    }}
                  />
                </ImageDecoration>

                <div className="flex flex-col items-center text-center md:max-w-111.25 md:gap-4 lg:items-start lg:text-left">
                  <m.h3
                    variants={variants.text}
                    className="text-2xl leading-13 font-medium text-blue-950 md:text-4xl"
                  >
                    {feature.title}
                  </m.h3>
                  <m.p
                    variants={variants.text}
                    className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7"
                  >
                    {feature.description}
                  </m.p>
                  <m.div variants={variants.text}>
                    <DemoButton className="mt-3.75 px-5.5 md:mt-4">
                      More Info
                    </DemoButton>
                  </m.div>
                </div>
              </m.div>
            </TabsContent>
          ))}
        </m.div>
      </Tabs>
    </Reveal>
  );
}

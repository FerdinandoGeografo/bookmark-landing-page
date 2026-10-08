import { useState } from "react";
import { motion } from "motion/react";
import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { FEATURES } from "@/constants/features";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  createFeaturePanelVariants,
  getFeaturePanelState,
} from "@/lib/motion/feature-panels";
import { fadeUp, staggerChildren } from "@/lib/motion/variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import DemoButton from "./DemoButton";
import HeadingBox from "./HeadingBox";
import ImageDecoration from "./ImageDecoration";
import Reveal from "./Reveal";

// As in the design frames, every tab keeps the box of the first illustration:
// the others start at the same top and the taller ones overflow it downwards,
// so switching tabs never moves the page.
const FRAME = FEATURES[0].image;

export default function FeaturesSection() {
  // One source of truth for Base UI and the animation: the selected tab.
  const [selected, setSelected] = useState(FEATURES[0].id);
  const selectedIndex = FEATURES.findIndex(({ id }) => id === selected);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = createFeaturePanelVariants({
    layout: isDesktop ? "row" : "column",
    isInstant: prefersReducedMotion,
  });

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
        value={selected}
        onValueChange={setSelected}
        render={<motion.div variants={staggerChildren(0.1)} />}
      >
        <TabsList
          aria-labelledby="features-title"
          render={<motion.div variants={fadeUp()} />}
        >
          {FEATURES.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id}>
              {feature.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <motion.div
          variants={fadeUp()}
          className="grid *:col-start-1 *:row-start-1"
        >
          {FEATURES.map((feature, index) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              keepMounted
              hidden={false}
              className="transition-[visibility] data-hidden:invisible data-hidden:delay-250 motion-reduce:delay-0"
            >
              <motion.div
                variants={variants.panel}
                initial={false}
                animate={getFeaturePanelState(index, selectedIndex)}
                className="flex flex-col items-center gap-17.25 md:gap-20 lg:flex-row lg:gap-31.25"
              >
                <ImageDecoration
                  bleed="left"
                  aspectRatio={FRAME.width / FRAME.height}
                  mobile={{ image: 311, top: 35, inset: 35 }}
                  desktop={{ image: FRAME.width, top: 83, inset: 64 }}
                  className="lg:max-w-fluid-536 min-h-0 w-full max-w-134 items-start"
                >
                  <motion.img
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
                  <motion.h3
                    variants={variants.text}
                    className="text-2xl leading-13 font-medium text-blue-950 md:text-4xl"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    variants={variants.text}
                    className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7"
                  >
                    {feature.description}
                  </motion.p>
                  <motion.div variants={variants.text}>
                    <DemoButton className="mt-3.75 px-5.5 md:mt-4">
                      More Info
                    </DemoButton>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </motion.div>
      </Tabs>
    </Reveal>
  );
}

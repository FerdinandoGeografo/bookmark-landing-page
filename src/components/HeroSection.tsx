import { motion } from "motion/react";
import { fadeUp, slideIn, staggerChildren } from "@/lib/motion/variants";
import DemoButton from "./DemoButton";
import ImageDecoration from "./ImageDecoration";
import Reveal from "./Reveal";

export default function HeroSection() {
  return (
    <Reveal
      as="section"
      aria-labelledby="hero-title"
      className="lg:pr-fluid-91 lg:pl-fluid-165 mt-10 flex flex-col gap-24 px-8 lg:mt-16.75 lg:flex-row lg:items-end lg:justify-center lg:gap-16.25"
    >
      <ImageDecoration
        bleed="right"
        aspectRatio={578 / 385}
        mobile={{ image: 311, top: 52, inset: 39 }}
        desktop={{ image: 578, top: 131, inset: 154 }}
        variants={slideIn(48)}
        className="md:max-lg:self-center lg:order-1"
      >
        <img
          src="/images/illustration-hero.svg"
          width={578}
          height={385}
          alt=""
          className="lg:max-w-fluid-578 drop-shadow-2xl drop-shadow-blue-800/20"
        />
      </ImageDecoration>

      <motion.div
        variants={staggerChildren()}
        className="flex flex-col gap-4 text-center md:max-w-135 md:gap-6 md:max-lg:self-center lg:pb-5.75 lg:text-left"
      >
        <motion.h1
          id="hero-title"
          variants={fadeUp()}
          className="text-3xl leading-10 font-medium text-blue-950 capitalize md:text-5xl md:leading-13"
        >
          A simple bookmark manager
        </motion.h1>
        <motion.p
          variants={fadeUp()}
          className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7"
        >
          A clean and simple interface to organize your favourite websites. Open
          a new browser tab and see your sites load instantly. Try it for free.
        </motion.p>
        <motion.div
          variants={fadeUp()}
          className="mt-4 flex flex-wrap items-center gap-3.5 *:flex-1 lg:mt-2 lg:*:flex-initial"
        >
          <DemoButton>Get it on Chrome</DemoButton>
          <DemoButton variant="secondary">Get it on Firefox</DemoButton>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}

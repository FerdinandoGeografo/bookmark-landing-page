import { useState } from "react";
import { motion } from "motion/react";
import { QUESTIONS } from "@/constants/questions";
import { fadeUp, staggerChildren } from "@/lib/motion/variants";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import DemoButton from "./DemoButton";
import HeadingBox from "./HeadingBox";
import Reveal from "./Reveal";

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <Reveal
      as="section"
      id="faq"
      aria-labelledby="faq-title"
      className="mb-30.75 flex flex-col items-center gap-12 px-8 md:mb-37.5 md:gap-13.5"
    >
      <HeadingBox
        titleId="faq-title"
        title="Frequently Asked Questions"
        description="Here are some of our FAQs. If you have any other questions you’d like answered please feel free to email us."
        titleClassName="mb-4.25 leading-7.5 md:mb-0 md:leading-13"
      />

      <Accordion
        value={openItems}
        onValueChange={setOpenItems}
        render={<motion.div variants={staggerChildren(0.06)} />}
        className="-mt-1 md:mt-0.5 md:max-w-135"
      >
        {QUESTIONS.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={id}
            render={<motion.div variants={fadeUp()} />}
          >
            <AccordionTrigger open={openItems.includes(id)}>
              {question}
            </AccordionTrigger>
            <AccordionContent open={openItems.includes(id)}>
              <p>{answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <motion.div variants={fadeUp()}>
        <DemoButton className="mt-0.5 px-5.5 md:mt-1.5">More Info</DemoButton>
      </motion.div>
    </Reveal>
  );
}

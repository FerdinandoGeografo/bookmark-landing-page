import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import * as m from "motion/react-m";
import { QUESTIONS } from "@/constants/questions";
import { fadeUp, staggerChildren } from "@/lib/motion";
import DemoButton from "./DemoButton";
import HeadingBox from "./HeadingBox";
import Reveal from "./Reveal";

export default function FaqSection() {
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
        render={<m.div variants={staggerChildren(0.06)} />}
        className="-mt-1 md:mt-0.5 md:max-w-135"
      >
        {QUESTIONS.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={id}
            render={<m.div variants={fadeUp} />}
          >
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>
              <p className="tracking-tight md:tracking-[.15px]">{answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <m.div variants={fadeUp}>
        <DemoButton className="mt-0.5 px-5.5 md:mt-1.5">More Info</DemoButton>
      </m.div>
    </Reveal>
  );
}

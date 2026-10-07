import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import { Button } from "@/ui/button";
import { QUESTIONS } from "@/constants/questions";
import HeadingBox from "./HeadingBox";

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="mb-30.75 flex flex-col items-center gap-12 px-8 md:mb-37.5 md:gap-13.5"
    >
      <HeadingBox
        titleId="faq-title"
        title="Frequently Asked Questions"
        description="Here are some of our FAQs. If you have any other questions you’d like answered please feel free to email us."
        titleClass="leading-7.5 tracking-wide"
      />

      <Accordion className="mt-4 md:mt-0.5 md:max-w-135">
        {QUESTIONS.map(({ question, answer }, index) => (
          <AccordionItem key={index} value={index}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>
              <p className="tracking-tight md:tracking-[.15px]">{answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button className="px-5.5">More info</Button>
    </section>
  );
}

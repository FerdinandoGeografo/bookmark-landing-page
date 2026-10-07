import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import { QUESTIONS } from "@/constants/questions";
import DemoButton from "./DemoButton";
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
        titleClassName="mb-4.25 leading-7.5 md:mb-0 md:leading-13"
      />

      <Accordion className="-mt-1 md:mt-0.5 md:max-w-135">
        {QUESTIONS.map(({ id, question, answer }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>
              <p className="tracking-tight md:tracking-[.15px]">{answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <DemoButton className="mt-0.5 px-5.5 md:mt-1.5">More Info</DemoButton>
    </section>
  );
}

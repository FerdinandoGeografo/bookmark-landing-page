import { useRef, useState, type SubmitEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedTransition } from "@/hooks/useReducedTransition";
import { demoDialog } from "@/lib/demo-dialog";
import { quickSpring, resize } from "@/lib/motion/transitions";
import { fadeUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Icon from "./Icon";
import Reveal from "./Reveal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEmailError(email: string) {
  if (!email) return "Whoops, make sure to enter your email";
  if (!EMAIL_PATTERN.test(email)) return "Whoops, make sure it’s an email";
  return null;
}

export default function NewsletterSection() {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageTransition = useReducedTransition(resize);
  const iconTransition = useReducedTransition(quickSpring);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const submitError = getEmailError(email);

    setError(submitError);
    if (submitError) {
      inputRef.current?.focus();
      return;
    }

    demoDialog.openWithPayload({ kind: "newsletter", email });
    form.reset();
  }

  function handleChange() {
    if (error) setError(null);
  }

  return (
    <Reveal
      as="section"
      id="contact"
      aria-labelledby="contact-title"
      className="flex min-h-90 flex-col gap-8 bg-blue-600 px-8 pt-15 pb-8 text-center text-white md:items-center md:gap-9 md:pt-14.5"
    >
      <motion.div
        variants={fadeUp()}
        className="flex flex-col md:max-w-110.5 md:gap-6"
      >
        <p className="text-eyebrow md:text-eyebrow-lg font-medium">
          35,000+ ALREADY JOINED
        </p>
        <h2
          id="contact-title"
          className="text-2xl leading-7 font-medium md:text-4xl md:leading-10"
        >
          Stay up-to-date with what we’re doing
        </h2>
      </motion.div>
      <motion.form
        variants={fadeUp()}
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:flex-row md:items-start"
      >
        <div className="flex flex-col md:w-75">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <Input
              ref={inputRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "email-error" : undefined}
              onChange={handleChange}
              className={cn(
                "transition-[border-color,border-radius]",
                error && "rounded-b-none pr-12",
              )}
            />
            <AnimatePresence initial={false}>
              {error && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={iconTransition}
                  className="pointer-events-none absolute top-1/2 right-3.5 flex -translate-y-1/2"
                >
                  <Icon name="error" className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div id="email-error" aria-live="polite">
            <AnimatePresence initial={false}>
              {error && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={messageTransition}
                  className="overflow-hidden"
                >
                  <p className="text-error rounded-b-sm bg-red-400 px-2.5 pt-0.5 pb-1 text-left font-medium italic">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <Button variant="accent" type="submit">
          Contact Us
        </Button>
      </motion.form>
    </Reveal>
  );
}

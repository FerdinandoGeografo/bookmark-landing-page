import { useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { demoDialog } from "@/lib/demo-dialog";
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

// Revealed on scroll: the heading group, then the form, rise into place.
export default function NewsletterSection() {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const submitError = getEmailError(email);

    setError(submitError);
    if (submitError) {
      inputRef.current?.focus();
      return;
    }

    // There is no backend: the notice says so instead of faking a sign-up.
    demoDialog.openWithPayload({ kind: "newsletter", email });
    form.reset();
  }

  // Validation runs on submit only: typing again just clears the error.
  function handleChange() {
    if (error) setError(null);
  }

  return (
    // As in the design, the section keeps its 360px height when the error
    // message appears: the message takes room from the bottom padding.
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
              className={cn(error && "rounded-b-none pr-12")}
            />
            {error && (
              <Icon
                name="error"
                className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2"
              />
            )}
          </div>
          <p
            id="email-error"
            aria-live="polite"
            className={cn(
              error &&
                "text-error rounded-b-sm bg-red-400 px-2.5 pt-0.5 pb-1 text-left font-medium italic",
            )}
          >
            {error}
          </p>
        </div>
        <Button variant="accent" type="submit">
          Contact Us
        </Button>
      </motion.form>
    </Reveal>
  );
}

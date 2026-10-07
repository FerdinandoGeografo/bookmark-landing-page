import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Feedback = { type: "error" | "success"; message: string } | null;

function getEmailError(value: string) {
  const email = value.trim();

  if (!email) return "Whoops, make sure to enter your email";
  if (!EMAIL_PATTERN.test(email)) return "Whoops, make sure it’s an email";
  return null;
}

export default function NewsletterSection() {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasError = feedback?.type === "error";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const error = getEmailError(String(new FormData(form).get("email") ?? ""));

    if (error) {
      setFeedback({ type: "error", message: error });
      inputRef.current?.focus();
      return;
    }

    setFeedback({
      type: "success",
      message: "Thanks for joining! We’ll keep you posted.",
    });
    form.reset();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!feedback) return;

    const error = getEmailError(event.target.value);
    setFeedback(hasError && error ? { type: "error", message: error } : null);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="flex flex-col gap-8 bg-blue-600 px-8 py-15 text-center text-white md:items-center md:gap-9 md:pt-14.5 md:pb-18.5"
    >
      <div className="flex flex-col md:max-w-110.5 md:gap-6">
        <p className="text-2xs leading-10 font-medium tracking-[5px] md:text-[13px]">
          35,000+ ALREADY JOINED
        </p>
        <h2
          id="contact-title"
          className="text-2xl leading-7 font-medium tracking-tight md:text-4xl md:leading-10"
        >
          Stay up-to-date with what we’re doing
        </h2>
      </div>
      <form
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
              aria-invalid={hasError || undefined}
              aria-describedby={feedback ? "email-feedback" : undefined}
              onChange={handleChange}
              className={cn(
                "text-blue-950",
                hasError && "rounded-b-none pr-12",
              )}
            />
            {hasError && (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2"
              >
                <use href="#error" />
              </svg>
            )}
          </div>
          <p
            id="email-feedback"
            aria-live="polite"
            className={cn(
              "text-left",
              hasError &&
                "rounded-b-sm bg-red-400 px-2.5 py-1.5 text-[10px] leading-4 tracking-[.25px] italic",
              feedback?.type === "success" && "pt-2 text-xs leading-5",
            )}
          >
            {feedback?.message}
          </p>
        </div>
        <Button variant="accent" type="submit">
          Contact Us
        </Button>
      </form>
    </section>
  );
}

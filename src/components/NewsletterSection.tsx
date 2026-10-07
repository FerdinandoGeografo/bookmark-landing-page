import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export default function NewsletterSection() {
  return (
    <section className="flex flex-col gap-8 bg-blue-600 px-8 py-15 text-center text-white md:items-center md:gap-9 md:pt-14.5 md:pb-18.5">
      <div className="flex flex-col md:max-w-110.5 md:gap-6">
        <p className="text-2xs leading-10 font-medium tracking-[5px] md:text-[13px]">
          35,000+ ALREADY JOINED
        </p>
        <h2 className="text-2xl leading-7 font-medium tracking-tight md:text-4xl md:leading-10">
          Stay up-to-date with what we’re doing
        </h2>
      </div>
      <form className="flex flex-col gap-4 md:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <Input
          className="md:w-75"
          id="email"
          type="email"
          placeholder="Enter your email address"
        />
        <Button variant="accent" type="submit">
          Contact Us
        </Button>
      </form>
    </section>
  );
}

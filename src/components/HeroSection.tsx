import { Button } from "@/ui/button";
import ImageDecoration from "./ImageDecoration";

export default function HeroSection() {
  return (
    <section className="mt-10 flex flex-col gap-23.5 px-8 md:flex-row md:items-end md:justify-center md:gap-16.25 md:pr-22.75 md:pl-41.25">
      <ImageDecoration className="after:top-[13.8vw] after:left-[10.4vw] md:order-1 md:after:top-[34%] md:after:left-[26.7%]">
        <img
          src="/images/illustration-hero.svg"
          alt=""
          aria-hidden="true"
          className="drop-shadow-2xl drop-shadow-blue-800/20"
        />
      </ImageDecoration>

      <div className="flex flex-col gap-4 text-center md:max-w-135 md:gap-6 md:pb-5.75 md:text-left">
        <h1 className="text-3xl leading-10 font-medium tracking-tight text-blue-950 capitalize md:text-5xl md:leading-13">
          A simple bookmark manager
        </h1>
        <p className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7">
          A clean and simple interface to organize your favourite websites. Open
          a new browser tab and see your sites load instantly. Try it for free.
        </p>
        <div className="mt-4 flex items-center gap-3.5 *:flex-1 md:mt-2 md:*:flex-initial">
          <Button>Get it on Chrome</Button>
          <Button variant="secondary">Get it on Firefox</Button>
        </div>
      </div>
    </section>
  );
}

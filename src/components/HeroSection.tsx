import DemoButton from "./DemoButton";
import ImageDecoration from "./ImageDecoration";

export default function HeroSection() {
  return (
    <section className="mt-10 flex flex-col gap-23.5 px-8 lg:flex-row lg:items-end lg:justify-center lg:gap-16.25 lg:pr-[min(100%*91/1440,91px)] lg:pl-[min(100%*165/1440,165px)]">
      <ImageDecoration
        bleed="right"
        aspectRatio={578 / 385}
        mobile={{ image: 311, top: 51.75, inset: 39 }}
        desktop={{ image: 578, top: 130.9, inset: 154.326 }}
        className="md:max-lg:self-center lg:order-1"
      >
        <img
          src="/images/illustration-hero.svg"
          alt=""
          className="drop-shadow-2xl drop-shadow-blue-800/20 lg:max-w-[calc(100vw*578/1440)]"
        />
      </ImageDecoration>

      <div className="flex flex-col gap-4 text-center md:max-w-135 md:gap-6 md:max-lg:self-center lg:pb-5.75 lg:text-left">
        <h1 className="text-3xl leading-10 font-medium tracking-tight text-blue-950 capitalize md:text-5xl md:leading-13">
          A simple bookmark manager
        </h1>
        <p className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7">
          A clean and simple interface to organize your favourite websites. Open
          a new browser tab and see your sites load instantly. Try it for free.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3.5 *:flex-1 lg:mt-2 lg:*:flex-initial">
          <DemoButton>Get it on Chrome</DemoButton>
          <DemoButton variant="secondary">Get it on Firefox</DemoButton>
        </div>
      </div>
    </section>
  );
}

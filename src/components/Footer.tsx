import { LINKS } from "@/constants/links";
import { fadeIn } from "@/lib/motion/variants";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Reveal from "./Reveal";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="flex bg-blue-950">
      <Reveal
        variants={fadeIn()}
        className="mx-auto flex max-w-360 flex-1 flex-col items-center gap-9.75 pt-10 pb-10.75 lg:grid lg:grid-cols-[auto_auto_1fr] lg:grid-rows-[--spacing(22)_auto] lg:gap-x-16.25 lg:gap-y-0 lg:px-41.25 lg:py-0"
      >
        <a
          href="#"
          aria-label="Bookmark home"
          className="-m-2 rounded-sm p-2 transition-colors duration-300 hover:bg-white/10"
        >
          <Logo />
        </a>

        <nav
          aria-label="Footer"
          className="flex flex-col items-center gap-8 lg:flex-row lg:gap-11"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              link={link}
              className="text-link-lg lg:text-link link-underline text-white uppercase transition-colors duration-300 hover:text-red-400"
            />
          ))}
        </nav>

        <p className="text-link-lg lg:text-link text-white/50 uppercase lg:col-span-full lg:row-start-2 lg:border-t lg:border-white/10 lg:py-6 lg:text-center">
          Coded by{" "}
          <a
            href="https://github.com/FerdinandoGeografo"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-white transition-colors duration-300 hover:text-red-400"
          >
            Ferdinando Geografo
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>

        <SocialLinks className="mt-2.25 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:justify-self-end" />
      </Reveal>
    </footer>
  );
}

import { LINKS } from "@/constants/links";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="flex bg-blue-950">
      <div className="mx-auto flex max-w-360 flex-1 flex-col items-center gap-9.75 pt-10 pb-10.75 md:flex-row md:gap-16.25 md:px-41.25 md:py-[31.5px]">
        <Logo />

        <nav
          aria-label="Footer"
          className="flex flex-col items-center gap-8 md:flex-row md:gap-11.5"
        >
          {LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs leading-4.25 tracking-widest text-white uppercase transition-colors duration-300 hover:text-red-400"
            >
              {link}
            </a>
          ))}
        </nav>

        <SocialLinks className="mt-2.25 md:mt-0 md:ml-auto" />
      </div>
    </footer>
  );
}

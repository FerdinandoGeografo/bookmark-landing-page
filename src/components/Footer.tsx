import { LINKS } from "@/constants/links";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="flex bg-blue-950">
      <div className="mx-auto flex max-w-360 flex-1 flex-col items-center gap-9.75 pt-10 pb-10.75 lg:flex-row lg:gap-16.25 lg:px-41.25 lg:py-[31.5px]">
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
            <a
              key={link}
              href="#"
              className="text-[15px] leading-4.25 tracking-[.12em] text-white uppercase transition-colors duration-300 hover:text-red-400 lg:text-[13px] lg:tracking-[.125em]"
            >
              {link}
            </a>
          ))}
        </nav>

        <SocialLinks className="mt-2.25 lg:mt-0 lg:ml-auto" />
      </div>
    </footer>
  );
}

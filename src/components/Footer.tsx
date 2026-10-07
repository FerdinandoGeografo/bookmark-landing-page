import { LINKS } from "@/constants/links";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex bg-blue-950">
      <div className="mx-auto flex max-w-360 flex-1 flex-col items-center gap-9.75 pt-10 pb-10.75 md:flex-row md:gap-16.25 md:px-41.25 md:py-[31.5px]">
        <Logo />

        <nav className="flex flex-col items-center gap-8 md:flex-row md:gap-11.5">
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

        <div className="mt-2.25 flex items-center gap-10 md:mt-0 md:ml-auto">
          <a
            aria-label="Visit us on Facebook!"
            href="#"
            className="group transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
          >
            <svg
              aria-hidden="true"
              className="size-6 text-white transition-colors duration-300 group-hover:text-red-400"
            >
              <use href="#facebook" />
            </svg>
          </a>
          <a
            aria-label="Visit us on Twitter"
            href="#"
            className="group transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
          >
            <svg
              className="h-5 w-6 text-white transition-colors duration-300 group-hover:text-red-400"
              aria-hidden="true"
            >
              <use href="#twitter" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

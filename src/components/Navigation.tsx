import { LINKS } from "@/constants/links";
import * as m from "motion/react-m";
import { fadeDown } from "@/lib/motion";
import DemoButton from "./DemoButton";

export default function Navigation() {
  return (
    <nav aria-label="Main" className="hidden lg:flex">
      <ul className="flex items-center gap-11.5">
        {LINKS.map((link) => (
          <m.li key={link} variants={fadeDown}>
            <a
              href="#"
              className="text-[13px] leading-4.25 tracking-[.125em] text-blue-950 uppercase transition-colors duration-300 hover:text-red-400"
            >
              {link}
            </a>
          </m.li>
        ))}
        <m.li variants={fadeDown}>
          <DemoButton
            variant="accent"
            size="sm"
            className="text-[13px] leading-4.25 tracking-[.125em] uppercase"
          >
            Login
          </DemoButton>
        </m.li>
      </ul>
    </nav>
  );
}

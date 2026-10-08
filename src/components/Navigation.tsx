import { motion } from "motion/react";
import { LINKS } from "@/constants/links";
import { fadeDown } from "@/lib/motion/variants";
import DemoButton from "./DemoButton";

// Each item drops in with the header entrance (see Header).
export default function Navigation() {
  return (
    <nav aria-label="Main" className="hidden lg:flex">
      <ul className="flex items-center gap-11.5">
        {LINKS.map((link) => (
          <motion.li key={link} variants={fadeDown()}>
            <a
              href="#"
              className="text-[13px] leading-4.25 tracking-[.125em] text-blue-950 uppercase transition-colors duration-300 hover:text-red-400"
            >
              {link}
            </a>
          </motion.li>
        ))}
        <motion.li variants={fadeDown()}>
          <DemoButton
            variant="accent"
            size="sm"
            className="text-[13px] leading-4.25 tracking-[.125em] uppercase"
          >
            Login
          </DemoButton>
        </motion.li>
      </ul>
    </nav>
  );
}

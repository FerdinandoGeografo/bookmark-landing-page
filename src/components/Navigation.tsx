import { motion } from "motion/react";
import { LINKS } from "@/constants/links";
import { fadeDown } from "@/lib/motion/variants";
import DemoButton from "./DemoButton";

export default function Navigation() {
  return (
    <nav aria-label="Main" className="hidden lg:flex">
      <ul className="flex items-center gap-11.5">
        {LINKS.map((link) => (
          <motion.li key={link} variants={fadeDown()}>
            <a
              href="#"
              className="text-link link-underline text-blue-950 uppercase transition-colors duration-300 hover:text-red-400"
            >
              {link}
            </a>
          </motion.li>
        ))}
        <motion.li variants={fadeDown()}>
          <DemoButton variant="accent" size="sm">
            Login
          </DemoButton>
        </motion.li>
      </ul>
    </nav>
  );
}

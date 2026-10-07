import { LINKS } from "@/constants/links";
import DemoButton from "./DemoButton";

export default function Navigation() {
  return (
    <nav aria-label="Main" className="hidden lg:flex">
      <ul className="flex items-center gap-11.5">
        {LINKS.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-xs leading-4.25 tracking-widest text-blue-950 uppercase transition-colors duration-300 hover:text-red-400"
            >
              {link}
            </a>
          </li>
        ))}
        <li>
          <DemoButton
            variant="accent"
            size="sm"
            className="leading-4.25 tracking-widest uppercase"
          >
            Login
          </DemoButton>
        </li>
      </ul>
    </nav>
  );
}

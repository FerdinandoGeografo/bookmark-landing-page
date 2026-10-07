import { LINKS } from "@/constants/links";
import { buttonVariants } from "@/ui/button-variants";
import { cn } from "@/lib/utils";

export default function Navigation() {
  return (
    <nav aria-label="Main" className="hidden md:flex">
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
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "accent", size: "sm" }),
              "leading-4.25 tracking-widest uppercase",
            )}
          >
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}

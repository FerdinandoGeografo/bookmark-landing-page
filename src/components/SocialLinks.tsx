import { SOCIALS } from "@/constants/socials";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-10", className)}>
      {SOCIALS.map(({ name, icon, iconClassName }) => (
        <li key={name} className="flex">
          <a
            aria-label={`Bookmark on ${name}`}
            href="#"
            className="group flex rounded-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-blue-950"
          >
            <svg
              aria-hidden="true"
              className={cn(
                "text-white transition-colors duration-300 group-hover:text-red-400",
                iconClassName,
              )}
            >
              <use href={`#${icon}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

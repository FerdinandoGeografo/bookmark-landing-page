import { LINKS } from "@/constants/links";

export default function Navigation() {
  return (
    <nav className="hidden md:flex">
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
        <a
          href="#"
          className="inline-flex h-10 items-center justify-center rounded-sm border-2 border-red-400 bg-red-400 px-7.5 text-xs leading-4.25 font-medium tracking-widest text-white uppercase shadow-md shadow-blue-500/20 transition-colors duration-300 outline-none hover:bg-white hover:text-red-400"
        >
          Login
        </a>
      </ul>
    </nav>
  );
}

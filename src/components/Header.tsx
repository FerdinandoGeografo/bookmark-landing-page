import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="mx-auto flex max-w-360 items-center justify-between px-8 py-10 md:pr-41.25 md:pl-42.75">
      <a
        href="#"
        aria-label="Bookmark home"
        className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400"
      >
        <Logo variant="dark" />
      </a>

      <Navigation />
    </header>
  );
}

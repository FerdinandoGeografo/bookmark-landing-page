import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white">
      <div className="mx-auto flex max-w-360 items-center justify-between px-8 py-10 lg:pr-41.25 lg:pl-42.75">
        <a
          href="#"
          aria-label="Bookmark home"
          className="-m-2 shrink-0 rounded-sm p-2 transition-colors duration-300 hover:bg-blue-950/5"
        >
          <Logo variant="dark" />
        </a>

        <Navigation />
        <MobileMenu />
      </div>
    </header>
  );
}

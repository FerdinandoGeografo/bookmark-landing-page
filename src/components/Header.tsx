import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white">
      <div className="mx-auto flex max-w-360 items-center justify-between px-8 py-10 md:pr-41.25 md:pl-42.75">
        <a href="#" aria-label="Bookmark home" className="shrink-0">
          <Logo variant="dark" />
        </a>

        <Navigation />
        <MobileMenu />
      </div>
    </header>
  );
}

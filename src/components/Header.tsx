import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="mx-auto flex max-w-360 items-center justify-between px-8 py-10 md:pr-41.25 md:pl-42.75">
      <Logo variant="dark" />

      <Navigation />
    </header>
  );
}

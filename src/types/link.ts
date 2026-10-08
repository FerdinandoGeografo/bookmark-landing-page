// A navigation entry: a section of this page, or a page the demo does not
// have (`href: null`), which opens the demo notice instead.
export type NavLink = {
  label: string;
  href: `#${string}` | null;
};

import type { Feature } from "@/types/feature";

export const FEATURES: Feature[] = [
  {
    id: "bookmarking",
    label: "Simple Bookmarking",
    image: "/images/illustration-features-tab-1.svg",
    title: "Bookmark in one click",
    description:
      "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
  },
  {
    id: "searching",
    label: "Speedy Searching",
    image: "/images/illustration-features-tab-2.svg",
    title: "Intelligent search",
    description:
      "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
  },
  {
    id: "sharing",
    label: "Easy Sharing",
    image: "/images/illustration-features-tab-3.svg",
    title: "Share your bookmarks",
    description:
      "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
  },
];

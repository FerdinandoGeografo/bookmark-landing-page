import type { Feature } from "@/types/feature";

export const FEATURES: Feature[] = [
  {
    id: "bookmarking",
    label: "Simple Bookmarking",
    image: {
      src: "/images/illustration-features-tab-1.svg",
      width: 536,
      height: 346,
      left: 0,
    },
    title: "Bookmark in one click",
    description:
      "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
  },
  {
    id: "searching",
    label: "Speedy Searching",
    image: {
      src: "/images/illustration-features-tab-2.svg",
      width: 478,
      height: 416,
      left: 77,
    },
    title: "Intelligent search",
    description:
      "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
  },
  {
    id: "sharing",
    label: "Easy Sharing",
    image: {
      src: "/images/illustration-features-tab-3.svg",
      width: 440,
      height: 380,
      left: 77,
    },
    title: "Share your bookmarks",
    description:
      "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
  },
];

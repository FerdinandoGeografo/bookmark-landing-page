import type { Browser } from "@/types/browser";

export const BROWSERS: Browser[] = [
  {
    logo: { src: "/images/logo-chrome.svg", width: 102, height: 100 },
    name: "Chrome",
    minVersion: 62,
  },
  {
    logo: { src: "/images/logo-firefox.svg", width: 105, height: 100 },
    name: "Firefox",
    minVersion: 55,
  },
  {
    logo: { src: "/images/logo-opera.svg", width: 96, height: 100 },
    name: "Opera",
    minVersion: 46,
  },
];

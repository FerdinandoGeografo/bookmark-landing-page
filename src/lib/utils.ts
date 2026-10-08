import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The text presets of src/index.css are font sizes: without this list,
// tailwind-merge would take `text-link` for a colour and drop `text-white`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["link", "link-lg", "menu", "card-title", "answer", "answer-lg", "eyebrow", "eyebrow-lg", "error"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

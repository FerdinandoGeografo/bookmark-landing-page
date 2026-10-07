# Frontend Mentor - Bookmark landing page solution

This is a solution to the [Bookmark landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bookmark-landing-page-5d0b588a9edda32581d29158). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Page behaviour](#page-behaviour)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the newsletter form is submitted if:
  - The input field is empty
  - The email address is not formatted correctly
- See focus states for all interactive elements and use the whole page with the keyboard

### Page behaviour

- The header stays pinned to the top and gains a soft shadow once the page scrolls; keyboard focus scrolls content into view below it.
- Below 1024px the navigation moves into a full-screen menu that traps focus, closes with Escape, returns focus to its button and closes by itself when the desktop layout kicks in.
- Arrow keys move between the feature tabs, and Enter or Space opens one. Every tab keeps the size of the largest illustration, so the page never jumps when switching.
- The FAQ keeps one answer open at a time, and its arrow turns when an answer opens.
- The newsletter validates on submit only: an empty or invalid email shows an error that screen readers announce, and editing the field clears it. A valid email resets the form; there is no backend.
- "Get it on…", "More Info", "Add & Install Extension" and Login open a notice explaining that the page is a demo. Navigation, footer and social links are placeholders that scroll back to the top, smoothly unless reduced motion is requested.

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties and `clamp()`
- Flexbox and CSS Grid
- Mobile-first workflow
- Self-hosted Rubik fonts, subset to Latin and served as `woff2`
- An inline SVG sprite with the icons provided by the challenge
- [React (v19)](https://react.dev/) - JS library, with the [React Compiler](https://react.dev/learn/react-compiler)
- [TypeScript](https://www.typescriptlang.org/) - JS superset, in strict mode
- [Vite](https://vite.dev/) - Frontend build tool
- [Tailwind CSS (v4)](https://tailwindcss.com/) - For styles, with the design tokens in `src/index.css`
- [Base UI](https://base-ui.com/) - Unstyled, accessible components (tabs, accordion, dialog)
- [shadcn/ui](https://ui.shadcn.com/) - Component primitives in the `base-nova` style, with [class-variance-authority](https://cva.style/) for variants

### What I learned

`src/components` holds the page sections and the pieces they share, while `src/ui` keeps the shadcn/ui primitives, restyled with the design's palette. Content lives in `src/constants` and its types in `src/types`, so components only map data.

#### One breakpoint for the layout

The design provides 375px and 1440px frames. Typography switches at `md` (768px), but the rows wait for `lg` (1024px): the three 280px browser cards and their gaps alone need 920px. Between 1024px and 1440px the hero gutters and the illustrations scale proportionally and stop at their 1440px values.

#### A decoration that scales with its image

Each illustration sits on a blue pill that leaves the viewport. Instead of a set of breakpoint classes, `ImageDecoration` interpolates every measurement between the two frames, using the image box width as the variable, and clamps it to the frame values:

```ts
function fluid(
  mobile,
  desktop,
  { image: from },
  { image: to },
  heightRatio = 1,
) {
  const slope = (desktop - mobile) / (to - from);
  const intercept = mobile - slope * from;
  return `clamp(${mobile}px, ${round(intercept)}px + ${round(slope * 100 * heightRatio)}%, ${desktop}px)`;
}
```

The results become custom properties on the box (`--pill-width`, `--pill-top`...), and an `::after` pseudo-element reads them, so the pill matches the design at 375px and 1440px and moves smoothly in between.

#### Tabs that never move the page

The three feature illustrations have different sizes. As in the design frames, every tab keeps the box of the first one: the other illustrations start at the same top and the taller ones overflow it downwards, while the text stays in place. All panels stay mounted and share one grid cell, so the descriptions, which wrap differently on small screens, cannot change the height either. Base UI marks the inactive panels as `inert`, which keeps them out of the tab order and away from screen readers:

```tsx
<div className="grid *:col-start-1 *:row-start-1">
  {FEATURES.map((feature) => (
    <TabsContent
      key={feature.id}
      value={feature.id}
      keepMounted
      hidden={false}
      className="data-hidden:invisible"
    >
      {/* ... */}
    </TabsContent>
  ))}
</div>
```

#### One dialog for every placeholder action

The calls to action have no real destination. A single dialog is rendered once, and a Base UI handle connects it to triggers anywhere on the page, so each trigger gets focus back when the notice closes:

```tsx
export const demoDialog = Dialog.createHandle();

export default function DemoButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <DialogTrigger handle={demoDialog} render={<Button {...props} />}>
      {children}
    </DialogTrigger>
  );
}
```

The mobile menu reuses the same dialog primitive. Its Login button closes the menu first and opens the notice once the closing has finished.

#### Small details

- With Tailwind CSS 4, `outline-none` sets the outline style to `none`, so `focus-visible:outline-2` alone shows nothing. Links get their focus outline from a base rule instead, and buttons use a ring.
- The header shadow reads the scroll position through `useSyncExternalStore`, which re-renders only when the page leaves or returns to the top.
- `overflow-x-clip` hides the decorations that leave the viewport without breaking the sticky header, as `overflow-x-hidden` would.

### Useful resources

- [Base UI Dialog](https://base-ui.com/react/components/dialog) - Detached triggers through `Dialog.createHandle()`.
- [Base UI Tabs](https://base-ui.com/react/components/tabs) - `keepMounted` panels and keyboard activation.
- [shadcn/ui for Base UI](https://ui.shadcn.com/docs/components) - The primitives behind `src/ui`.
- [Tailwind CSS v4](https://tailwindcss.com/docs/theme) - Theme variables and custom properties in arbitrary values.
- [CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) - The fluid measurements of the decorations.
- [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) - Subscribing to the scroll position.
- [ARIA Authoring Practices: Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) and [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) - The keyboard patterns of the features and the FAQ.

### AI Collaboration

I used Claude, through Claude Code, as a pair programmer for the review, the responsive layout and the accessibility polish, while keeping the decisions and the testing on my side.

- **Planning first**: the work started from a review of the existing code and a plan split into phases (interactions and accessibility, responsive layout, refactoring, assets), each closed with small commits I tested locally.
- **Reviews**: audits of keyboard navigation, focus states, the mobile menu and the newsletter feedback, plus hunts for unused styles and dependencies. Scripted browser runs, kept outside the repository, checked the layout and the interactions at several viewports before and after each change.
- **Context in local files**: an `AGENTS.md` with the working rules for any coding agent, and a list of the points still open for the next review.

## Author

- Frontend Mentor - [@FerdinandoGeografo](https://www.frontendmentor.io/profile/FerdinandoGeografo)
- LinkedIn - [@FerdinandoGeografo](https://www.linkedin.com/in/ferdinandogeografo/)
- GitHub - [@FerdinandoGeografo](https://github.com/FerdinandoGeografo/)

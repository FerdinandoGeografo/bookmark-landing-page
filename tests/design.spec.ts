/// <reference lib="dom" />
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { compareWithDesign } from "./compare-with-design.ts";

// PNG exports of the Figma frames at 1x. Like the rest of design/, they stay
// local: without them the comparisons are skipped.
const FRAMES_DIR = join(import.meta.dirname, "..", "design", "frames");

// Share of differing pixels tolerated: text rendering never matches the
// design exactly. Override it with DESIGN_MAX_MISMATCH=0.02.
const MAX_MISMATCH = Number(process.env.DESIGN_MAX_MISMATCH ?? 0.05);

interface Frame {
  file: string;
  width: number;
  // Fixed-size frames capture the viewport instead of the whole page.
  viewportHeight?: number;
  // The frame shows part of the page: find where it starts.
  locate?: boolean;
  setup?: (page: Page) => Promise<void>;
}

// The active states frames show the second answer open and an invalid email.
// The desktop frame also shows hover states, which the page cannot reproduce
// all at once.
async function showActiveStates(page: Page) {
  await page
    .getByRole("button", { name: "How can I request a new browser?" })
    .click();
  await page.getByLabel("Email address").fill("example@email/com");
  await page.getByRole("button", { name: "Contact Us" }).click();
  await page.getByText("Whoops, make sure it’s an email").waitFor();
  await page.getByLabel("Email address").blur();
}

function selectTab(name: string) {
  return async (page: Page) => {
    await page.getByRole("tab", { name }).click();
  };
}

async function openMenu(page: Page) {
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog", { name: "Menu" }).waitFor();
}

const FRAMES: Frame[] = [
  { file: "desktop.png", width: 1440 },
  { file: "mobile.png", width: 375 },
  {
    file: "desktop-active-states.png",
    width: 1440,
    setup: showActiveStates,
  },
  { file: "mobile-active-states.png", width: 375, setup: showActiveStates },
  { file: "mobile-menu.png", width: 375, viewportHeight: 667, setup: openMenu },
  {
    file: "desktop-features-tab-2.png",
    width: 1440,
    locate: true,
    setup: selectTab("Speedy Searching"),
  },
  {
    file: "desktop-features-tab-3.png",
    width: 1440,
    locate: true,
    setup: selectTab("Easy Sharing"),
  },
];

for (const frame of FRAMES) {
  test(frame.file, async ({ page }, testInfo) => {
    const designPath = join(FRAMES_DIR, frame.file);
    test.skip(!existsSync(designPath), `Missing ${designPath}`);

    await page.setViewportSize({
      width: frame.width,
      height: frame.viewportHeight ?? 900,
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await frame.setup?.(page);

    const screenshot = await page.screenshot({
      fullPage: !frame.viewportHeight,
      animations: "disabled",
      caret: "hide",
    });
    const result = compareWithDesign(readFileSync(designPath), screenshot, {
      locate: frame.locate,
    });

    await testInfo.attach("design", {
      path: designPath,
      contentType: "image/png",
    });
    await testInfo.attach("page", {
      body: screenshot,
      contentType: "image/png",
    });
    await testInfo.attach("diff", {
      body: result.diff,
      contentType: "image/png",
    });
    testInfo.annotations.push({
      type: "mismatch",
      description: `${(result.mismatch * 100).toFixed(2)}% of the pixels differ${
        frame.locate ? `, frame found at y=${result.offsetY}` : ""
      }${result.sizeDifference ? ` (${result.sizeDifference})` : ""}`,
    });

    expect(result.mismatch).toBeLessThanOrEqual(MAX_MISMATCH);
  });
}

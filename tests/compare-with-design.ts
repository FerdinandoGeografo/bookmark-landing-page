import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export interface DesignComparison {
  // Page offset where the design frame starts (0 unless it was located).
  offsetY: number;
  // Share of compared pixels that differ, from 0 to 1.
  mismatch: number;
  // Design and page sizes, when they do not match.
  sizeDifference: string | null;
  diff: Buffer;
}

interface Grayscale {
  width: number;
  height: number;
  data: Float32Array;
}

// Downscaled luminance, enough to find where a frame sits in the page.
function toGrayscale(image: PNG, scale: number): Grayscale {
  const width = Math.floor(image.width / scale);
  const height = Math.floor(image.height / scale);
  const data = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * scale * image.width + x * scale) * 4;
      data[y * width + x] =
        0.299 * image.data[i] +
        0.587 * image.data[i + 1] +
        0.114 * image.data[i + 2];
    }
  }

  return { width, height, data };
}

function distanceAt(frame: Grayscale, page: Grayscale, offsetY: number) {
  const width = Math.min(frame.width, page.width);
  let total = 0;

  for (let y = 0; y < frame.height; y++) {
    const frameRow = y * frame.width;
    const pageRow = (y + offsetY) * page.width;
    for (let x = 0; x < width; x++) {
      total += Math.abs(frame.data[frameRow + x] - page.data[pageRow + x]);
    }
  }

  return total;
}

function bestOffset(
  frame: Grayscale,
  page: Grayscale,
  from: number,
  to: number,
) {
  let best = from;
  let bestDistance = Infinity;

  for (let offsetY = from; offsetY <= to; offsetY++) {
    const distance = distanceAt(frame, page, offsetY);
    if (distance < bestDistance) {
      best = offsetY;
      bestDistance = distance;
    }
  }

  return best;
}

// Coarse search on images scaled down 4 times, then refined at full size.
function locateFrame(frame: PNG, page: PNG) {
  const scale = 4;
  const maxOffset = page.height - frame.height;
  const coarse =
    bestOffset(
      toGrayscale(frame, scale),
      toGrayscale(page, scale),
      0,
      Math.floor(maxOffset / scale),
    ) * scale;

  return bestOffset(
    toGrayscale(frame, 1),
    toGrayscale(page, 1),
    Math.max(0, coarse - scale),
    Math.min(maxOffset, coarse + scale),
  );
}

function crop(image: PNG, offsetY: number, width: number, height: number) {
  const data = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const start = (y + offsetY) * image.width * 4;
    image.data.copy(data, y * width * 4, start, start + width * 4);
  }

  return data;
}

export function compareWithDesign(
  designPng: Buffer,
  pagePng: Buffer,
  { locate = false } = {},
): DesignComparison {
  const design = PNG.sync.read(designPng);
  const page = PNG.sync.read(pagePng);
  const offsetY =
    locate && page.height > design.height ? locateFrame(design, page) : 0;
  const width = Math.min(design.width, page.width);
  const height = Math.min(design.height, page.height - offsetY);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(
    crop(design, 0, width, height),
    crop(page, offsetY, width, height),
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  );
  // A located frame is meant to cover only part of the page.
  const sameSize =
    design.width === page.width && (locate || design.height === page.height);

  return {
    offsetY,
    mismatch: mismatched / (width * height),
    sizeDifference: sameSize
      ? null
      : `design ${design.width}×${design.height}, page ${page.width}×${page.height}`,
    diff: PNG.sync.write(diff),
  };
}

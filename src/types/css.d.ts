import "react";

// Lets style objects set CSS custom properties without a cast, so the
// regular properties next to them keep their checks.
declare module "react" {
  interface CSSProperties {
    [property: `--${string}`]: string | number | undefined;
  }
}

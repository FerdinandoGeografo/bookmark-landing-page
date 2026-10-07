import { BROWSERS } from "@/constants/browsers";
import HeadingBox from "./HeadingBox";
import BrowserItem from "./BrowserItem";

export default function DownloadSection() {
  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="mt-19.25 mb-35 flex flex-col items-center gap-10 px-8 lg:mt-59.5 lg:mb-57.25 lg:gap-12"
    >
      <HeadingBox
        titleId="download-title"
        title="Download the extension"
        description="We’ve got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like us to prioritize."
      />

      <ul className="flex flex-col gap-10 lg:flex-row lg:items-start lg:[&>*:nth-child(2)]:translate-y-10 lg:[&>*:nth-child(3)]:translate-y-20">
        {BROWSERS.map((browser) => (
          <li key={browser.name}>
            <BrowserItem browser={browser} />
          </li>
        ))}
      </ul>
    </section>
  );
}

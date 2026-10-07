import { BROWSERS } from "@/constants/browsers";
import HeadingBox from "./HeadingBox";
import BrowserItem from "./BrowserItem";

export default function DownloadSection() {
  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="mt-19.25 mb-35 flex flex-col items-center gap-10 px-8 md:mt-59.5 md:mb-57.25 md:gap-12"
    >
      <HeadingBox
        titleId="download-title"
        title="Download the extension"
        description="We’ve got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like us to prioritize."
      />

      <ul className="flex flex-col gap-10 md:flex-row md:items-start md:[&>*:nth-child(2)]:translate-y-10 md:[&>*:nth-child(3)]:translate-y-20">
        {BROWSERS.map((browser) => (
          <li key={browser.name}>
            <BrowserItem browser={browser} />
          </li>
        ))}
      </ul>
    </section>
  );
}

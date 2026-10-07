import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { FEATURES } from "@/constants/features";
import DemoButton from "./DemoButton";
import HeadingBox from "./HeadingBox";
import ImageDecoration from "./ImageDecoration";

// As in the design frames, every tab keeps the box of the first illustration:
// the others start at the same top and the taller ones overflow it downwards,
// so switching tabs never moves the page.
const FRAME = FEATURES[0].image;

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="mt-35 flex flex-col items-center gap-10 px-8 md:mt-45 md:gap-10.25"
    >
      <HeadingBox
        titleId="features-title"
        title="Features"
        description="Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between your devices so you can access them on the go."
      />

      <Tabs defaultValue={FEATURES[0].id}>
        <TabsList>
          {FEATURES.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id}>
              {feature.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* All panels share one grid cell, so the section always keeps the
            height of the tallest tab. Inactive panels stay mounted but are
            invisible and inert (Base UI) instead of display: none. */}
        <div className="grid *:col-start-1 *:row-start-1">
          {FEATURES.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              keepMounted
              hidden={false}
              className="data-hidden:invisible"
            >
              <div className="flex flex-col items-center gap-17.25 md:gap-20 lg:flex-row lg:gap-31.25">
                <ImageDecoration
                  bleed="left"
                  aspectRatio={FRAME.width / FRAME.height}
                  mobile={{ image: 311, top: 34.875, inset: 34.875 }}
                  desktop={{ image: FRAME.width, top: 83, inset: 64.32 }}
                  className="min-h-0 w-full max-w-134 items-start lg:max-w-[min(100vw*536/1440,536px)]"
                >
                  <img
                    src={feature.image.src}
                    width={feature.image.width}
                    height={feature.image.height}
                    alt=""
                    className="h-auto shrink-0"
                    style={{
                      width: `${(feature.image.width / FRAME.width) * 100}%`,
                      marginLeft: `${(feature.image.left / FRAME.width) * 100}%`,
                    }}
                  />
                </ImageDecoration>

                <div className="flex flex-col items-center text-center md:max-w-111.25 md:gap-4 lg:items-start lg:text-left">
                  <h3 className="text-2xl leading-13 font-medium text-blue-950 md:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7">
                    {feature.description}
                  </p>
                  <DemoButton className="mt-3.75 px-5.5 md:mt-4">
                    More Info
                  </DemoButton>
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
}

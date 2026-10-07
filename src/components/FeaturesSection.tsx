import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Button } from "@/ui/button";
import { FEATURES } from "@/constants/features";
import HeadingBox from "./HeadingBox";
import ImageDecoration from "./ImageDecoration";

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

      <Tabs>
        <TabsList>
          {FEATURES.map((feature) => (
            <TabsTrigger key={feature.label} value={feature.label}>
              {feature.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {FEATURES.map((feature) => (
          <TabsContent key={feature.title} value={feature.label}>
            <div className="flex flex-col items-center gap-17.25 md:flex-row md:gap-31.25">
              <ImageDecoration className="after:top-[9.3vw] after:right-[9.3vw] md:after:top-[24%] md:after:right-[12%]">
                <img src={feature.image} alt="" aria-hidden="true" />
              </ImageDecoration>

              <div className="flex flex-col items-center text-center md:max-w-111.25 md:items-start md:gap-4 md:text-left">
                <h3 className="text-2xl leading-13 font-medium text-blue-950 md:text-4xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7">
                  {feature.description}
                </p>
                <Button className="mt-3.75 px-5.5 md:mt-4">More info</Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

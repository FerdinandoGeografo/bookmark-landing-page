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

      <Tabs defaultValue={FEATURES[0].id}>
        <TabsList>
          {FEATURES.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id}>
              {feature.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {FEATURES.map((feature) => (
          <TabsContent key={feature.id} value={feature.id}>
            <div className="flex flex-col items-center gap-17.25 lg:flex-row lg:gap-31.25">
              <ImageDecoration className="after:top-[9.3vw] after:right-[9.3vw] md:after:top-auto md:after:right-[12%] md:after:-bottom-10 lg:after:top-[24%] lg:after:bottom-auto">
                <img
                  src={feature.image}
                  alt=""
                  className="lg:max-w-[calc(100vw*536/1440)]"
                />
              </ImageDecoration>

              <div className="flex flex-col items-center text-center md:max-w-111.25 md:gap-4 lg:items-start lg:text-left">
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

import { cn } from "@/lib/utils";

interface HeadingBoxProps {
  title: string;
  description: string;
  titleClass?: string;
}

export default function HeadingBox({
  title,
  description,
  titleClass,
}: HeadingBoxProps) {
  return (
    <div className="flex max-w-135 flex-col text-center md:gap-4">
      <h2
        className={cn(
          `text-2xl leading-13 font-medium tracking-tight text-blue-950 md:text-4xl`,
          titleClass,
        )}
      >
        {title}
      </h2>
      <p className="text-sm leading-6.25 text-blue-950/50 md:text-lg md:leading-7">
        {description}
      </p>
    </div>
  );
}

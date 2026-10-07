export type Feature = {
  id: string;
  label: string;
  // left: offset from the start of the illustration box in the desktop frame.
  image: { src: string; width: number; height: number; left: number };
  title: string;
  description: string;
};

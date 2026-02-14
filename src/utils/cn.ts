import { twMerge } from "tailwind-merge";

export function cn(...classes: Array<undefined | null | string | boolean>) {
  return twMerge(
    classes
      .flat()
      .filter((x) => typeof x === "string")
      .join(" ")
      .trim()
  );
}

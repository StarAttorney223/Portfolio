import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatProjectNumber(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

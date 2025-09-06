import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';
export function cn(...classnames: ClassValue[]): string {
  return twMerge(clsx(classnames));
}

export function randomInt(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

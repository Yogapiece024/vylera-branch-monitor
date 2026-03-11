import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 * This is the standard utility for conditional tailwind classes in shadcn/ui and modern Next.js apps.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

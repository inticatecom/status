// Resources
import {twMerge} from "tailwind-merge";
import clsx from "clsx";

// Definitions
import {type ClassValue} from "clsx";

/**
 * Formats Tailwind classes.
 * @param inputs The classes.
 * @returns Thee formatted class.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
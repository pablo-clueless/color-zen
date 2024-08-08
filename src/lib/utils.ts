import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * @name getContrastColor
 * This function accepts a color and returns either black or white so that it has good contrast to the required color
 * @param color - The hexidecimal value of the color
 */
export const getContrastColor = (color: string) => {
	const hex = color.replace("#", "")

	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)

	const yiq = (r * 299 + g * 587 + b * 114) / 1000

	return yiq >= 128 ? "black" : "white"
}

/**
 * @name generateUid
 * This functions accepts a prefix and generates a unique ID
 * @param prefix - The prefix to be used in the ID
 * @example
 * const uid = generateUid("user")
 */
export const generateUid = (prefix?: string) => {
	const id = (Math.random() + 1).toString(36).substring(2)
	return `${prefix ? `${prefix}-` : ""}${id}`
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * @name getContrastColor
 *
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
 *
 * This functions accepts a prefix and generates a UUID
 * @example
 * const uid = generateUid()
 */
export const generateUid = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0
		const v = c === "x" ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

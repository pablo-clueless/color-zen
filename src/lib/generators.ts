import { hexToHsvForShade, hsvToRgb, rgbToHex } from "./converters"

export interface CreateGradientProps {
	colors: string[]
	positions: number[]
	rotation: number
	type: "linear" | "radial" | (string & {})
}

/**
 * @name generateGradient
 * This functions generates a gradient based on the provided parameters.
 * @param param - The parameters for creating the gradient.
 */
export const generateGradient = ({
	colors,
	positions,
	rotation,
	type,
}: CreateGradientProps) => {
	let gradient = ""
	if (type === "linear") {
		gradient = `${type}-gradient(${rotation}deg, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`
	} else {
		gradient = `${type}-gradient(${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`
	}
	return gradient
}

/**
 * @name generatePalette
 * @param number - The number of colors to generate.
 * @returns - An array of hex colors representing the palette.
 * @example
 * generatePalette(5)
 */
export const generatePalette = (number: number) => {
	const palette: string[] = []

	for (let i = 0; i < number; i++) {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)

		const hexColor = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
		palette.push(hexColor)
	}
	return palette
}

/**
 * @name generateShades
 * Generate shades for a given hex color.
 * @param hex - The hex color to generate shades for.
 * @param number - The number of shades to generate.
 * @returns An array of hex colors representing the shades.
 * @example
 * generateShades("#ff0000", 5)
 */
export const generateShades = (hex: string, number = 10) => {
	const hsv = hexToHsvForShade(hex)
	const shades: string[] = []

	for (let i = 0; i < number; i++) {
		const newV = hsv[2] - (i + 1) * (hsv[2] / number)
		const newColor = hsvToRgb([...hsv.slice(0, 2), newV])
		shades.push(rgbToHex(newColor))
	}

	return shades
}

/**
 * @name generateTints
 * Generate tints for a given hex color.
 * @param hex - The hex color to generate tints for.
 * @param number - The number of tints to generate.
 * @returns An array of hex colors representing the tints.
 * @example
 * generateTints("#ff0000", 5)
 */
export const generateTints = (hex: string, number = 10) => {
	const hsv = hexToHsvForShade(hex)
	const tints: string[] = []

	for (let i = 0; i < number; i++) {
		const newV = Math.min(1, hsv[2] + ((1 - hsv[2]) * i) / (number - 1))
		const newColor = hsvToRgb([hsv[0], hsv[1], newV])
		tints.push(rgbToHex(newColor))
	}

	return tints
}

/**
 * @name generateColor
 * Generate a random color in hex format.
 * @returns - A random color in hex format.
 * @example
 * generateColor() // #ff0000
 */
export const generateColor = () => {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)

	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
}

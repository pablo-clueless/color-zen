import { hexToHsvForShade, hsvToRgb, rgbToHex } from "./converters"

export const generateGradient = () => {}

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

// this function doesn't work as expected
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

export const generateExamplePalette = () => {
	const colors: string[] = []

	for (let i = 0; i < 4; i++) {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)

		const hexColor = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
		colors.push(hexColor)
	}

	return colors
}

export const generateColor = () => {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)

	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
}

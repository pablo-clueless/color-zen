import { hexToHsv, hsvToRgb, rgbToHex } from "./converters"

export const generateGradient = () => {}

export const generatePalette = (number: number) => {
	if (number < 1 || number > 20) {
		throw new Error("Number of colors must be between 1 and 20")
	}
	const palette: string[] = []

	for (let i = 0; i < number; i++) {
		const hue = Math.random() * 360
		const saturation = Math.random() * 50 + 50 // 50-100
		const lightness = Math.random() * 50 + 50 // 50-100

		const color = hsvToRgb([hue, saturation, lightness])
		palette.push(rgbToHex(color))
	}

	return palette
}

export const generateShades = (hex: string, number = 10) => {
	const hsv = hexToHsv(hex)
	const shades: string[] = []

	for (let i = 0; i < number; i++) {
		const newV = hsv[2] - (i + 1) * (hsv[2] / number)
		const newColor = hsvToRgb([...hsv.slice(0, 2), newV])
		shades.push(rgbToHex(newColor))
	}

	return shades
}

export const generateTints = (hex: string, number = 10) => {
	const hsv = hexToHsv(hex)
	const tints: string[] = []

	for (let i = 0; i < number; i++) {
		const newV = hsv[2] + ((i + 1) * (1 - hsv[2])) / number
		const newColor = hsvToRgb([...hsv.slice(0, 2), newV])
		tints.push(rgbToHex(newColor))
	}

	return tints
}

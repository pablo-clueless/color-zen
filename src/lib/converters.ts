export const hexToHsv = (hex: string) => {
	const r = parseInt(hex.slice(1, 3), 16) / 255
	const g = parseInt(hex.slice(3, 5), 16) / 255
	const b = parseInt(hex.slice(5, 7), 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const delta = max - min

	let h = 0
	let s = 0
	let v = max

	if (delta !== 0) {
		s = delta / max

		if (r === max) {
			h = (g - b) / delta
		} else if (g === max) {
			h = 2 + (b - r) / delta
		} else if (b === max) {
			h = 4 + (r - g) / delta
		}

		h *= 60
		if (h < 0) h += 360
	}

	return [h, s, v]
}

export const hexToRgb = (hex: string) => {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)

	return [r, g, b]
}

export const hsvToHex = (hsv: number[]) => {
	const h = hsv[0]
	const s = hsv[1]
	const v = hsv[2]

	const c = v * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = v - c
	let r = 0
	let g = 0
	let b = 0

	if (h >= 0 && h < 60) {
		r = c
		g = x
		b = 0
	} else if (h >= 60 && h < 120) {
		r = x
		g = c
		b = 0
	} else if (h >= 120 && h < 180) {
		r = 0
		g = c
		b = x
	} else if (h >= 180 && h < 240) {
		r = 0
		g = x
		b = c
	} else if (h >= 240 && h < 300) {
		r = x
		g = 0
		b = c
	} else if (h >= 300 && h < 360) {
		r = c
		g = 0
		b = x
	}
	r = Math.round((r + m) * 255)
	g = Math.round((g + m) * 255)
	b = Math.round((b + m) * 255)
	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

export const hsvToRgb = (hsv: number[]) => {
	const h = hsv[0]
	const s = hsv[1]
	const v = hsv[2]

	const c = v * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = v - c
	let r = 0
	let g = 0
	let b = 0

	if (h >= 0 && h < 60) {
		r = c
		g = x
		b = 0
	} else if (h >= 60 && h < 120) {
		r = x
		g = c
		b = 0
	} else if (h >= 120 && h < 180) {
		r = 0
		g = c
		b = x
	} else if (h >= 180 && h < 240) {
		r = 0
		g = x
		b = c
	} else if (h >= 240 && h < 300) {
		r = x
		g = 0
		b = c
	} else if (h >= 300 && h < 360) {
		r = c
		g = 0
		b = x
	}
	r = Math.round((r + m) * 255)
	g = Math.round((g + m) * 255)
	b = Math.round((b + m) * 255)

	return [r, g, b]
}

export const rgbToHex = (rgb: number[]) => {
	const r = rgb[0].toString(16).padStart(2, "0")
	const g = rgb[1].toString(16).padStart(2, "0")
	const b = rgb[2].toString(16).padStart(2, "0")

	return `#${r}${g}${b}`
}

export const rgbToHsv = (rgb: number[]) => {
	const r = rgb[0] / 255
	const g = rgb[1] / 255
	const b = rgb[2] / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const delta = max - min

	let h = 0
	let s = 0
	let v = max

	if (delta !== 0) {
		s = delta / max

		if (r === max) {
			h = (g - b) / delta
		} else if (g === max) {
			h = 2 + (b - r) / delta
		} else if (b === max) {
			h = 4 + (r - g) / delta
		}

		h *= 60
		if (h < 0) h += 360
	}

	return [h, s, v]
}

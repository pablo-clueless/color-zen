export type GradientProps = {
	__typename?: "Gradient"
	name?: string
	created: string
	id: string
	colors: string[]
	positions: number[]
	rotation: number
	type: "linear" | "radial"
}

export type PaletteProps = {
	__typename?: "Palette"
	name?: string
	created: string
	id: string
	palette: string[]
}

export type ShadeProps = {
	__typename?: "Shade"
	name?: string
	created: string
	color: string
	id: string
	shades: string[]
}

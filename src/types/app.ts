export type GradientProps = {
	__typename?: "Gradient"
	created: string
	id: string
}

export type PaletteProps = {
	__typename?: "Palette"
	created: string
	id: string
	palette: string[]
}

export type ShadeProps = {
	__typename?: "Shade"
	created: string
	color: string
	id: string
	shades: string[]
}

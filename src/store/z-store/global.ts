import { GradientProps, PaletteProps, ShadeProps } from "@/types"
import { createPersistMiddleware } from "../middleware"

interface GlobalStore {
	colors: string[]
	addColor: (color: string) => void
	removeColor: (color: string) => void

	gradients: GradientProps[]
	addGradient: (gradient: GradientProps) => void
	removeGradient: (id: string) => void

	palettes: PaletteProps[]
	addPalette: (palette: PaletteProps) => void
	removePalette: (id: string) => void

	shades: ShadeProps[]
	addShade: (shade: ShadeProps) => void
	removeShade: (id: string) => void
}

const initialState: GlobalStore = {
	colors: [],
	addColor: () => {},
	removeColor: () => {},

	gradients: [],
	addGradient: () => {},
	removeGradient: () => {},

	palettes: [],
	addPalette: () => {},
	removePalette: () => {},

	shades: [],
	addShade: () => {},
	removeShade: () => {},
}

const useGlobalStore = createPersistMiddleware<GlobalStore>(
	"color-zen-global",
	(set) => ({
		...initialState,
		addColor: (color) => set((state) => ({ colors: [...state.colors, color] })),
		removeColor: (color) =>
			set((state) => ({ colors: state.colors.filter((c) => c !== color) })),
		addGradient: (gradient) =>
			set((state) => ({
				gradients: [...state.gradients, gradient],
			})),
		removeGradient: (id) => {
			set((state) => ({
				gradients: state.gradients.filter((gradient) => gradient.id !== id),
			}))
		},
		addPalette: (palette) =>
			set((state) => ({
				palettes: [...state.palettes, palette],
			})),
		removePalette: (id) => {
			set((state) => ({
				palettes: state.palettes.filter((palette) => palette.id !== id),
			}))
		},
		addShade: (shade) =>
			set((state) => ({
				shades: [...state.shades, shade],
			})),
		removeShade: (id) => {
			set((state) => ({
				shades: state.shades.filter((shade) => shade.id !== id),
			}))
		},
	})
)

export { useGlobalStore }

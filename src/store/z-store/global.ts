import { createPersistMiddleware } from "../middleware"
import { PaletteProps } from "@/types"

interface GlobalStore {
	colors: string[]
	addColor: (color: string) => void
	removeColor: (color: string) => void

	palettes: PaletteProps[]
	addPalette: (palette: PaletteProps) => void
	removePalette: (id: string) => void
}

const initialState: GlobalStore = {
	colors: [],
	addColor: () => {},
	removeColor: () => {},

	palettes: [],
	addPalette: () => {},
	removePalette: () => {},
}

const useGlobalStore = createPersistMiddleware<GlobalStore>(
	"color-zen-global",
	(set) => ({
		...initialState,
		addColor: (color) => set((state) => ({ colors: [...state.colors, color] })),
		removeColor: (color) =>
			set((state) => ({ colors: state.colors.filter((c) => c !== color) })),
	})
)

export { useGlobalStore }

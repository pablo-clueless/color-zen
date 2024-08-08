import { toast } from "sonner"
import React from "react"

import { generateColor, generatePalette } from "@/lib"
import {
	Appbar,
	Button,
	Footer,
	PaletteCard,
	PaletteToolbar,
	Seo,
} from "@/components/shared"

export const Palettes = () => {
	const [palette, setPalette] = React.useState<string[]>([])
	const [count, setCount] = React.useState(5)

	const deleteColor = (color: string) => {
		if (count > 3) {
			setPalette(palette.filter((c) => c !== color))
			setCount(count - 1)
		} else {
			toast.error("Min allowed columns reached!")
		}
	}

	const increment = () => {
		if (count < 10) {
			setCount(count + 1)
			const color = generateColor()
			setPalette((prev) => [...prev, color])
		} else {
			toast.error("Max allowed columns reached!")
		}
	}

	const handleGenerate = () => {
		const newPalette = generatePalette(count)
		setPalette(newPalette)
	}

	React.useEffect(() => {
		handleGenerate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Seo title="Palette Generator" />
			<Appbar />
			<main className="container mx-auto">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Palette Generator
				</h1>
				<div className="flex w-full flex-col items-center gap-4 py-5 lg:py-10">
					<div className="flex w-full items-center justify-between">
						<Button onClick={handleGenerate} size="lg">
							Generate Palette
						</Button>
						<PaletteToolbar increment={increment} palette={palette} />
					</div>
					<div className="flex h-[75vh] w-full shadow-2xl">
						{palette.map((color, index) => (
							<PaletteCard key={index} color={color} deleteColor={deleteColor} />
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

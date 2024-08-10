import React from "react"

import { generateShades, generateTints } from "@/lib"
import { useDebounce } from "@/hooks"
import {
	Appbar,
	ColorPicker,
	Footer,
	Seo,
	ShadeCard,
} from "@/components/shared"

export const Shades = () => {
	const [shades, setShades] = React.useState<string[]>([])
	const [tints, setTints] = React.useState<string[]>([])
	const [color, setColor] = React.useState("ff9f1c")

	const _color = useDebounce(color, 500)

	React.useEffect(() => {
		setShades(generateShades(_color))
		setTints(generateTints(_color))
	}, [_color])

	return (
		<>
			<Seo title="Shade Generator" />
			<Appbar />
			<main className="container mx-auto px-4 lg:px-0">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Shade Generator
				</h1>
				<div className="flex w-full flex-col items-center gap-20 py-5 lg:py-10">
					<div className="relative flex w-[300px] items-center gap-4">
						<ColorPicker color={color} onColorChange={(color) => setColor(color)} />
					</div>
					<div className="flex w-full flex-col gap-2">
						<h4 className="text-2xl font-semibold lg:text-3xl">Shades</h4>
						<p className="text-lg">
							Shades refers refers to shades of a color as it&apos;s mixed with black.
						</p>
						<div className="grid w-full grid-cols-5 items-center lg:grid-cols-10">
							{shades.map((shade, index) => (
								<ShadeCard key={index} shade={shade} />
							))}
						</div>
					</div>
					<div className="flex w-full flex-col gap-2">
						<h4 className="text-2xl font-semibold lg:text-3xl">Tints</h4>
						<p className="text-lg">
							Tint refers refers to shades of a color as it&apos;s mixed with white.
						</p>
						<div className="grid w-full grid-cols-5 items-center lg:grid-cols-10">
							{tints.map((tint, index) => (
								<ShadeCard key={index} shade={tint} />
							))}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

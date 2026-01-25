import { motion, AnimatePresence } from "framer-motion"
import React from "react"

import { generateShades, generateTints } from "@/lib"
import { useDebounce } from "@/hooks"
import {
	Appbar,
	ColorPicker,
	Footer,
	Seo,
	ShadeCard,
	ShadeToolbar,
} from "@/components/shared"

export const Shades = () => {
	const [shades, setShades] = React.useState<string[]>([])
	const [tints, setTints] = React.useState<string[]>([])
	const [color, setColor] = React.useState("ff9f1c")

	const _color = useDebounce(color, 300)

	React.useEffect(() => {
		setShades(generateShades(_color))
		setTints(generateTints(_color))
	}, [_color])

	return (
		<>
			<Seo title="Shade Generator" />
			<Appbar />
			<main className="flex min-h-screen flex-col">
				<div className="container mx-auto flex-1 px-4 lg:px-0">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-8 text-center">
						<h1 className="mb-3 text-3xl font-bold text-secondary lg:text-4xl">
							Shade Generator
						</h1>
						<p className="text-neutral-500">
							Generate perfect shades and tints for any color
						</p>
					</motion.div>

					{/* Color Picker Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mx-auto mb-16 w-full max-w-sm">
						<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
							<div className="mb-4 flex items-center justify-between">
								<span className="text-sm font-medium text-neutral-600">
									Base Color
								</span>
								<div
									className="h-8 w-8 rounded-lg shadow-inner"
									style={{ backgroundColor: `#${color}` }}
								/>
							</div>
							<ColorPicker color={color} onColorChange={(c) => setColor(c)} />
						</div>
					</motion.div>

					{/* Shades Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mb-16">
						<div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h2 className="text-2xl font-bold text-secondary">Shades</h2>
								<p className="text-neutral-500">
									Color mixed with black for darker variations
								</p>
							</div>
							<ShadeToolbar color={color} shades={shades} />
						</div>

						<div className="overflow-hidden rounded-2xl shadow-lg">
							<div className="grid grid-cols-5 lg:grid-cols-10">
								<AnimatePresence mode="popLayout">
									{shades.map((shade, index) => (
										<motion.div
											key={`shade-${shade}-${index}`}
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{
												duration: 0.3,
												delay: index * 0.03,
											}}>
											<ShadeCard
												shade={shade}
												label={`${100 - index * 10}%`}
											/>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>

					{/* Tints Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="pb-20">
						<div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h2 className="text-2xl font-bold text-secondary">Tints</h2>
								<p className="text-neutral-500">
									Color mixed with white for lighter variations
								</p>
							</div>
							<ShadeToolbar color={color} shades={tints} />
						</div>

						<div className="overflow-hidden rounded-2xl shadow-lg">
							<div className="grid grid-cols-5 lg:grid-cols-10">
								<AnimatePresence mode="popLayout">
									{tints.map((tint, index) => (
										<motion.div
											key={`tint-${tint}-${index}`}
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{
												duration: 0.3,
												delay: index * 0.03,
											}}>
											<ShadeCard
												shade={tint}
												label={`${100 - index * 10}%`}
											/>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>
				</div>
			</main>
			<Footer />
		</>
	)
}

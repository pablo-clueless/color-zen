import { RiSparklingLine, RiKeyboardBoxLine } from "@remixicon/react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { generateColor, generatePalette } from "@/lib"
import { example_palettes } from "@/config"
import {
	Appbar,
	Button,
	Footer,
	PaletteCard,
	PaletteToolbar,
	PaletteUi,
	Seo,
} from "@/components/shared"

export const Palettes = () => {
	const [palette, setPalette] = React.useState<string[]>([])
	const [count, setCount] = React.useState(5)
	const [isGenerating, setIsGenerating] = React.useState(false)

	const deleteColor = (color: string) => {
		if (count > 3) {
			setPalette(palette.filter((c) => c !== color))
			setCount(count - 1)
		} else {
			toast.error("Minimum 3 colors required")
		}
	}

	const increment = () => {
		if (count < 10) {
			setCount(count + 1)
			const color = generateColor()
			setPalette((prev) => [...prev, color])
		} else {
			toast.error("Maximum 10 colors allowed")
		}
	}

	const handleGenerate = React.useCallback(() => {
		setIsGenerating(true)
		setTimeout(() => {
			const newPalette = generatePalette(count)
			setPalette(newPalette)
			setIsGenerating(false)
		}, 150)
	}, [count])

	// Keyboard shortcut
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Space" && !e.ctrlKey && !e.metaKey) {
				e.preventDefault()
				handleGenerate()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [handleGenerate])

	React.useEffect(() => {
		handleGenerate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Seo title="Palette Generator" />
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
							Palette Generator
						</h1>
						<p className="text-neutral-500">
							Create beautiful color combinations instantly
						</p>
					</motion.div>

					{/* Controls */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-3">
							<Button onClick={handleGenerate} size="lg" disabled={isGenerating}>
								<RiSparklingLine size={20} className={isGenerating ? "animate-spin" : ""} />
								Generate
							</Button>
							<div className="hidden items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-500 sm:flex">
								<RiKeyboardBoxLine size={16} />
								<span>Press</span>
								<kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-xs shadow-sm">
									Space
								</kbd>
							</div>
						</div>
						<PaletteToolbar increment={increment} palette={palette} />
					</motion.div>

					{/* Palette Display */}
					<motion.div
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="overflow-hidden rounded-2xl shadow-2xl">
						<div className="flex h-[60vh] min-h-[400px] w-full lg:h-[65vh]">
							<AnimatePresence mode="popLayout">
								{palette.map((color, index) => (
									<motion.div
										key={`${color}-${index}`}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className="h-full flex-1">
										<PaletteCard
											color={color}
											deleteColor={deleteColor}
											index={index}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</motion.div>

					{/* Example Palettes */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-20 pb-20">
						<h2 className="mb-8 text-center text-2xl font-bold text-secondary">
							Example Palettes
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{example_palettes.map((palette, index) => (
								<motion.div
									key={palette.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + index * 0.1 }}>
									<PaletteUi palette={palette} />
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</main>
			<Footer />
		</>
	)
}

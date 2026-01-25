import { RiSparklingLine, RiKeyboardBoxLine } from "@remixicon/react"
import { motion } from "framer-motion"
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

interface ColorItem {
	color: string
	locked: boolean
	id: string
}

export const Palettes = () => {
	const [colors, setColors] = React.useState<ColorItem[]>([])
	const [isGenerating, setIsGenerating] = React.useState(false)

	const deleteColor = (id: string) => {
		if (colors.length > 3) {
			setColors(colors.filter((c) => c.id !== id))
		} else {
			toast.error("Minimum 3 colors required")
		}
	}

	const toggleLock = (id: string) => {
		setColors(
			colors.map((c) =>
				c.id === id ? { ...c, locked: !c.locked } : c
			)
		)
		const item = colors.find((c) => c.id === id)
		toast.success(item?.locked ? "Color unlocked" : "Color locked")
	}

	const increment = () => {
		if (colors.length < 10) {
			const newColor: ColorItem = {
				color: generateColor(),
				locked: false,
				id: crypto.randomUUID(),
			}
			setColors([...colors, newColor])
		} else {
			toast.error("Maximum 10 colors allowed")
		}
	}

	const handleGenerate = React.useCallback(() => {
		setIsGenerating(true)
		setTimeout(() => {
			setColors((prev) =>
				prev.map((item) =>
					item.locked
						? item
						: { ...item, color: generateColor() }
				)
			)
			setIsGenerating(false)
		}, 150)
	}, [])

	const initPalette = React.useCallback(() => {
		const initialColors = generatePalette(5).map((color) => ({
			color,
			locked: false,
			id: crypto.randomUUID(),
		}))
		setColors(initialColors)
	}, [])

	// Keyboard shortcut
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Space" && !e.ctrlKey && !e.metaKey && e.target === document.body) {
				e.preventDefault()
				handleGenerate()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [handleGenerate])

	React.useEffect(() => {
		initPalette()
	}, [initPalette])

	const paletteColors = colors.map((c) => c.color)

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
						<PaletteToolbar increment={increment} palette={paletteColors} />
					</motion.div>

					{/* Palette Display */}
					<motion.div
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="overflow-hidden rounded-2xl shadow-2xl">
						<div className="flex h-[60vh] min-h-[400px] w-full lg:h-[65vh]">
							{colors.map((item, index) => (
								<div key={item.id} className="h-full flex-1">
									<PaletteCard
										color={item.color}
										locked={item.locked}
										onToggleLock={() => toggleLock(item.id)}
										deleteColor={() => deleteColor(item.id)}
										index={index}
									/>
								</div>
							))}
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

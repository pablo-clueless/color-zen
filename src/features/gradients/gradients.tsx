import {
	RiExpandDiagonalLine,
	RiExportLine,
	RiSparklingLine,
	RiFileCopyLine,
	RiCheckLine,
} from "@remixicon/react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { generateColor, generateGradient, generateUid } from "@/lib"
import { example_gradients } from "@/config"
import { GradientProps } from "@/types"
import {
	Appbar,
	Button,
	ColorPicker,
	Footer,
	GradientCard,
	GradientFull,
	Select,
	Seo,
	Share,
	Slider,
} from "@/components/shared"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const initialValues: GradientProps = {
	colors: ["#ff9f1c", "#87a878"],
	positions: [10, 90],
	rotation: 90,
	type: "linear",
	id: generateUid(),
	created: "",
}

export const Gradients = () => {
	const [gradientValues, setGradientValues] = React.useState(initialValues)
	const { colors, positions, rotation, type } = gradientValues
	const [activeColorPicker, setActiveColorPicker] = React.useState<number | null>(null)
	const [gradient, setGradient] = React.useState("")
	const [copied, setCopied] = React.useState(false)
	const colorPickerRef = React.useRef<HTMLDivElement>(null)

	const [fullScreen, setFullScreen] = React.useState<string | null>(null)

	const copy = () => {
		navigator.clipboard.writeText(gradient)
		setCopied(true)
		toast.success("CSS copied!")
		setTimeout(() => setCopied(false), 2000)
	}

	const handleFullScreen = (gradient: string) => {
		setFullScreen(fullScreen === gradient ? null : gradient)
	}

	const handleClickOutside = React.useCallback(
		(e: MouseEvent) => {
			if (
				activeColorPicker !== null &&
				colorPickerRef.current &&
				!colorPickerRef.current.contains(e.target as Node)
			) {
				setActiveColorPicker(null)
			}
		},
		[activeColorPicker]
	)

	const random = () => {
		const newColors = [generateColor(), generateColor()]
		const newRotation = Math.floor(Math.random() * 360)
		setGradientValues({
			colors: newColors,
			positions: [25, 75],
			rotation: newRotation,
			type: "linear",
			id: generateUid(),
			created: new Date().toISOString(),
		})
	}

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [handleClickOutside])

	React.useEffect(() => {
		setGradient(generateGradient(gradientValues))
	}, [gradientValues])

	return (
		<>
			<AnimatePresence>
				{fullScreen && (
					<GradientFull gradient={fullScreen} onClose={() => setFullScreen(null)} />
				)}
			</AnimatePresence>

			<Seo title="Gradient Generator" />
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
							Gradient Generator
						</h1>
						<p className="text-neutral-500">
							Design beautiful gradients for your projects
						</p>
					</motion.div>

					{/* Main Content */}
					<div className="grid gap-8 lg:grid-cols-5">
						{/* Gradient Preview */}
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="lg:col-span-3">
							<motion.div
								animate={{ background: gradient }}
								transition={{ duration: 0.4 }}
								className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl shadow-2xl lg:aspect-[4/3]">
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={() => handleFullScreen(gradient)}
									className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 group-hover:opacity-100">
									<RiExpandDiagonalLine size={20} />
								</motion.button>

								{/* CSS Preview */}
								<div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/30 p-4 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
									<code className="block truncate font-mono text-xs text-white/90">
										background: {gradient};
									</code>
								</div>
							</motion.div>
						</motion.div>

						{/* Controls */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="lg:col-span-2">
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
								<h3 className="mb-6 text-lg font-semibold text-secondary">
									Customize
								</h3>

								<div className="space-y-6">
									{/* Color Pickers */}
									<div className="grid grid-cols-2 gap-4">
										{colors.map((color, index) => (
											<div key={index} className="relative">
												<label className="mb-2 block text-sm font-medium text-neutral-600">
													Color {index + 1}
												</label>
												<button
													onClick={() =>
														setActiveColorPicker(
															activeColorPicker === index ? null : index
														)
													}
													className="flex h-12 w-full items-center gap-3 rounded-xl border border-neutral-200 px-3 transition-all hover:border-primary">
													<div
														className="h-6 w-6 rounded-lg shadow-inner"
														style={{ backgroundColor: color }}
													/>
													<span className="font-mono text-sm uppercase text-neutral-600">
														{color}
													</span>
												</button>

												<AnimatePresence>
													{activeColorPicker === index && (
														<motion.div
															ref={colorPickerRef}
															initial={{ opacity: 0, y: -10 }}
															animate={{ opacity: 1, y: 0 }}
															exit={{ opacity: 0, y: -10 }}
															transition={{ duration: 0.2 }}
															className="absolute left-0 top-full z-50 mt-2">
															<ColorPicker
																color={color}
																onColorChange={(newColor) => {
																	const newColors = [...colors]
																	newColors[index] = newColor
																	setGradientValues({
																		...gradientValues,
																		colors: newColors,
																	})
																}}
															/>
														</motion.div>
													)}
												</AnimatePresence>
											</div>
										))}
									</div>

									{/* Sliders */}
									<Slider
										label="Position 1"
										name="position_1"
										max={100}
										min={0}
										onChange={(position) =>
											setGradientValues({
												...gradientValues,
												positions: [position, positions[1]],
											})
										}
										value={positions[0]}
										metric="%"
									/>

									<Slider
										label="Position 2"
										name="position_2"
										max={100}
										min={0}
										onChange={(position) =>
											setGradientValues({
												...gradientValues,
												positions: [positions[0], position],
											})
										}
										value={positions[1]}
										metric="%"
									/>

									<Slider
										label="Rotation"
										name="rotation"
										max={360}
										min={0}
										onChange={(newRotation) =>
											setGradientValues({
												...gradientValues,
												rotation: newRotation,
											})
										}
										value={rotation}
										metric="°"
									/>

									{/* Type Select */}
									<Select
										label="Type"
										value={type}
										onChange={(e) =>
											setGradientValues({
												...gradientValues,
												type: e.target.value,
											})
										}
										className="h-12 w-full rounded-xl border-neutral-200 font-medium capitalize"
										options={[
											{ label: "Linear", value: "linear" },
											{ label: "Radial", value: "radial" },
										]}
									/>

									{/* Action Buttons */}
									<div className="grid grid-cols-2 gap-3 pt-2">
										<Button onClick={random} variant="outline" className="h-12">
											<RiSparklingLine size={18} />
											Random
										</Button>
										<Button onClick={copy} className="h-12">
											{copied ? (
												<RiCheckLine size={18} />
											) : (
												<RiFileCopyLine size={18} />
											)}
											{copied ? "Copied!" : "Copy CSS"}
										</Button>
									</div>

									{/* Export Button */}
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="ghost" className="h-12 w-full">
												<RiExportLine size={18} />
												Export & Share
											</Button>
										</DialogTrigger>
										<DialogContent className="w-[360px] rounded-2xl border-none p-6 shadow-2xl">
											<DialogTitle className="text-xl font-semibold">
												Export Gradient
											</DialogTitle>
											<DialogDescription hidden aria-hidden>
												Export your gradient
											</DialogDescription>
											<Share id={gradientValues.id} />
										</DialogContent>
									</Dialog>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Example Gradients */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-20 pb-20">
						<h2 className="mb-8 text-center text-2xl font-bold text-secondary">
							Example Gradients
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{example_gradients.map((grad, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + index * 0.1 }}>
									<GradientCard gradient={grad} />
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

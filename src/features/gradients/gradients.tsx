import { RiExpandDiagonalLine, RiExportLine } from "@remixicon/react"
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
	Input,
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
	const [open, setOpen] = React.useState<number | null>(null)
	const [gradient, setGradient] = React.useState("")
	const ref = React.useRef<HTMLDivElement>(null)!

	const [fullScreen, setFullScreen] = React.useState<string | null>(null)

	const copy = (value: string) => {
		navigator.clipboard.writeText(value)
		toast.success("Copied to clipboard")
	}

	const handleFullScreen = (gradient: string) => {
		if (fullScreen) {
			if (gradient === fullScreen) {
				setFullScreen(null)
			} else {
				setFullScreen(gradient)
			}
		} else {
			setFullScreen(gradient)
		}
	}

	const handleClickOutside = (e: MouseEvent) => {
		if (open) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(null)
			}
		}
	}

	const random = () => {
		const colors = [generateColor(), generateColor()]
		const positions = [25, 75]
		const rotation = Math.floor(Math.random() * 360)
		setGradientValues({
			colors,
			positions,
			rotation,
			type: "linear",
			id: generateUid(),
			created: new Date().toISOString(),
		})
	}

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	})

	React.useEffect(() => {
		setGradient(generateGradient(gradientValues))
	}, [gradientValues])

	return (
		<>
			{fullScreen && (
				<GradientFull gradient={fullScreen} onClose={() => setFullScreen(null)} />
			)}
			<Seo title="Gradient Generator" />
			<Appbar />
			<main className="container mx-auto px-4 lg:px-0">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Gradient Generator
				</h1>
				<div className="flex w-full flex-col items-center gap-20 py-5 lg:py-10">
					<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
						<div
							className="group relative aspect-square w-full rounded-xl"
							style={{ background: gradient }}>
							<button
								onClick={() => handleFullScreen(gradient)}
								className="absolute right-4 top-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
								<RiExpandDiagonalLine size={24} />
							</button>
						</div>
						<div className="flex aspect-square w-full flex-col gap-5 rounded-md border border-gray-700 px-4 py-8">
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
								onChange={(rotation) =>
									setGradientValues({
										...gradientValues,
										rotation,
									})
								}
								value={rotation}
								metric="°"
							/>
							<div className="grid w-full grid-cols-2 gap-4">
								{[...Array(2)].map((_, index) => (
									<div key={index} className="relative w-full">
										<Input
											label={`Color ${index + 1}`}
											defaultValue={colors[index]}
											onFocus={() => setOpen(index)}
											className="font-medium uppercase"
										/>
										{open === index && (
											<div ref={ref} className="absolute left-0 top-16">
												<ColorPicker
													color={colors[index]}
													onColorChange={(color) => {
														const newColors = [...colors]
														newColors[index] = color
														setGradientValues({
															...gradientValues,
															colors: newColors,
														})
													}}
												/>
											</div>
										)}
									</div>
								))}
							</div>
							<div className="grid w-full grid-cols-2 gap-4">
								<Select
									label="Type"
									value={type}
									onChange={(e) =>
										setGradientValues({ ...gradientValues, type: e.target.value })
									}
									className="h-10 w-full font-medium capitalize"
									options={[
										{ label: "linear", value: "linear" },
										{ label: "radial", value: "radial" },
									]}
								/>
							</div>
							<div className="grid w-full grid-cols-2 gap-4">
								<Button onClick={random} variant="outline">
									Random
								</Button>
								<div className="flex items-center gap-1">
									<Button className="flex-1" onClick={() => copy(gradient)}>
										Copy CSS
									</Button>
									<Dialog>
										<DialogTrigger asChild>
											<Button className="w-fit">
												<RiExportLine />
											</Button>
										</DialogTrigger>
										<DialogContent className="aspect-square w-[400px]">
											<DialogTitle>Export Palette</DialogTitle>
											<DialogDescription hidden aria-hidden>
												Export your palette to a file.
											</DialogDescription>
											<Share id={gradientValues.id} />
										</DialogContent>
									</Dialog>
								</div>
							</div>
						</div>
					</div>
					<div className="flex w-full flex-col items-center gap-6">
						<h4 className="text-xl lg:text-2xl">Example Gradients</h4>
						<div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
							{example_gradients.map((gradient, index) => (
								<GradientCard key={index} gradient={gradient} />
							))}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

import { RiExportLine } from "@remixicon/react"
import React from "react"

import { generateColor, generateGradient, generateUid } from "@/lib"
import { example_gradients } from "@/config"
import { GradientProps } from "@/types"
import {
	Appbar,
	Button,
	Footer,
	GradientCard,
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
	const [gradient, setGradient] = React.useState("")
	const [current, setCurrent] = React.useState(0)

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
		setGradient(generateGradient(gradientValues))
	}, [gradientValues])

	return (
		<>
			<Seo title="Gradient Generator" />
			<Appbar />
			<main className="container mx-auto px-4 lg:px-0">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Gradient Generator
				</h1>
				<div className="flex w-full flex-col items-center gap-20 py-5 lg:py-10">
					<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
						<div
							className="aspect-square w-full rounded-md"
							style={{ background: gradient }}></div>
						<div className="flex aspect-square w-full flex-col gap-5 rounded-md border border-gray-700 px-4 py-8">
							<Slider
								max={100}
								min={0}
								onChange={(position) =>
									setGradientValues({
										...gradientValues,
										positions: [position, positions[1]],
									})
								}
								value={positions[0]}
								onClick={() => setCurrent(0)}
							/>
							<Slider
								max={100}
								min={0}
								onChange={(position) =>
									setGradientValues({
										...gradientValues,
										positions: [positions[0], position],
									})
								}
								value={positions[1]}
								onClick={() => setCurrent(1)}
							/>
							<div className="grid w-full grid-cols-2 gap-4">
								<Input
									label="Color"
									value={colors[current]}
									onChange={(e) => {
										const newColors = [...colors]
										newColors[current] = e.target.value
										setGradientValues({ ...gradientValues, colors: newColors })
									}}
									className="font-medium uppercase"
									readOnly
								/>
								<Input
									label="Position"
									value={`${positions[current]}%`}
									className="font-medium"
									readOnly
								/>
							</div>
							<div className="grid w-full grid-cols-2 gap-4">
								<Input
									label="Rotation"
									value={`${rotation}deg`}
									onChange={(e) =>
										setGradientValues({
											...gradientValues,
											rotation: Number(e.target.value),
										})
									}
									readOnly
									className="font-medium"
								/>
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
									<Button className="flex-1">Copy CSS</Button>
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
					<div className="grid w-full grid-cols-3 gap-6">
						{example_gradients.map((gradient, index) => (
							<GradientCard key={index} gradient={gradient} />
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

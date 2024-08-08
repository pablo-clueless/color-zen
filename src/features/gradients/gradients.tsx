import React from "react"

import { generateColor, generateGradient } from "@/lib"
import { example_gradients } from "@/config"
import {
	Appbar,
	Button,
	Footer,
	GradientCard,
	Input,
	Select,
	Seo,
	Slider,
} from "@/components/shared"

const initialValues = {
	colors: ["#ff9f1c", "#87a878"],
	positions: [40, 60],
	rotation: 90,
	type: "linear",
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
		})
	}

	React.useEffect(() => {
		setGradient(generateGradient(gradientValues))
	}, [gradientValues])

	return (
		<>
			<Seo title="Gradient Generator" />
			<Appbar />
			<main className="container mx-auto px-4">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Gradient Generator
				</h1>
				<div className="flex w-full flex-col items-center gap-20 py-5 lg:py-10">
					<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
						<div
							className="aspect-square w-full"
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
								<Button>Copy CSS</Button>
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

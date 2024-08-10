import { PhotoshopPicker, SketchPicker } from "react-color"
import React from "react"

interface Props {
	color: string
	onColorChange: (color: string) => void
	type?: "photoshop" | "sketch"
}

export const ColorPicker = ({
	color,
	onColorChange,
	type = "sketch",
}: Props) => {
	if (type === "photoshop") {
		return (
			<div className="w-full">
				<PhotoshopPicker
					color={color}
					onChange={(color) => onColorChange(color.hex)}
				/>
			</div>
		)
	}

	return (
		<div className="w-full">
			<SketchPicker
				color={color}
				disableAlpha
				onChange={(color) => onColorChange(color.hex)}
			/>
		</div>
	)
}

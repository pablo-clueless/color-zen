import { SketchPicker } from "react-color"
import React from "react"

interface Props {
	color: string
	onColorChange: (color: string) => void
}

export const ColorPicker = ({ color, onColorChange }: Props) => {
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

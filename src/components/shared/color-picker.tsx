import { SketchPicker } from "react-color"
import React from "react"

interface Props {
	color: string
	onColorChange: (color: string) => void
}

export const ColorPicker = ({ color, onColorChange }: Props) => {
	return (
		<div className="color-picker-wrapper w-full">
			<SketchPicker
				color={color.startsWith("#") ? color : `#${color}`}
				disableAlpha
				onChange={(newColor) => onColorChange(newColor.hex)}
				presetColors={[
					"#FF6B6B",
					"#4ECDC4",
					"#45B7D1",
					"#96CEB4",
					"#FFEAA7",
					"#DDA0DD",
					"#98D8C8",
					"#F7DC6F",
					"#BB8FCE",
					"#85C1E9",
					"#F8B500",
					"#FF9F1C",
				]}
				styles={{
					default: {
						picker: {
							boxShadow: "none",
							borderRadius: "12px",
							border: "1px solid #e5e5e5",
							padding: "12px",
						},
					},
				}}
			/>
		</div>
	)
}

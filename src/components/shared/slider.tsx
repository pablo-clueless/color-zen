import React from "react"

interface Props {
	max: number
	min: number
	onChange: (value: number) => void
	onClick: () => void
	value: number
}

export const Slider = ({ max, min, onChange, onClick, value }: Props) => {
	return (
		<div className="my-2 flex w-full">
			<input
				type="range"
				max={max}
				min={min}
				onChange={(e) => onChange(Number(e.target.value))}
				onClick={onClick}
				value={value}
				step={1}
			/>
		</div>
	)
}

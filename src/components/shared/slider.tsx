import React from "react"

interface Props {
	max: number
	min: number
	onChange: (value: number) => void
	value: number
	label?: string
	metric?: string
	name?: string
}

export const Slider = ({
	max,
	min,
	onChange,
	value,
	label,
	metric,
	name,
}: Props) => {
	return (
		<div className="flex w-full flex-col">
			<div className="flex w-full items-center justify-between">
				{label && (
					<label htmlFor={name} className="mb-1 text-sm font-semibold">
						{label}
					</label>
				)}
				<span className="text-sm font-semibold text-gray-700">
					{value}
					{metric}
				</span>
			</div>
			<div className="flex w-full">
				<input
					type="range"
					name={name}
					max={max}
					min={min}
					onChange={(e) => onChange(Number(e.target.value))}
					value={value}
					step={1}
				/>
			</div>
		</div>
	)
}

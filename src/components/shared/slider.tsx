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
	const percentage = ((value - min) / (max - min)) * 100

	return (
		<div className="flex w-full flex-col gap-2">
			<div className="flex w-full items-center justify-between">
				{label && (
					<label htmlFor={name} className="text-sm font-medium text-neutral-600">
						{label}
					</label>
				)}
				<span className="rounded-lg bg-neutral-100 px-2 py-1 font-mono text-xs font-semibold text-neutral-700">
					{value}
					{metric}
				</span>
			</div>
			<div className="relative flex w-full items-center">
				<div className="absolute h-1.5 w-full rounded-full bg-neutral-200" />
				<div
					className="absolute h-1.5 rounded-full bg-primary"
					style={{ width: `${percentage}%` }}
				/>
				<input
					type="range"
					name={name}
					max={max}
					min={min}
					onChange={(e) => onChange(Number(e.target.value))}
					value={value}
					step={1}
					className="relative z-10 h-1.5 w-full cursor-pointer appearance-none bg-transparent"
				/>
			</div>
		</div>
	)
}

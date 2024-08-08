import React from "react"

import { cn } from "@/lib"

export interface SelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	error?: string
	label?: string
	options: {
		label: string
		value: string
	}[]
	wrapper?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ error, className, id, label, name, options, wrapper, ...props }, ref) => {
		return (
			<div className={cn("flex w-full flex-col", wrapper)}>
				{label && (
					<label htmlFor={name ?? id} className="mb-1 text-sm font-semibold">
						{label}
					</label>
				)}
				<select
					className={cn(
						"flex h-10 w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}>
					{options.map((option, index) => (
						<option key={index} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{error && <p className="text-[10px] text-red-500">{error}</p>}
			</div>
		)
	}
)

Select.displayName = "Select"

export { Select }

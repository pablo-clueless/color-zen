import React from "react"

interface Props {
	id: string
}

export const Share = ({}: Props) => {
	return (
		<div className="grid w-full grid-cols-3 gap-4">
			{[...Array(9)].map((_, index) => (
				<div
					key={index}
					className="grid aspect-square w-full place-items-center rounded-md border"></div>
			))}
		</div>
	)
}

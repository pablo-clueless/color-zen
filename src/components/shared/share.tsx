import React from "react"

import { export_options } from "@/config"

interface Props {
	id: string
}

export const Share = ({ id }: Props) => {
	return (
		<div className="grid w-full grid-cols-3 gap-4">
			{export_options(id).map((option, index) => (
				<div
					key={index}
					className="grid aspect-square w-full place-items-center rounded-md border">
					<button>
						<option.icon size={28} />
					</button>
				</div>
			))}
		</div>
	)
}

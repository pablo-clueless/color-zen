import { RiFileCopyLine } from "@remixicon/react"
import { toast } from "sonner"
import React from "react"

import { getContrastColor } from "@/lib"

interface Props {
	shade: string
}

export const ShadeCard = ({ shade }: Props) => {
	const copy = (value: string) => {
		navigator.clipboard.writeText(value)
		toast.success("Copied to clipboard")
	}
	return (
		<div
			key={shade}
			className="group grid aspect-[2/3] w-full flex-1 place-items-center"
			style={{ backgroundColor: shade }}>
			<p
				style={{ color: getContrastColor(shade) }}
				className="flex flex-col items-center text-center text-sm font-semibold uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				{shade}
				<span className="cursor-pointer" onClick={() => copy(shade)}>
					<RiFileCopyLine size={18} />
				</span>
			</p>
		</div>
	)
}

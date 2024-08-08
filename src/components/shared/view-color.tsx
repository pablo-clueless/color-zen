import { RiFileCopyLine } from "@remixicon/react"
import { toast } from "sonner"
import React from "react"

import { getContrastColor, generateShades, hexToHsv, hexToRgb } from "@/lib"

interface Props {
	color: string
}

export const ViewColor = ({ color }: Props) => {
	const [shades, setShades] = React.useState<string[]>([])

	const copy = (value: string) => {
		navigator.clipboard.writeText(value)
		toast.success("Copied to clipboard")
	}

	React.useEffect(() => {
		setShades(generateShades(color))
	}, [color])

	return (
		<div className="flex h-full w-full flex-col gap-5">
			<div className="flex w-full flex-col">
				<p className="text-lg font-semibold">Hex</p>
				<h5 className="text-xl font-medium uppercase">{color}</h5>
			</div>
			<div className="flex w-full flex-col">
				<p className="text-lg font-semibold">RGB</p>
				<h5 className="text-xl font-medium">{hexToRgb(color).join(", ")}</h5>
			</div>
			<div className="flex w-full flex-col">
				<p className="text-lg font-semibold">HSV</p>
				<h5 className="text-xl font-medium">{hexToHsv(color)}</h5>
			</div>
			<div className="flex w-full flex-col">
				<p className="text-lg font-semibold">Shades</p>
				<div className="flex w-full items-center">
					{shades.map((shade) => (
						<button
							key={shade}
							onClick={() => copy(shade)}
							style={{ background: shade, color: getContrastColor(shade) }}
							className="group grid aspect-square w-full flex-1 cursor-pointer place-items-center transition-transform duration-300 hover:scale-110">
							<span className="opacity-0 transition-opacity group-hover:opacity-100">
								<RiFileCopyLine size={16} />
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

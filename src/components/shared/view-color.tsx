import { RiFileCopyLine, RiCheckLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { getContrastColor, generateShades, hexToHsv, hexToRgb } from "@/lib"

interface Props {
	color: string
}

export const ViewColor = ({ color }: Props) => {
	const [shades, setShades] = React.useState<string[]>([])
	const [copiedValue, setCopiedValue] = React.useState<string | null>(null)

	const copy = (value: string) => {
		navigator.clipboard.writeText(value)
		setCopiedValue(value)
		toast.success("Copied!")
		setTimeout(() => setCopiedValue(null), 2000)
	}

	React.useEffect(() => {
		setShades(generateShades(color))
	}, [color])

	const ColorRow = ({
		label,
		value,
		displayValue,
	}: {
		label: string
		value: string
		displayValue: string
	}) => (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={() => copy(value)}
			className="flex w-full items-center justify-between rounded-xl border border-neutral-200 p-3 transition-colors hover:border-primary hover:bg-primary/5">
			<span className="text-sm font-medium text-neutral-500">{label}</span>
			<div className="flex items-center gap-2">
				<span className="font-mono text-sm font-semibold text-secondary">
					{displayValue}
				</span>
				{copiedValue === value ? (
					<RiCheckLine size={16} className="text-emerald-500" />
				) : (
					<RiFileCopyLine size={16} className="text-neutral-400" />
				)}
			</div>
		</motion.button>
	)

	return (
		<div className="flex w-full flex-col gap-4">
			{/* Color Preview */}
			<div
				className="aspect-video w-full rounded-xl shadow-inner"
				style={{ backgroundColor: color }}
			/>

			{/* Color Values */}
			<div className="space-y-2">
				<ColorRow label="HEX" value={color} displayValue={color.toUpperCase()} />
				<ColorRow
					label="RGB"
					value={`rgb(${hexToRgb(color).join(", ")})`}
					displayValue={hexToRgb(color).join(", ")}
				/>
				<ColorRow label="HSV" value={hexToHsv(color)} displayValue={hexToHsv(color)} />
			</div>

			{/* Shades */}
			<div>
				<p className="mb-2 text-sm font-medium text-neutral-500">Shades</p>
				<div className="flex w-full overflow-hidden rounded-xl">
					{shades.map((shade, index) => (
						<motion.button
							key={shade}
							whileHover={{ flex: 1.5 }}
							onClick={() => copy(shade)}
							style={{ background: shade, color: getContrastColor(shade) }}
							className="flex aspect-square flex-1 cursor-pointer items-center justify-center transition-all">
							<span className="text-[10px] font-medium opacity-0 transition-opacity hover:opacity-100">
								{copiedValue === shade ? (
									<RiCheckLine size={14} />
								) : (
									<RiFileCopyLine size={14} />
								)}
							</span>
						</motion.button>
					))}
				</div>
			</div>
		</div>
	)
}

import { RiFileCopyLine, RiCheckLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { getContrastColor } from "@/lib"

interface Props {
	shade: string
	index?: number
	label?: string
}

export const ShadeCard = ({ shade, index = 0, label }: Props) => {
	const [copied, setCopied] = React.useState(false)
	const contrastColor = getContrastColor(shade)

	const copy = () => {
		navigator.clipboard.writeText(shade)
		setCopied(true)
		toast.success("Copied!")
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<motion.div
			whileHover={{ scale: 1.05, zIndex: 10 }}
			transition={{ duration: 0.2 }}
			className="group relative aspect-[2/3] w-full cursor-pointer"
			style={{ backgroundColor: shade }}
			onClick={copy}>
			{/* Hover content */}
			<div
				style={{ color: contrastColor }}
				className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
				<motion.div
					initial={{ scale: 0.8 }}
					whileHover={{ scale: 1 }}
					className="flex h-8 w-8 items-center justify-center rounded-lg"
					style={{ backgroundColor: `${contrastColor}20` }}>
					{copied ? <RiCheckLine size={16} /> : <RiFileCopyLine size={16} />}
				</motion.div>
				<span className="font-mono text-xs font-semibold uppercase">{shade}</span>
				{label && (
					<span className="text-[10px] font-medium opacity-60">{label}</span>
				)}
			</div>

			{/* Label indicator */}
			{label && (
				<div
					style={{ color: contrastColor }}
					className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-60 lg:opacity-40">
					{label}
				</div>
			)}
		</motion.div>
	)
}

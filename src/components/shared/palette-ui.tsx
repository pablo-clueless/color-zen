import { RiHeartLine, RiHeartFill, RiFileCopyLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { getContrastColor } from "@/lib"
import { PaletteProps } from "@/types"

interface Props {
	palette: PaletteProps
}

export const PaletteUi = ({ palette }: Props) => {
	const [saved, setSaved] = React.useState(false)
	const { addPalette } = useGlobalStore()
	const { user } = useUserStore()

	const save = (value: PaletteProps) => {
		if (!user) {
			toast.error("Sign in to save palettes")
			return
		}
		addPalette(value)
		setSaved(true)
		toast.success("Palette saved")
		setTimeout(() => setSaved(false), 2000)
	}

	const copyColor = (color: string) => {
		navigator.clipboard.writeText(color)
		toast.success("Copied!")
	}

	const copyAllColors = () => {
		navigator.clipboard.writeText(palette.palette.join(", "))
		toast.success("All colors copied!")
	}

	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ duration: 0.2 }}
			className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
			<div className="flex aspect-[3/1] w-full">
				{palette.palette.map((color, index) => (
					<motion.div
						key={index}
						whileHover={{ flex: 1.5 }}
						transition={{ duration: 0.2 }}
						onClick={() => copyColor(color)}
						className="relative flex h-full flex-1 cursor-pointer items-center justify-center"
						style={{ background: color, color: getContrastColor(color) }}>
						<span className="font-mono text-xs font-semibold uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100">
							{color}
						</span>
					</motion.div>
				))}
			</div>

			<div className="flex items-center justify-between p-4">
				<div>
					<h5 className="font-semibold text-secondary">{palette.name}</h5>
					<p className="text-xs text-neutral-400">
						{palette.palette.length} colors
					</p>
				</div>

				<div className="flex items-center gap-1">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={copyAllColors}
						className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-secondary">
						<RiFileCopyLine size={16} />
					</motion.button>

					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => save(palette)}
						className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500">
						{saved ? (
							<RiHeartFill size={16} className="text-red-500" />
						) : (
							<RiHeartLine size={16} />
						)}
					</motion.button>
				</div>
			</div>
		</motion.div>
	)
}

import {
	RiFileCopyLine,
	RiHeartLine,
	RiHeartFill,
	RiLockLine,
	RiLockUnlockLine,
	RiMoreLine,
	RiSubtractLine,
	RiCheckLine,
} from "@remixicon/react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { getContrastColor } from "@/lib"
import { ViewColor } from "./view-color"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
	color: string
	locked: boolean
	onToggleLock: () => void
	deleteColor: () => void
	index?: number
}

export const PaletteCard = ({
	color,
	locked,
	onToggleLock,
	deleteColor,
	index = 0,
}: Props) => {
	const [copied, setCopied] = React.useState(false)
	const [saved, setSaved] = React.useState(false)
	const [isHovered, setIsHovered] = React.useState(false)

	const { addColor } = useGlobalStore()
	const { user } = useUserStore()

	const contrastColor = getContrastColor(color)

	const save = () => {
		if (!user) {
			toast.error("Sign in to save colors")
			return
		}
		addColor(color)
		setSaved(true)
		toast.success("Color saved")
		setTimeout(() => setSaved(false), 2000)
	}

	const copy = () => {
		navigator.clipboard.writeText(color)
		setCopied(true)
		toast.success("Copied!")
		setTimeout(() => setCopied(false), 2000)
	}

	const buttonClass =
		"flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200"

	return (
		<motion.div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			animate={{ backgroundColor: color }}
			transition={{ duration: 0.3 }}
			className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
			{/* Lock indicator */}
			<AnimatePresence>
				{locked && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						className="absolute right-3 top-3"
						style={{ color: contrastColor }}>
						<RiLockLine size={20} className="opacity-70" />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Actions */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: isHovered ? 1 : 0 }}
				transition={{ duration: 0.2 }}
				style={{ color: contrastColor }}
				className="flex flex-col items-center gap-2">
				<motion.button
					whileHover={{ scale: 1.15 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{ backgroundColor: `${contrastColor}20` }}
					onClick={deleteColor}
					title="Remove color">
					<RiSubtractLine size={20} />
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.15 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{ backgroundColor: `${contrastColor}20` }}
					onClick={copy}
					title="Copy hex code">
					{copied ? <RiCheckLine size={20} /> : <RiFileCopyLine size={20} />}
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.15 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{
						backgroundColor: locked ? `${contrastColor}40` : `${contrastColor}20`,
					}}
					onClick={onToggleLock}
					title={locked ? "Unlock color" : "Lock color"}>
					{locked ? <RiLockLine size={20} /> : <RiLockUnlockLine size={20} />}
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.15 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{ backgroundColor: `${contrastColor}20` }}
					onClick={save}
					title="Save to favorites">
					{saved ? (
						<RiHeartFill size={20} className="text-red-500" />
					) : (
						<RiHeartLine size={20} />
					)}
				</motion.button>

				<Dialog>
					<DialogTrigger asChild>
						<motion.button
							whileHover={{ scale: 1.15 }}
							whileTap={{ scale: 0.9 }}
							className={buttonClass}
							style={{ backgroundColor: `${contrastColor}20` }}
							title="View details">
							<RiMoreLine size={20} />
						</motion.button>
					</DialogTrigger>
					<DialogContent className="w-[360px] rounded-2xl border-none p-6 shadow-2xl">
						<DialogTitle className="text-xl font-semibold">Color Details</DialogTitle>
						<DialogDescription hidden aria-hidden>
							View the color codes
						</DialogDescription>
						<ViewColor color={color} />
					</DialogContent>
				</Dialog>
			</motion.div>

			{/* Color Code */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: index * 0.05 + 0.2 }}
				className="absolute bottom-6 left-0 right-0 text-center">
				<motion.button
					onClick={copy}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					style={{ color: contrastColor }}
					className="rounded-lg px-3 py-1 font-mono text-sm font-semibold uppercase tracking-wider transition-all hover:bg-black/10 lg:text-base">
					{color}
				</motion.button>
			</motion.div>
		</motion.div>
	)
}

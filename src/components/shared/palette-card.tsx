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
	deleteColor: (color: string) => void
	index?: number
}

export const PaletteCard = ({ color, deleteColor, index = 0 }: Props) => {
	const [current, setCurrent] = React.useState(color)
	const [locked, setLocked] = React.useState(false)
	const [copied, setCopied] = React.useState(false)
	const [saved, setSaved] = React.useState(false)
	const [isHovered, setIsHovered] = React.useState(false)

	const { addColor } = useGlobalStore()
	const { user } = useUserStore()

	const contrastColor = getContrastColor(current)

	const save = (value: string) => {
		if (!user) {
			toast.error("Sign in to save colors")
			return
		}
		addColor(value)
		setSaved(true)
		toast.success("Color saved")
		setTimeout(() => setSaved(false), 2000)
	}

	const copy = (value: string) => {
		navigator.clipboard.writeText(value)
		setCopied(true)
		toast.success("Copied!")
		setTimeout(() => setCopied(false), 2000)
	}

	const toggleLock = () => {
		setLocked(!locked)
		toast.success(locked ? "Color unlocked" : "Color locked")
	}

	React.useEffect(() => {
		if (!locked) {
			setCurrent(color)
		}
	}, [color, locked])

	const buttonClass =
		"flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"

	return (
		<motion.div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			animate={{ backgroundColor: current }}
			transition={{ duration: 0.4 }}
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
						<RiLockLine size={20} className="opacity-60" />
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
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{ backgroundColor: `${contrastColor}15` }}
					onClick={() => deleteColor(current)}>
					<RiSubtractLine size={20} />
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{ backgroundColor: `${contrastColor}15` }}
					onClick={() => copy(current)}>
					{copied ? <RiCheckLine size={20} /> : <RiFileCopyLine size={20} />}
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{ backgroundColor: `${contrastColor}15` }}
					onClick={toggleLock}>
					{locked ? <RiLockLine size={20} /> : <RiLockUnlockLine size={20} />}
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className={buttonClass}
					style={{ backgroundColor: `${contrastColor}15` }}
					onClick={() => save(current)}>
					{saved ? (
						<RiHeartFill size={20} className="text-red-500" />
					) : (
						<RiHeartLine size={20} />
					)}
				</motion.button>

				<Dialog>
					<DialogTrigger asChild>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className={buttonClass}
							style={{ backgroundColor: `${contrastColor}15` }}>
							<RiMoreLine size={20} />
						</motion.button>
					</DialogTrigger>
					<DialogContent className="w-[360px] rounded-2xl border-none p-6 shadow-2xl">
						<DialogTitle className="text-xl font-semibold">Color Details</DialogTitle>
						<DialogDescription hidden aria-hidden>
							View the color codes
						</DialogDescription>
						<ViewColor color={current} />
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
					onClick={() => copy(current)}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					style={{ color: contrastColor }}
					className="rounded-lg px-3 py-1 font-mono text-sm font-semibold uppercase tracking-wider transition-all hover:bg-black/10 lg:text-base">
					{current}
				</motion.button>
			</motion.div>
		</motion.div>
	)
}

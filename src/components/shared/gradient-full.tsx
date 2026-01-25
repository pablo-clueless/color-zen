import { RiCloseLine, RiFileCopyLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import React from "react"

interface Props {
	gradient: string
	onClose: () => void
}

export const GradientFull = ({ gradient, onClose }: Props) => {
	const copy = () => {
		navigator.clipboard.writeText(`background: ${gradient};`)
		toast.success("CSS copied!")
	}

	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		window.addEventListener("keydown", handleEscape)
		return () => window.removeEventListener("keydown", handleEscape)
	}, [onClose])

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
			style={{ background: gradient }}
			className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Close button */}
			<motion.button
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				onClick={onClose}
				className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
				<RiCloseLine size={24} />
			</motion.button>

			{/* Copy button */}
			<motion.button
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				onClick={copy}
				className="absolute right-20 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
				<RiFileCopyLine size={20} />
			</motion.button>

			{/* Hint */}
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-xl bg-black/20 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
				Press <kbd className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-xs">ESC</kbd> or click to close
			</motion.p>

			{/* Click overlay */}
			<div
				className="absolute inset-0 cursor-pointer"
				onClick={onClose}
			/>
		</motion.div>
	)
}

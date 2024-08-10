import { AnimatePresence, motion } from "framer-motion"
import React from "react"

interface Props {
	gradient: string
	onClose: () => void
}

export const GradientFull = ({ gradient, onClose }: Props) => {
	const animation = {
		exit: { y: "100%" },
		initial: { y: "-100%" },
		animate: { y: 0 },
		transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				{...animation}
				style={{ background: gradient }}
				onClick={onClose}
				className="fixed left-0 top-0 !z-50 h-screen w-screen"></motion.div>
		</AnimatePresence>
	)
}

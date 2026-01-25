import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import React from "react"

interface Props {
	children: React.ReactNode
}

const pageVariants = {
	initial: {
		opacity: 0,
		y: 8,
	},
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
	exit: {
		opacity: 0,
		y: -8,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
}

export const PageTransition = ({ children }: Props) => {
	const router = useRouter()

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={router.pathname}
				variants={pageVariants}
				initial="initial"
				animate="enter"
				exit="exit"
				className="min-h-screen">
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

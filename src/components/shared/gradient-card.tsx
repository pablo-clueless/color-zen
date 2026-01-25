import { RiHeartLine, RiHeartFill, RiMoreLine, RiFileCopyLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { GradientMenu } from "./gradient-menu"
import { generateGradient } from "@/lib"
import { GradientProps } from "@/types"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
	gradient: GradientProps
}

export const GradientCard = ({ gradient }: Props) => {
	const [saved, setSaved] = React.useState(false)
	const { addGradient } = useGlobalStore()
	const { user } = useUserStore()

	const gradientCss = generateGradient(gradient)

	const save = (value: GradientProps) => {
		if (!user) {
			toast.error("Sign in to save gradients")
			return
		}
		addGradient(value)
		setSaved(true)
		toast.success("Gradient saved")
		setTimeout(() => setSaved(false), 2000)
	}

	const copy = () => {
		navigator.clipboard.writeText(`background: ${gradientCss};`)
		toast.success("CSS copied!")
	}

	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ duration: 0.2 }}
			className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
			<div
				className="relative aspect-[2/1] w-full"
				style={{ background: gradientCss }}>
				{/* Hover overlay */}
				<div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/10 group-hover:opacity-100">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={copy}
						className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-neutral-700 shadow-lg backdrop-blur-sm transition-colors hover:bg-white">
						<RiFileCopyLine size={18} />
					</motion.button>
				</div>
			</div>

			<div className="flex items-center justify-between p-4">
				<div>
					<h6 className="font-semibold text-secondary">
						{gradient.name || "Gradient"}
					</h6>
					<p className="text-xs text-neutral-400">
						{gradient.colors.join(" → ")}
					</p>
				</div>

				<div className="flex items-center gap-1">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => save(gradient)}
						className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500">
						{saved ? (
							<RiHeartFill size={18} className="text-red-500" />
						) : (
							<RiHeartLine size={18} />
						)}
					</motion.button>

					<Popover>
						<PopoverTrigger asChild>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-secondary">
								<RiMoreLine size={18} />
							</motion.button>
						</PopoverTrigger>
						<PopoverContent className="w-48 rounded-xl border-neutral-200 p-2 shadow-lg">
							<GradientMenu gradient={gradient} />
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</motion.div>
	)
}

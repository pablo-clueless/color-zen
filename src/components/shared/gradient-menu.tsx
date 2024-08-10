import { toast } from "sonner"
import React from "react"
import {
	RiCodeLine,
	RiExpandDiagonalLine,
	RiHeartLine,
	RiLinksLine,
} from "@remixicon/react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { generateGradient } from "@/lib"
import { GradientProps } from "@/types"

interface Props {
	gradient: GradientProps
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL

export const GradientMenu = ({ gradient }: Props) => {
	const { addGradient } = useGlobalStore()
	const { user } = useUserStore()

	const save = (value: GradientProps) => {
		if (!user) {
			toast.error("You must be logged in to save colors!")
			return
		}
		addGradient(value)
	}

	const copy = (value: string) => {
		navigator.clipboard.writeText(value)
		toast.success("Copied to clipboard")
	}

	return (
		<div className="flex w-full flex-col gap-2">
			<div className="flex items-center">
				<button
					onClick={() => copy(`${appUrl}/gradients/${gradient.id}`)}
					className="flex flex-1 items-center gap-2 rounded px-1 py-0.5 text-sm font-medium transition-all duration-300 hover:bg-secondary/30">
					<RiLinksLine size={16} /> Copy URL
				</button>
			</div>
			<div className="flex items-center">
				<button
					onClick={() => copy(`background: ${generateGradient(gradient)};`)}
					className="flex flex-1 items-center gap-2 rounded px-1 py-0.5 text-sm font-medium transition-all duration-300 hover:bg-secondary/30">
					<RiCodeLine size={16} /> Copy CSS code
				</button>
			</div>
			<div className="flex items-center">
				<button
					onClick={() => {}}
					className="flex flex-1 items-center gap-2 rounded px-1 py-0.5 text-sm font-medium transition-all duration-300 hover:bg-secondary/30">
					<RiExpandDiagonalLine size={16} /> View Fullscreen
				</button>
			</div>
			<div className="flex items-center">
				<button
					onClick={() => save(gradient)}
					className="flex flex-1 items-center gap-2 rounded px-1 py-0.5 text-sm font-medium transition-all duration-300 hover:bg-secondary/30">
					<RiHeartLine size={16} /> Save Gradient
				</button>
			</div>
		</div>
	)
}

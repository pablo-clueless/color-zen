import { RiFileCopyLine, RiHeartAddLine } from "@remixicon/react"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { generateGradient } from "@/lib"
import { GradientProps } from "@/types"

interface Props {
	gradient: GradientProps
}

export const GradientCard = ({ gradient }: Props) => {
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
			<div
				className="group relative aspect-[5/2] w-full rounded"
				style={{ background: generateGradient(gradient) }}>
				<span className="absolute right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
			</div>
			<div className="flex w-full items-center justify-between text-sm">
				<h6 className="font-medium">{gradient.name}</h6>
				<div className="flex items-center gap-3">
					<button onClick={() => copy(`background: ${generateGradient(gradient)};`)}>
						<RiFileCopyLine size={16} />
					</button>
					<button onClick={() => save(gradient)}>
						<RiHeartAddLine size={16} />
					</button>
				</div>
			</div>
		</div>
	)
}

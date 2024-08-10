import { RiHeartLine, RiMoreLine } from "@remixicon/react"
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
	const { addGradient } = useGlobalStore()
	const { user } = useUserStore()

	const save = (value: GradientProps) => {
		if (!user) {
			toast.error("You must be logged in to save colors!")
			return
		}
		addGradient(value)
	}

	return (
		<div className="flex w-full flex-col gap-2">
			<div
				className="group relative aspect-[5/2] w-full rounded-xl"
				style={{ background: generateGradient(gradient) }}>
				<span className="absolute right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
			</div>
			<div className="flex w-full items-center justify-between text-sm">
				<h6 className="font-medium">{gradient.name}</h6>
				<div className="flex items-center gap-3">
					<button onClick={() => save(gradient)}>
						<RiHeartLine size={16} />
					</button>
					<Popover>
						<PopoverTrigger asChild>
							<button>
								<RiMoreLine size={16} />
							</button>
						</PopoverTrigger>
						<PopoverContent className="max-w-[200px]">
							<GradientMenu gradient={gradient} />
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	)
}

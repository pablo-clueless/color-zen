import { RiHeartLine, RiMoreLine } from "@remixicon/react"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { getContrastColor } from "@/lib"
import { PaletteProps } from "@/types"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
	palette: PaletteProps
}

export const PaletteUi = ({ palette }: Props) => {
	const { addPalette } = useGlobalStore()
	const { user } = useUserStore()

	const save = (value: PaletteProps) => {
		if (!user) {
			toast.error("You must be logged in to save palettes!")
			return
		}
		addPalette(value)
	}

	return (
		<div className="flex w-full flex-col gap-2">
			<div className="flex aspect-[5/2] w-full items-center rounded-xl shadow-xl">
				{palette.palette.map((color, index) => (
					<div
						key={index}
						className="group grid h-full flex-1 cursor-pointer place-items-center transition-transform first:rounded-l-xl last:rounded-r-xl hover:-translate-y-1"
						style={{ background: color, color: getContrastColor(color) }}>
						<span className="text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							{color}
						</span>
					</div>
				))}
			</div>
			<div className="flex w-full items-center justify-between">
				<h5 className="text-sm">{palette.name}</h5>
				<div className="flex items-center gap-3">
					<button onClick={() => save(palette)}>
						<RiHeartLine size={16} />
					</button>
					<Popover>
						<PopoverTrigger asChild>
							<button>
								<RiMoreLine size={16} />
							</button>
						</PopoverTrigger>
						<PopoverContent className="max-w-[200px]"></PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	)
}

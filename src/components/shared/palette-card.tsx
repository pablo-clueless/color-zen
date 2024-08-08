import { toast } from "sonner"
import React from "react"
import {
	RiDragMove2Line,
	RiFileCopyLine,
	RiHeartLine,
	RiLockLine,
	RiLockUnlockLine,
	RiMoreLine,
	RiSubtractLine,
} from "@remixicon/react"

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
}

export const PaletteCard = ({ color, deleteColor }: Props) => {
	const [isDragging, setIsDragging] = React.useState(false)
	const [current, setCurrent] = React.useState(color)
	const [locked, setLocked] = React.useState(false)

	const { addColor } = useGlobalStore()
	const { user } = useUserStore()

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleMouseUp = (e: React.MouseEvent) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const save = (value: string) => {
		if (!user) {
			toast.error("You must be logged in to save colors!")
			return
		}
		addColor(value)
	}

	const copy = (value: string) => {
		navigator.clipboard.writeText(value)
		toast.success("Copied to clipboard")
	}

	React.useEffect(() => {
		if (!locked) {
			setCurrent(color)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [color])

	return (
		<div
			draggable
			style={{ background: current }}
			className="flex h-full w-full flex-1 flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-20">
				<div
					style={{ color: getContrastColor(current) }}
					className="flex flex-col items-center gap-6">
					<button
						className="rounded p-2 transition-all duration-300 hover:bg-black/20"
						onClick={() => deleteColor(current)}>
						<RiSubtractLine />
					</button>
					<button
						className="rounded p-2 transition-all duration-300 hover:bg-black/20"
						onClick={() => copy(current)}>
						<RiFileCopyLine />
					</button>
					<button
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						className={`rounded p-2 transition-all duration-300 hover:bg-black/20 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
						<RiDragMove2Line />
					</button>
					<button
						className="rounded p-2 transition-all duration-300 hover:bg-black/20"
						onClick={() => setLocked(!locked)}>
						{locked ? <RiLockLine /> : <RiLockUnlockLine />}
					</button>
					<button
						className="rounded p-2 transition-all duration-300 hover:bg-black/20"
						onClick={() => save(current)}>
						<RiHeartLine />
					</button>
					<Dialog>
						<DialogTrigger asChild>
							<button className="rounded p-2 transition-all duration-300 hover:bg-black/20">
								<RiMoreLine />
							</button>
						</DialogTrigger>
						<DialogContent className="aspect-square w-[400px]">
							<DialogTitle>View Color</DialogTitle>
							<DialogDescription hidden aria-hidden>
								View the color codes
							</DialogDescription>
							<ViewColor color={current} />
						</DialogContent>
					</Dialog>
				</div>
				<p
					style={{ color: getContrastColor(current) }}
					className="font-semibold uppercase lg:text-xl">
					{current}
				</p>
			</div>
		</div>
	)
}

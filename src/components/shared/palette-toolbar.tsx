import { RiAddLine, RiExportLine, RiHeartAddLine } from "@remixicon/react"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { PaletteProps } from "@/types"
import { generateUid } from "@/lib"
import { Share } from "./share"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
	increment: () => void
	palette: string[]
}

export const PaletteToolbar = ({ increment, palette }: Props) => {
	const [uid, setUid] = React.useState("")
	const { addPalette } = useGlobalStore()
	const { user } = useUserStore()

	const handleAddPalette = () => {
		if (!user) {
			toast.error("You must be logged in to save palettes!")
			return
		}
		const newPalette: PaletteProps = {
			id: uid,
			created: new Date().toISOString(),
			palette,
		}
		addPalette(newPalette)
		toast.success("Palette saved successfully!")
	}

	React.useEffect(() => {
		setUid(generateUid())
	}, [palette])

	return (
		<div className="flex items-center gap-6">
			<button onClick={increment}>
				<RiAddLine />
			</button>
			<button onClick={handleAddPalette}>
				<RiHeartAddLine />
			</button>
			<Dialog>
				<DialogTrigger asChild>
					<button>
						<RiExportLine />
					</button>
				</DialogTrigger>
				<DialogContent className="aspect-square w-[400px]">
					<DialogTitle>Export Palette</DialogTitle>
					<DialogDescription hidden aria-hidden>
						Export your palette to a file.
					</DialogDescription>
					<Share id={uid} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

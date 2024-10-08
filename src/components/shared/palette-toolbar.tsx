import {
	RiAddLine,
	RiFileCopyLine,
	RiHeartAddLine,
	RiLinksLine,
} from "@remixicon/react"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { PaletteProps } from "@/types"
import { generateUid } from "@/lib"

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

	const copyCss = (value: string[]) => {
		const css = `.palette:\n{ ${value.map((color, index) => `--color-${index + 1}: ${color};`).join("\n")}\n}`
		navigator.clipboard.writeText(css)
		toast.success("Copied to clipboard")
	}

	const getUrl = (value: string) => {
		const url = `${window.location.origin}/palettes/${value}`
		navigator.clipboard.writeText(url)
		toast.success("Copied to clipboard")
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
			<button onClick={() => copyCss(palette)}>
				<RiFileCopyLine />
			</button>
			<button onClick={() => getUrl(uid)}>
				<RiLinksLine />
			</button>
		</div>
	)
}

import {
	RiAddLine,
	RiFileCopyLine,
	RiHeartAddLine,
	RiLinksLine,
} from "@remixicon/react"
import { motion } from "framer-motion"
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
			toast.error("Sign in to save palettes")
			return
		}
		const newPalette: PaletteProps = {
			id: uid,
			created: new Date().toISOString(),
			palette,
		}
		addPalette(newPalette)
		toast.success("Palette saved!")
	}

	const copyCss = (value: string[]) => {
		const css = `:root {\n${value.map((color, index) => `  --color-${index + 1}: ${color};`).join("\n")}\n}`
		navigator.clipboard.writeText(css)
		toast.success("CSS copied!")
	}

	const getUrl = (value: string) => {
		const url = `${window.location.origin}/palettes/${value}`
		navigator.clipboard.writeText(url)
		toast.success("Link copied!")
	}

	React.useEffect(() => {
		setUid(generateUid())
	}, [palette])

	const buttonClass =
		"flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition-all hover:bg-neutral-100 hover:text-secondary"

	return (
		<div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-white p-1">
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={increment}
				className={buttonClass}
				title="Add color">
				<RiAddLine size={20} />
			</motion.button>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={handleAddPalette}
				className={buttonClass}
				title="Save palette">
				<RiHeartAddLine size={20} />
			</motion.button>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => copyCss(palette)}
				className={buttonClass}
				title="Copy CSS">
				<RiFileCopyLine size={20} />
			</motion.button>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => getUrl(uid)}
				className={buttonClass}
				title="Copy link">
				<RiLinksLine size={20} />
			</motion.button>
		</div>
	)
}

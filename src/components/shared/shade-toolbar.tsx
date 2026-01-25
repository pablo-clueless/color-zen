import { RiFileCopyLine, RiHeartAddLine, RiLinksLine } from "@remixicon/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import React from "react"

import { useGlobalStore, useUserStore } from "@/store/z-store"
import { ShadeProps } from "@/types"
import { generateUid } from "@/lib"

interface Props {
	color: string
	shades: string[]
}

export const ShadeToolbar = ({ color, shades }: Props) => {
	const [uid, setUid] = React.useState("")
	const { addShade } = useGlobalStore()
	const { user } = useUserStore()

	const handleAddShade = () => {
		if (!user) {
			toast.error("Sign in to save shades")
			return
		}
		const newShade: ShadeProps = {
			id: uid,
			created: new Date().toISOString(),
			color,
			shades,
		}
		addShade(newShade)
		toast.success("Shades saved!")
	}

	const copyCss = (value: string[]) => {
		const css = `:root {\n  --color-base: #${color};\n${value.map((c, index) => `  --shade-${index + 1}: ${c};`).join("\n")}\n}`
		navigator.clipboard.writeText(css)
		toast.success("CSS copied!")
	}

	const getUrl = (value: string) => {
		const url = `${window.location.origin}/shades/${value}`
		navigator.clipboard.writeText(url)
		toast.success("Link copied!")
	}

	React.useEffect(() => {
		setUid(generateUid())
	}, [shades])

	const buttonClass =
		"flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-all hover:bg-neutral-100 hover:text-secondary"

	return (
		<div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-white p-1">
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={handleAddShade}
				className={buttonClass}
				title="Save shades">
				<RiHeartAddLine size={18} />
			</motion.button>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => copyCss(shades)}
				className={buttonClass}
				title="Copy CSS">
				<RiFileCopyLine size={18} />
			</motion.button>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => getUrl(uid)}
				className={buttonClass}
				title="Copy link">
				<RiLinksLine size={18} />
			</motion.button>
		</div>
	)
}

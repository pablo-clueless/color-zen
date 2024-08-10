import { RiFileCopyLine, RiHeartAddLine, RiLinksLine } from "@remixicon/react"
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
			toast.error("You must be logged in to save shades!")
			return
		}
		const newShade: ShadeProps = {
			id: uid,
			created: new Date().toISOString(),
			color,
			shades,
		}
		addShade(newShade)
		toast.success("Shades saved successfully!")
	}

	const copyCss = (value: string[]) => {
		const css = `.shade: {\n original: $${color};\n ${value.map((color, index) => `--shade-${index + 1}: ${color};`).join("\n")}\n}`
		navigator.clipboard.writeText(css)
		toast.success("Copied to clipboard")
	}

	const getUrl = (value: string) => {
		const url = `${window.location.origin}/shades/${value}`
		navigator.clipboard.writeText(url)
		toast.success("Copied to clipboard")
	}

	React.useEffect(() => {
		setUid(generateUid())
	}, [shades])

	return (
		<div className="flex items-center gap-6">
			<button onClick={handleAddShade}>
				<RiHeartAddLine />
			</button>
			<button onClick={() => copyCss(shades)}>
				<RiFileCopyLine />
			</button>
			<button onClick={() => getUrl(uid)}>
				<RiLinksLine />
			</button>
		</div>
	)
}

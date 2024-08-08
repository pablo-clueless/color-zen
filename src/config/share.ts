import {
	RiCss3Line,
	RiFacebookLine,
	RiFileCopyLine,
	RiImageLine,
	RiLinksLine,
	RiTwitterLine,
} from "@remixicon/react"

export const export_options = (id: string) => [
	{
		icon: RiCss3Line,
		label: "CSS",
		value: `${id}`,
	},
	{
		icon: RiFileCopyLine,
		label: "Copy",
		value: `${id}`,
	},
	{
		icon: RiLinksLine,
		label: "URL",
		value: `${window.location.origin}/${id}`,
	},
	{
		icon: RiTwitterLine,
		label: "Twitter",
		value: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I created this palette at ${window.location.origin}/${id}`)}`,
	},
	{
		icon: RiFacebookLine,
		label: "Facebook",
		value: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/${id}`)}`,
	},
	{
		icon: RiImageLine,
		label: "Image",
		value: "",
	},
]

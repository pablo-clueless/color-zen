import {
	RiCodepenFill,
	RiGithubFill,
	RiLinkedinFill,
	RiTwitterFill,
} from "@remixicon/react"

export const navLinks = [
	{
		href: "/palette",
		label: "Palette",
	},
	{
		href: "/shades",
		label: "Shade",
	},
	{
		href: "/gradients",
		label: "Gradient",
	},
	{
		href: "/inspirations",
		label: "Inspirations",
	},
]

export const footerLinks = [
	{
		label: "Features",
		links: [
			{ href: "/palettes", label: "Palette Generator" },
			{ href: "/shades", label: "Shade Generator" },
			{ href: "/gradients", label: "Gradient Generator" },
		],
	},
	{
		label: "Social",
		links: [],
	},
]

export const socials = [
	{
		href: "https://github.com/pablo-clueless",
		icon: RiGithubFill,
		label: "GitHub",
	},
	{
		href: "https://linkedin.com/in/samson-okunola",
		icon: RiLinkedinFill,
		label: "LinkedIn",
	},
	{
		href: "https://x.com/pablo_clueless",
		icon: RiTwitterFill,
		label: "Twitter",
	},
	{
		href: "https://codepen.io/pablo-clueless",
		icon: RiCodepenFill,
		label: "Codepen",
	},
]

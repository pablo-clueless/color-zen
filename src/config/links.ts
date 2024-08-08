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
		label: "Tools",
		links: [
			{ href: "/palettes", label: "Palette Generator" },
			{ href: "/shades", label: "Shade Generator" },
			{ href: "/gradients", label: "Gradient Generator" },
		],
	},
	{
		label: "Company",
		links: [
			{ href: "/pricing", label: "Pricing" },
			{ href: "/license", label: "License" },
			{ href: "/terms", label: "Terms of Service" },
			{ href: "/privacy", label: "Privacy Policy" },
			{ href: "/cookie", label: "Cookie Policy" },
		],
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

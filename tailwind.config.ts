import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				sm: "1rem",
				md: "1rem",
				lg: "0",
			},
			screens: {
				"2xl": "1200px",
			},
		},
		fontFamily: {
			heading: ["Bricolage Grotesque", "sans-serif"],
			body: ["Urbanist", "sans-serif"],
		},
		extend: {
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			backgroundImage: {
				creative: "url('/assets/images/creative.svg')",
			},
			colors: {
				primary: "#ff9f1c",
				secondary: "#31572c",
				accent: "#87a878",
				dark: {
					"100": "#0a090c",
					"200": "#141115",
				},
				light: {
					"100": "#f0edee",
					"200": "#f8f1ff",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

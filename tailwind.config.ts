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
				"fade-in": "fade-in 0.5s ease-out",
				"fade-in-up": "fade-in-up 0.5s ease-out",
				"fade-in-down": "fade-in-down 0.5s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				"slide-in-right": "slide-in-right 0.3s ease-out",
				"slide-in-left": "slide-in-left 0.3s ease-out",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				shimmer: "shimmer 2s linear infinite",
			},
			backgroundImage: {
				creative: "url('/assets/images/creative.svg')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#ff9f1c",
				secondary: "#1a1a2e",
				accent: "#87a878",
				dark: {
					"100": "#0a090c",
					"200": "#141115",
					"300": "#1a1a2e",
				},
				light: {
					"100": "#fafafa",
					"200": "#f5f5f5",
					"300": "#e5e5e5",
				},
				neutral: {
					"50": "#fafafa",
					"100": "#f5f5f5",
					"200": "#e5e5e5",
					"300": "#d4d4d4",
					"400": "#a3a3a3",
					"500": "#737373",
					"600": "#525252",
					"700": "#404040",
					"800": "#262626",
					"900": "#171717",
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
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"fade-in-up": {
					from: { opacity: "0", transform: "translateY(20px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-down": {
					from: { opacity: "0", transform: "translateY(-20px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"scale-in": {
					from: { opacity: "0", transform: "scale(0.95)" },
					to: { opacity: "1", transform: "scale(1)" },
				},
				"slide-in-right": {
					from: { opacity: "0", transform: "translateX(20px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				"slide-in-left": {
					from: { opacity: "0", transform: "translateX(-20px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				pulse: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.5" },
				},
				shimmer: {
					from: { backgroundPosition: "200% 0" },
					to: { backgroundPosition: "-200% 0" },
				},
			},
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
				"in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
			},
			boxShadow: {
				soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
				glow: "0 0 20px rgba(255, 159, 28, 0.3)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

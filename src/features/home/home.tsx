import { motion } from "framer-motion"
import Link from "next/link"
import React from "react"

import { Appbar, Button, Footer, Seo } from "@/components/shared"
import { generatePalette } from "@/lib"
import { useInterval } from "@/hooks"

export const Home = () => {
	const [palette, setPalette] = React.useState(generatePalette(5))

	useInterval(() => {
		setPalette(generatePalette(5))
	}, 5000)

	return (
		<>
			<Seo title="Generate amazing color palettes, gradients, shades and tints" />
			<Appbar />
			<main className="container mx-auto px-4 lg:px-0">
				<div className="grid w-full grid-cols-1 items-center gap-4 py-10 lg:grid-cols-2 lg:py-40">
					<div className="flex w-full flex-col gap-4">
						<p className="notched text-sm">CREATED BY OKUNOLA SAMSON</p>
						<p className="text-2xl text-secondary lg:text-4xl">
							Create the perfect palette or get inspired by thousands of beautiful
							color schemes.
						</p>
						<h1 className="text-4xl font-bold lg:text-8xl">Color Zen</h1>
						<Link href="/palette">
							<Button size="lg">Create Palette</Button>
						</Link>
					</div>
					<div className="flex aspect-[3/2] w-full items-center overflow-hidden rounded-2xl shadow-xl">
						{palette.map((color, index) => (
							<motion.div
								initial={{ background: "" }}
								animate={{ background: color }}
								transition={{ staggerChildren: 0.4, delay: index * 0.1, type: "tween" }}
								key={index}
								className="h-full w-full flex-1 transition-all first:rounded-l-xl last:rounded-r-xl"></motion.div>
						))}
					</div>
				</div>
				<div className="flex h-[50vh] w-full flex-col justify-start overflow-hidden bg-creative bg-cover bg-top bg-no-repeat py-5 lg:py-10"></div>
			</main>
			<Footer />
		</>
	)
}

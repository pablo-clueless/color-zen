import Link from "next/link"
import React from "react"

import { Appbar, Button, Footer, Seo } from "@/components/shared"
import { cn, generatePalette } from "@/lib"
import { useInterval } from "@/hooks"

export const Home = () => {
	const [positionY, setPositionY] = React.useState(0)
	const ref = React.useRef<HTMLDivElement>(null)!

	useInterval(() => {
		if (ref.current) {
			if (
				ref.current.scrollTop >=
				ref.current.scrollHeight - ref.current.clientHeight
			) {
				setPositionY(0)
			} else {
				setPositionY((prev) => prev - 1)
			}
		}
	}, 1000)

	return (
		<>
			<Seo title="Generate amazing color palettes, gradients, shades and tints" />
			<Appbar />
			<main className="container mx-auto">
				<div className="grid w-full grid-cols-2 gap-4 py-5 lg:py-10">
					<div className="flex w-full flex-col gap-4">
						<p className="notched text-sm">CREATED BY OKUNOLA SAMSON</p>
						<p className="text-2xl text-primary lg:text-4xl">
							Create the perfect palette or get inspired by thousands of beautiful
							color schemes.
						</p>
						<h1 className="text-4xl font-bold lg:text-8xl">Color Zen</h1>
						<Link href="/palette">
							<Button size="lg">Create Palette</Button>
						</Link>
					</div>
					<div className="grid w-full grid-cols-2 gap-4">
						{[...Array(4)].map((_, index) => (
							<div
								key={index}
								className={cn(
									"aspect-square w-full bg-secondary",
									index === 0 && "bg-primary",
									index === 3 && "bg-transparent"
								)}></div>
						))}
					</div>
				</div>
				<div className="h-[65vh] w-full overflow-hidden py-5 lg:py-10">
					<div
						ref={ref}
						className="grid h-full w-full grid-cols-5 gap-4 overflow-y-scroll">
						{[...Array(5)].map((_, index) => (
							<div
								key={index}
								style={{ transform: `translateY(${positionY * (index + 1)}px)` }}
								className="flex h-full w-full transform flex-col gap-4 transition-transform duration-300">
								{[...Array(20)].map((_, index) => (
									<div key={index} className="grid h-20 w-full grid-cols-4 rounded">
										{generatePalette(4).map((color, index) => (
											<div
												key={index}
												className="h-full w-full first:rounded-l last:rounded-r"
												style={{ backgroundColor: color }}></div>
										))}
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

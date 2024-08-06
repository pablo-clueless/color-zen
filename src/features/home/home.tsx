import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"
import { cn } from "@/lib"

export const Home = () => {
	return (
		<>
			<Seo title="Color Zen" />
			<Appbar />
			<main className="container mx-auto">
				<div className="grid w-full grid-cols-2 gap-4 py-5 lg:py-10">
					<div className="flex w-full flex-col gap-4">
						<p className="notched text-sm">CREATE</p>
						<p className="text-primary text-2xl lg:text-4xl">
							Create the perfect palette or get inspired by thousands of beautiful
							color schemes.
						</p>
						<h1 className="text-4xl font-bold lg:text-8xl">Color Zen</h1>
					</div>
					<div className="grid w-full grid-cols-2 gap-4">
						{[...Array(4)].map((_, index) => (
							<div
								key={index}
								className={cn(
									"bg-secondary aspect-square w-full",
									index === 0 && "bg-primary",
									index === 3 && "bg-transparent"
								)}></div>
						))}
					</div>
				</div>
				<div className="w-full overflow-hidden py-5 lg:py-10"></div>
			</main>
			<Footer />
		</>
	)
}

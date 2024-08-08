import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

export const Gradients = () => {
	return (
		<>
			<Seo title="Color Gradient Generator" />
			<Appbar />
			<main className="container mx-auto px-4">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Gradient Generator
				</h1>
				<div className="flex w-full flex-col items-center gap-20 py-5 lg:py-10"></div>
			</main>
			<Footer />
		</>
	)
}

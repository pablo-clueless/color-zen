import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

export const Gradients = () => {
	return (
		<>
			<Seo title="Color Gradient Generator" />
			<Appbar />
			<main className="container mx-auto px-4">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Color Gradient Generator
				</h1>
			</main>
			<Footer />
		</>
	)
}

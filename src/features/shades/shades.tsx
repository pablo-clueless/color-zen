import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

export const Shades = () => {
	return (
		<>
			<Seo title="Color Shade Generator" />
			<Appbar />
			<main className="container mx-auto px-4">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Color Shade Generator
				</h1>
			</main>
			<Footer />
		</>
	)
}

import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

export const Inspirations = () => {
	return (
		<>
			<Seo title="Inspirations" />
			<Appbar />
			<main className="container mx-auto px-4">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Inspirations
				</h1>
			</main>
			<Footer />
		</>
	)
}

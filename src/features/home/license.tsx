import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

export const License = () => {
	return (
		<>
			<Seo title="License" />
			<Appbar />
			<main className="container mx-auto h-screen w-screen px-4 lg:px-0">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">License</h1>
			</main>
			<Footer />
		</>
	)
}

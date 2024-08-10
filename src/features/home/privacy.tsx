import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

export const Privacy = () => {
	return (
		<>
			<Seo title="Privacy Policy" />
			<Appbar />
			<main className="container mx-auto h-screen w-screen px-4 lg:px-0">
				<h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
					Privacy Policy
				</h1>
			</main>
			<Footer />
		</>
	)
}

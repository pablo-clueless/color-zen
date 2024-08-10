import { useRouter } from "next/router"
import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

export const Gradient = () => {
	const router = useRouter()
	const { id } = router.query

	return (
		<>
			<Seo title="" />
			<Appbar />
			<main className="container mx-auto px-4 lg:px-0">Gradient {id}</main>
			<Footer />
		</>
	)
}

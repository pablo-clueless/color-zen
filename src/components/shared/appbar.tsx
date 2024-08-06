import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"

import { navLinks } from "@/config"
import { Button } from "./button"

export const Appbar = () => {
	const router = useRouter()
	const pathname = router.pathname

	return (
		<nav className="flex w-screen items-center justify-center bg-light-100">
			<div className="flex w-full max-w-[1200px] items-center justify-between py-4">
				<Link href="/" className="font-heading font-semibold">
					Color Zen
				</Link>
				<div className="flex items-center gap-4">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`link font-semibold ${link.href === pathname ? "text-primary" : "text-secondary"}`}>
							{link.label}
						</Link>
					))}
					<Link href="/signin">
						<Button>Sign in</Button>
					</Link>
				</div>
			</div>
		</nav>
	)
}

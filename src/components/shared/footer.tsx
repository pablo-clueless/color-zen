import Link from "next/link"
import React from "react"

import { footerLinks, socials } from "@/config"

export const Footer = () => {
	return (
		<footer className="bg-dark-100 text-light-100 flex w-screen items-center justify-center py-5">
			<div className="flex w-full max-w-[1200px] flex-col gap-10">
				<div className="flex w-full flex-wrap items-start gap-10">
					<div className="flex min-w-[300px] flex-col gap-3 lg:min-w-[500px]">
						<Link
							href="/"
							className="font-heading text-light-100 text-4xl font-bold lg:text-6xl">
							Color Zen
						</Link>
						<p className="text-light-100 max-w-[300px]">
							Color Zen is a built for developers, designers and artists with the tools
							to create amazing designs.
						</p>
						<div className="flex items-center gap-4">
							{socials.map((link) => (
								<a
									key={link.label}
									href={link.href}
									target="_blank"
									className="text-primary">
									<link.icon size={20} />
								</a>
							))}
						</div>
					</div>
					<div className="flex flex-1 flex-wrap items-start">
						{footerLinks.map((item) => (
							<div key={item.label} className="flex flex-1 flex-col gap-4">
								<h5 className="text-accent">{item.label}</h5>
								<div className="flex flex-col gap-2">
									{item.links.map((link) => (
										<Link key={link.href} href={link.href} className="link">
											{link.label}
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex w-full items-center justify-between text-sm">
					<p>&copy;{new Date().getFullYear()} Color Zen</p>
					<div className="flex items-center gap-2">
						<Link href="/privacy" className="link">
							privacy
						</Link>
						<Link href="/license" className="link">
							license
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

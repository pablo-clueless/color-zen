import Link from "next/link"
import React from "react"

import { footerLinks } from "@/config"

export const Footer = () => {
	return (
		<footer className="flex w-screen items-center justify-center bg-dark-100 py-5 text-light-100">
			<div className="flex w-full max-w-[1200px] flex-col gap-5">
				<div className="flex w-full flex-wrap items-start gap-10">
					<div className="flex min-w-[300px] flex-col gap-2 lg:min-w-[500px]">
						<Link
							href="/"
							className="font-heading text-4xl font-bold text-light-100 lg:text-6xl">
							Color Zen
						</Link>
						<p className="max-w-[300px] text-light-100">
							Color Zen is a built for developers, designers and artists with the tools
							to create amazing designs.
						</p>
					</div>
					<div className="flex flex-1 flex-wrap items-start">
						{footerLinks.map((item) => (
							<div key={item.label} className="flex flex-1 flex-col gap-4">
								<h5 className="text-accent">{item.label}</h5>
								<div className="flex flex-col gap-2">
									{item.links.map((link) => {
										if (link.external) {
											return (
												<a
													target="_blank"
													rel="noopener noreferrer"
													key={link.href}
													href={link.href}
													className="link">
													{link.label}
												</a>
											)
										} else {
											return (
												<Link key={link.href} href={link.href} className="link">
													{link.label}
												</Link>
											)
										}
									})}
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

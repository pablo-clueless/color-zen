import Link from "next/link"
import React from "react"

import { footerLinks, socials } from "@/config"

export const Footer = () => {
	return (
		<footer className="flex w-screen items-center justify-center bg-dark-100 px-4 py-5 text-light-100 lg:px-0">
			<div className="flex w-full max-w-[1200px] flex-col gap-14">
				<div className="flex w-full flex-wrap items-start gap-10">
					<div className="flex min-w-[300px] flex-col gap-3 lg:min-w-[500px]">
						<Link
							href="/"
							className="font-heading text-4xl font-bold text-light-100 lg:text-6xl">
							Color Zen
						</Link>
						<p className="max-w-[300px] text-light-100">
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
				<div className="flex w-full items-center justify-center text-sm">
					<p>
						Color Zen. Built by <b>Okunola Samson</b>. &copy;
						{new Date().getFullYear()}
					</p>
				</div>
			</div>
		</footer>
	)
}

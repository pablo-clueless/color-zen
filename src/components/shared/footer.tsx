import { motion } from "framer-motion"
import Link from "next/link"
import React from "react"

import { socials } from "@/config"

export const Footer = () => {
	return (
		<footer className="mt-auto border-t border-neutral-200 bg-white">
			<div className="container mx-auto px-4 py-8 lg:px-0">
				<div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<span className="font-heading text-sm font-bold text-white">C</span>
						</div>
						<span className="font-heading text-lg font-semibold text-secondary">
							Color Zen
						</span>
					</div>

					<div className="flex items-center gap-6">
						<Link
							href="/privacy"
							className="text-sm text-neutral-500 transition-colors hover:text-secondary">
							Privacy
						</Link>
						<Link
							href="/terms"
							className="text-sm text-neutral-500 transition-colors hover:text-secondary">
							Terms
						</Link>
						<Link
							href="/license"
							className="text-sm text-neutral-500 transition-colors hover:text-secondary">
							License
						</Link>
					</div>

					<div className="flex items-center gap-3">
						{socials.map((link) => (
							<motion.a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-primary hover:text-white">
								<link.icon size={18} />
							</motion.a>
						))}
					</div>
				</div>

				<div className="mt-6 border-t border-neutral-100 pt-6 text-center">
					<p className="text-sm text-neutral-400">
						Built by{" "}
						<a
							href="https://github.com/pablo-clueless"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline">
							Okunola Samson
						</a>
						{" "}&copy; {new Date().getFullYear()}
					</p>
				</div>
			</div>
		</footer>
	)
}

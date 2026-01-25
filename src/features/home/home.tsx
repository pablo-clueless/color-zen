import { RiPaletteLine, RiDropLine, RiPantoneLine } from "@remixicon/react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import React from "react"

import { Appbar, Button, Footer, Seo } from "@/components/shared"
import { generatePalette } from "@/lib"
import { useInterval } from "@/hooks"

const features = [
	{
		icon: RiPaletteLine,
		title: "Palette Generator",
		description: "Create beautiful color combinations with a single click",
		href: "/palettes",
		gradient: "from-pink-500 to-rose-500",
	},
	{
		icon: RiDropLine,
		title: "Shade Generator",
		description: "Generate perfect shades and tints for any color",
		href: "/shades",
		gradient: "from-violet-500 to-purple-500",
	},
	{
		icon: RiPantoneLine,
		title: "Gradient Generator",
		description: "Design stunning gradients for your projects",
		href: "/gradients",
		gradient: "from-amber-500 to-orange-500",
	},
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
	},
}

export const Home = () => {
	const [palette, setPalette] = React.useState(generatePalette(5))
	const [isTransitioning, setIsTransitioning] = React.useState(false)

	useInterval(() => {
		setIsTransitioning(true)
		setTimeout(() => {
			setPalette(generatePalette(5))
			setIsTransitioning(false)
		}, 300)
	}, 4000)

	return (
		<>
			<Seo title="Generate amazing color palettes, gradients, shades and tints" />
			<Appbar />
			<main className="flex min-h-screen flex-col">
				{/* Hero Section */}
				<section className="container mx-auto px-4 lg:px-0">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-12 py-12 lg:flex-row lg:gap-16 lg:py-0">
						{/* Left Content */}
						<div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
							<motion.div variants={itemVariants} className="notched mb-6">
								COLOR DESIGN TOOL
							</motion.div>
							<motion.h1
								variants={itemVariants}
								className="mb-6 text-4xl font-bold leading-tight text-secondary sm:text-5xl lg:text-6xl xl:text-7xl">
								Create{" "}
								<span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
									stunning
								</span>{" "}
								color palettes
							</motion.h1>

							<motion.p
								variants={itemVariants}
								className="mb-8 max-w-lg text-lg text-neutral-500 lg:text-xl">
								The ultimate color tool for designers and developers. Generate palettes,
								gradients, and shades in seconds.
							</motion.p>

							<motion.div variants={itemVariants} className="flex gap-4">
								<Link href="/palettes">
									<Button size="xl">Start Creating</Button>
								</Link>
								<Link href="/gradients">
									<Button size="xl" variant="outline">
										Explore
									</Button>
								</Link>
							</motion.div>
						</div>

						{/* Right Content - Animated Palette */}
						<motion.div variants={itemVariants} className="relative w-full lg:w-1/2">
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
								<AnimatePresence mode="wait">
									<motion.div
										key={palette.join("-")}
										initial={{ opacity: 0, scale: 1.05 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.4 }}
										className="absolute inset-0 flex">
										{palette.map((color, index) => (
											<motion.div
												key={`${color}-${index}`}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1, duration: 0.4 }}
												style={{ background: color }}
												className="group relative h-full flex-1 cursor-pointer transition-all duration-300 hover:flex-[1.5]">
												<div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/30 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
													<span className="font-mono text-sm font-medium uppercase text-white">
														{color}
													</span>
												</div>
											</motion.div>
										))}
									</motion.div>
								</AnimatePresence>

								{/* Loading indicator */}
								<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
									<div className="flex gap-1.5">
										{[...Array(5)].map((_, i) => (
											<motion.div
												key={i}
												className={`h-1.5 w-1.5 rounded-full ${isTransitioning ? "bg-white/60" : "bg-white/30"}`}
												animate={{
													scale: isTransitioning ? [1, 1.5, 1] : 1,
												}}
												transition={{
													delay: i * 0.1,
													duration: 0.4,
												}}
											/>
										))}
									</div>
								</div>
							</div>

							{/* Decorative elements */}
							<div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-primary/20 to-amber-500/20" />
						</motion.div>
					</motion.div>
				</section>

				{/* Features Section */}
				<section className="border-t border-neutral-200 bg-white py-24">
					<div className="container mx-auto px-4 lg:px-0">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="mb-16 text-center">
							<h2 className="mb-4 text-3xl font-bold text-secondary lg:text-4xl">
								Everything you need
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-neutral-500">
								Powerful tools to help you create, explore, and perfect your color
								schemes
							</p>
						</motion.div>

						<div className="grid gap-6 lg:grid-cols-3">
							{features.map((feature, index) => (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1, duration: 0.5 }}>
									<Link href={feature.href}>
										<motion.div
											whileHover={{ y: -8 }}
											transition={{ duration: 0.3 }}
											className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl">
											<div
												className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
												<feature.icon size={28} />
											</div>
											<h3 className="mb-3 text-xl font-semibold text-secondary">
												{feature.title}
											</h3>
											<p className="text-neutral-500">{feature.description}</p>

											<div className="mt-6 flex items-center text-sm font-medium text-primary">
												Try it now
												<motion.span
													className="ml-2"
													initial={{ x: 0 }}
													whileHover={{ x: 4 }}>
													&rarr;
												</motion.span>
											</div>

											{/* Hover gradient */}
											<div
												className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
											/>
										</motion.div>
									</Link>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-gradient-to-br from-secondary to-dark-300 py-24">
					<div className="container mx-auto px-4 lg:px-0">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="text-center">
							<h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
								Ready to create something beautiful?
							</h2>
							<p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-300">
								Start generating stunning color palettes, gradients, and shades for your
								next project.
							</p>
							<Link href="/palettes">
								<Button
									size="xl"
									className="bg-white text-secondary hover:bg-neutral-100">
									Get Started Free
								</Button>
							</Link>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

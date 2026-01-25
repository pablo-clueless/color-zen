import { RiMenu3Line, RiCloseLine } from "@remixicon/react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"

import { navLinks } from "@/config"

export const Appbar = () => {
	const [open, setOpen] = React.useState(false)
	const [scrolled, setScrolled] = React.useState(false)
	const router = useRouter()
	const pathname = router.pathname

	React.useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	React.useEffect(() => {
		setOpen(false)
	}, [pathname])

	return (
		<>
			<motion.nav
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
				className={`fixed left-0 right-0 top-0 z-50 flex w-screen items-center justify-center transition-all duration-300 ${
					scrolled ? "py-3" : "py-5"
				}`}>
				<div
					className={`mx-4 flex w-full max-w-[1200px] items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${
						scrolled
							? "glass border border-neutral-200 shadow-soft"
							: "bg-transparent"
					}`}>
					<Link href="/" className="group flex items-center gap-2">
						<motion.div
							whileHover={{ rotate: 180 }}
							transition={{ duration: 0.4 }}
							className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<span className="font-heading text-sm font-bold text-white">C</span>
						</motion.div>
						<span className="font-heading text-lg font-semibold text-secondary">
							Color Zen
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden items-center gap-1 lg:flex">
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href} className="relative px-4 py-2">
								<span
									className={`text-sm font-medium transition-colors ${
										pathname === link.href
											? "text-primary"
											: "text-neutral-600 hover:text-secondary"
									}`}>
									{link.label}
								</span>
								{pathname === link.href && (
									<motion.div
										layoutId="activeNav"
										className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
										transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
									/>
								)}
							</Link>
						))}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setOpen(!open)}
						className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-neutral-100 lg:hidden">
						<AnimatePresence mode="wait">
							{open ? (
								<motion.div
									key="close"
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}>
									<RiCloseLine size={24} />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: -90, opacity: 0 }}
									transition={{ duration: 0.2 }}>
									<RiMenu3Line size={24} />
								</motion.div>
							)}
						</AnimatePresence>
					</button>
				</div>
			</motion.nav>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
						onClick={() => setOpen(false)}
					/>
				)}
			</AnimatePresence>

			{/* Mobile Menu */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed right-0 top-0 z-50 h-full w-[280px] bg-white p-6 shadow-2xl lg:hidden">
						<div className="flex h-full flex-col">
							<div className="flex items-center justify-between">
								<span className="font-heading text-lg font-semibold">Menu</span>
								<button
									onClick={() => setOpen(false)}
									className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-neutral-100">
									<RiCloseLine size={24} />
								</button>
							</div>
							<nav className="mt-8 flex flex-col gap-2">
								{navLinks.map((link, index) => (
									<motion.div
										key={link.href}
										initial={{ x: 20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: index * 0.1 }}>
										<Link
											href={link.href}
											onClick={() => setOpen(false)}
											className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors ${
												pathname === link.href
													? "bg-primary/10 text-primary"
													: "text-neutral-600 hover:bg-neutral-100"
											}`}>
											{link.label}
										</Link>
									</motion.div>
								))}
							</nav>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Spacer for fixed nav */}
			<div className="h-24" />
		</>
	)
}

import { RiMenu3Line } from "@remixicon/react"
import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"

import { navLinks } from "@/config"
// import { Button } from "./button"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"

export const Appbar = () => {
	const [open, setOpen] = React.useState(false)
	const router = useRouter()
	const pathname = router.pathname

	return (
		<nav className="flex w-screen items-center justify-center bg-light-100">
			<div className="flex w-full max-w-[1200px] items-center justify-between px-4 py-4 lg:px-0">
				<Link href="/" className="font-heading font-semibold">
					Color Zen
				</Link>
				<Sheet open={open} onOpenChange={() => setOpen(!open)}>
					<SheetTrigger asChild>
						<RiMenu3Line />
					</SheetTrigger>
					<SheetContent>
						<SheetTitle>Menu</SheetTitle>
						<SheetDescription hidden>Menu</SheetDescription>
						<div className="mt-6 flex flex-col gap-4">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setOpen(false)}
									className={`link font-semibold ${link.href === pathname ? "text-primary" : "text-secondary"}`}>
									{link.label}
								</Link>
							))}
						</div>
					</SheetContent>
				</Sheet>
				<div className="hidden items-center gap-4 lg:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`link font-semibold ${link.href === pathname ? "text-primary" : "text-secondary"}`}>
							{link.label}
						</Link>
					))}
					{/* <Link href="/signin">
						<Button>Sign in</Button>
					</Link> */}
				</div>
			</div>
		</nav>
	)
}

import { type VariantProps, cva } from "class-variance-authority"
import React from "react"

import { cn } from "@/lib"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:scale-[1.02]",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md",
				secondary:
					"bg-secondary text-white shadow-sm hover:bg-secondary/90 hover:shadow-md",
				dark: "bg-dark-300 text-white shadow-sm hover:bg-dark-300/90 hover:shadow-md",
				outline:
					"border-2 border-neutral-200 bg-transparent text-secondary hover:border-primary hover:text-primary",
				ghost: "bg-transparent text-secondary hover:bg-neutral-100",
				link: "text-primary underline-offset-4 hover:underline",
				text: "text-primary bg-transparent hover:bg-primary/10",
				success: "bg-emerald-500 text-white hover:bg-emerald-600",
				error: "bg-red-500 text-white hover:bg-red-600",
				warning: "bg-amber-500 text-white hover:bg-amber-600",
			},
			size: {
				default: "h-11 px-5 py-2",
				xs: "h-7 px-2 py-1 text-xs rounded-lg",
				sm: "h-9 px-4 text-xs rounded-lg",
				lg: "h-12 px-8 text-base",
				xl: "h-14 px-10 text-lg",
				icon: "h-10 w-10 rounded-xl",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)

Button.displayName = "Button"

export { Button }

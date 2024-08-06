import { type VariantProps, cva } from "class-variance-authority"
import React from "react"

import { cn } from "@/lib"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none outline-none disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 active:scale-[0.99] transition-all duration-300",
	{
		variants: {
			variant: {
				default: "bg-primary text-white hover:bg-primary/90",
				secondary: "bg-secondary text-secondary hover:bg-secondary/80",
				dark: "bg-dark-100 text-light-200 hover:bg-dark-100/90",
				outline: "border border-primary text-primary bg-transparent",
				ghost: "bg-light-100 text-primary hover:bg-light-100/90",
				link: "text-primary underline-offset-4 hover:underline",
				text: "text-primary bg-transparent",
				success: "bg-green-500 text-light-200 hover:bg-green-500/90",
				error: "bg-red-500 text-light-200 hover:bg-red-500/90",
				warning: "bg-amber-500 text-light-200 hover:bg-amber-500/90",
			},
			size: {
				default: "h-10 px-4 py-2",
				xs: "h-7 px-2 py-1 text-[11px]",
				sm: "h-9 px-3 text-xs",
				lg: "h-12 px-8 text-base",
				icon: "h-10 w-10 rounded-full",
				tab: "h-7 px-4 py-1",
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

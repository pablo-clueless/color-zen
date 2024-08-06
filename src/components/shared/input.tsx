import { Eye, EyeOff } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ error, className, id, label, name, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false)

		return (
			<div className="flex w-full flex-col">
				{label && <label htmlFor={name ?? id}>{label}</label>}
				<div className="relative w-full">
					<input
						type={showPassword ? "text" : type}
						className={cn(
							"flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
							className
						)}
						ref={ref}
						{...props}
					/>
					{type === "password" && (
						<button
							type="button"
							className="absolute right-2 top-1/2 -translate-y-1/2"
							onClick={() => setShowPassword((prev) => !prev)}>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					)}
				</div>
				{error && <p className="text-[10px] text-red-500">{error}</p>}
			</div>
		)
	}
)
Input.displayName = "Input"

export { Input }

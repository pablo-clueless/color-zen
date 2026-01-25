import type { AppProps } from "next/app"

import { PageTransition } from "@/components/shared"
import { Toaster } from "@/components/ui/sonner"
import { SSRProvider } from "@/context"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<PageTransition>
				<Component {...pageProps} />
			</PageTransition>
			<Toaster
				position="bottom-center"
				toastOptions={{
					style: {
						background: "#1a1a2e",
						color: "#fafafa",
						border: "none",
						borderRadius: "12px",
						padding: "12px 16px",
					},
				}}
			/>
		</SSRProvider>
	)
}

import type { AppProps } from "next/app"

import { Toaster } from "@/components/ui/sonner"
import { SSRProvider } from "@/context"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<Component {...pageProps} />
			<Toaster richColors />
		</SSRProvider>
	)
}

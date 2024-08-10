import React from "react"

interface IntersectionObserverOptions extends IntersectionObserverInit {
	onIntersect: (isIntersecting: boolean) => void
}

interface IntersectionObserverProps<T> {
	isIntersecting: boolean
	ref: React.RefObject<T>
}

const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
	options?: IntersectionObserverOptions
): IntersectionObserverProps<T> => {
	const [isIntersecting, setIntersecting] = React.useState(false)
	const ref = React.useRef<T>(null)!

	React.useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting)
			options?.onIntersect(entry.isIntersecting)
		}, options)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [options, ref])

	return { isIntersecting, ref }
}

export { useIntersectionObserver }

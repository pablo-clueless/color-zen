import React from "react"

/**
 * @name useTimeout
 * the timeout hook calls a function or executes a code snippet after a specified delay.
 * @param callback - The function to be executed at the specified interval.
 * @param delay - The time, in milliseconds, to wait before executing the callback function.
 * @example
 * const [count, setCount] = React.useState(0)
 *
 * useTimeout(() => {
 *   setCount(count + 1)
 * }, 1000)
 */
export const useTimeout = (callback: () => void, delay: number) => {
	const savedCallback = React.useRef(callback)

	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	React.useEffect(() => {
		const id = setTimeout(() => savedCallback.current(), delay)
		return () => clearTimeout(id)
	}, [delay])
}

import React from "react"

/**
 * @name useInterval
 * The interval hook calls a function or executes a code snippet at specified intervals.
 * @param callback - The function to be executed at the specified interval.
 * @param delay - The time, in milliseconds, to wait before executing the callback function.
 * @example
 * const [count, setCount] = React.useState(0)
 *
 * useInterval(() => {
 *   setCount(count + 1)
 * }, 1000)
 */
export const useInterval = (callback: () => void, delay: number) => {
	const savedCallback = React.useRef(callback)

	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	React.useEffect(() => {
		const id = setInterval(() => savedCallback.current(), delay)
		return () => clearInterval(id)
	}, [delay])
}

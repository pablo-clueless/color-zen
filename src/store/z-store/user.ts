import Cookies from "js-cookie"

import { createPersistMiddleware } from "../middleware"
import { UserProps } from "@/types"

interface UserStore {
	user: UserProps | null
	signIn: (user: UserProps, token: string) => void
	signOut: (option?: { soft?: boolean }) => void
}

const initialState: UserStore = {
	user: null,
	signIn: () => {},
	signOut: () => {},
}

const useUserStore = createPersistMiddleware<UserStore>(
	"color-zen-user",
	(set) => ({
		...initialState,
		signIn: (user, token) => {
			Cookies.set("color-zen", token, {
				sameSite: "Lax",
				secure: process.env.NODE_ENV !== "development",
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) /* 30 days */,
			})
			set({ user })
		},
		signOut: (options) => {
			try {
				if (!options?.soft) {
				}
			} catch {
			} finally {
				if (!options?.soft) {
					Cookies.set("color-zen", "", { expires: 0 })
					window.location.replace("/")
					window.localStorage.removeItem("color-zen-user")
				}
				set({ user: null })
			}
		},
	})
)

export { useUserStore }

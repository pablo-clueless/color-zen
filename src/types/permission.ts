import { UserProps } from "./user"

export enum PermissionLevel {
	Save = "Save",
}

export type PermissionMap = {
	isNotSigned: PermissionLevel[]
	isSigned: PermissionLevel[]
	isPremium: PermissionLevel[]
}

export type HasPermissionProps = {
	__typename?: "HasPermission"
	permission: PermissionLevel
	user: UserProps
}

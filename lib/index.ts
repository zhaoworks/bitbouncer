export type Permissions = Record<string | number, boolean>

/**
 * Creates a permission bouncer.
 */
function from<PermissionList extends Permissions>(permissions: PermissionList) {
    const bouncer: Record<string, number> = Object.keys(permissions).reduce(
        (set: Record<string, number>, permission: string, index: number) => {
            set[permission] = 1 << index
            return set
        },
        {}
    )

    function from(bit: number) {
        return Object.keys(bouncer).reduce((permissions: Permissions, permission: string) => {
            if ((bit & bouncer[permission]) === bouncer[permission]) {
                permissions[permission] = true
            }

            return permissions
        }, {})
    }

    function create(permissionsSet: Partial<PermissionList>) {
        let bit = 0

        for (const permission of Object.keys(permissionsSet)) {
            if (permissionsSet[permission] === true) {
                bit |= bouncer[permission]
            }
        }

        return bit
    }

    function can(bit: number, permission: keyof PermissionList) {
        const permissionBit = bouncer[permission as string | number]
        return (bit & permissionBit) === permissionBit
    }

    function allow(bit: number, permission: keyof PermissionList) {
        const permissionBit = bouncer[permission as string | number]
        return bit | permissionBit
    }

    function deny(bit: number, permission: keyof PermissionList) {
        const permissionBit = bouncer[permission as string | number]
        return bit & ~permissionBit
    }

    return { from, can, create, allow, deny }
}

export default { from }

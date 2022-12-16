export type Flags = Record<string | number, boolean | number>

/**
 * Creates a flag bouncer.
 */
function from<FlagList extends Flags>(flags: FlagList) {
    const bouncer: Record<string, number> = Object.keys(flags).reduce(
        (set: Record<string, number>, flag: string, index: number) => {
            set[flag] = 1 << index
            return set
        },
        {}
    )

    function from(bit: number) {
        return Object.keys(bouncer).reduce((flags: Flags, flag: string) => {
            if ((bit & bouncer[flag]) === bouncer[flag]) {
                flags[flag] = true
            }

            return flags
        }, {})
    }

    function create(flagsSet: Partial<FlagList>) {
        let bit = 0

        for (const flag of Object.keys(flagsSet)) {
            if (flagsSet[flag] === true) {
                bit |= bouncer[flag]
            }
        }

        return bit
    }

    function can(bit: number, flag: keyof FlagList) {
        const flagBit = bouncer[flag as string | number]
        return (bit & flagBit) === flagBit
    }

    function allow(bit: number, flag: keyof FlagList) {
        const flagBit = bouncer[flag as string | number]
        return bit | flagBit
    }

    function deny(bit: number, flag: keyof FlagList) {
        const flagBit = bouncer[flag as string | number]
        return bit & ~flagBit
    }

    return { from, can, create, allow, deny }
}

export default { from }

import bitbouncer from '../lib'

describe('BitBouncer', () => {
    it('can create a bouncer', () => {
        const bouncer = bitbouncer.from({
            create_post: true,
            remove_post: true
        })

        expect(bouncer).toHaveProperty('can')
        expect(bouncer).toHaveProperty('allow')
        expect(bouncer).toHaveProperty('deny')

        expect(bouncer).toHaveProperty('create')
        expect(bouncer).toHaveProperty('from')
    })

    describe('Bouncer', () => {
        const bouncer = bitbouncer.from({
            create_post: true,
            remove_post: true,
            edit_post: true
        })

        it('from(bit): should be able to parse permission bits correctly', () => {
            const permissions = bouncer.from(1 << 0)

            expect(permissions.create_post).toBeTruthy()
        })

        it('from(bit): should not include invalid permissions', () => {
            const permissions = bouncer.from((1 << 0) | (1 << 3))

            expect(permissions).toMatchObject({
                create_post: true
            })
        })

        it('create(permissions): should output a valid permission bit', () => {
            const bit = bouncer.create({ edit_post: true })
            expect(bit).toBe(1 << 2)
        })

        it('create(permissions): should output a zero permission bit for invalid permission given', () => {
            // @ts-ignore
            const bit = bouncer.create({ not: true })
            expect(bit).toBe(0)
        })

        it('create(permissions): should not include invalid permissions', () => {
            // @ts-ignore
            const bit = bouncer.create({ not: true, create_post: true })
            expect(bit).toBe(1 << 0)
        })

        describe('Permission Check', () => {
            it('can(bit, permission): should be true for existing permissions', () => {
                const bit = bouncer.create({ create_post: true })

                expect(bouncer.can(bit, 'edit_post')).toBe(false)
                expect(bouncer.can(bit, 'create_post')).toBe(true)
            })

            it('can(bit, permission): should not be true when not-allowed permissions are given', () => {
                const bit = bouncer.create({ create_post: true })

                expect(bouncer.can(bit, 'edit_post')).toBe(false)
                expect(bouncer.can(bit, 'remove_post')).toBe(false)
            })

            it('allow(bit, permission): should change the bit permission to equivalent permission', () => {
                const bit = bouncer.create({ create_post: true })

                expect(bouncer.allow(bit, 'remove_post')).toBe((1 << 0) | (1 << 1))
                expect(bouncer.allow(bit, 'edit_post')).toBe((1 << 0) | (1 << 2))
            })

            it('deny(bit, permission): should change the bit permission to equivalent permission', () => {
                const bit = bouncer.create({ create_post: true })

                expect(bouncer.deny(bit, 'create_post')).toBe(0 << 0)
                expect(bouncer.deny(bit, 'edit_post')).toBe(1 << 0)
            })
        })
    })
})

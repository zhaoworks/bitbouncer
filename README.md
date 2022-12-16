#### ~/bitbouncer

A tiny library for handling `bitflags`.

###### What are `bitflags`?

Bitflags is an limited array of bits. This library can write and read `0` and `1` values on `bitflags` as checked or unchecked.

Allowing the end-developer to create permissions or flag features with lower cost and lower effort.

###### Getting Started

```sh
# NPM
npm install bitbouncer

# Yarn
yarn install bitbouncer
```

```ts
import bitbouncer from 'bitbouncer'

const flags = bitbouncer.from({
    CREATE_WORKSPACE: true,
    MANAGE_WORKSPACE: true,
    INVITE_TO_WORKSPACE: true
})

const bit = flags.create({
    CREATE_WORKSPACE: true,
    MANAGE_WORKSPACE: true
})

flags.can(bit, 'CREATE_WORKSPACE') // => true
flags.can(bit, 'INVITE_TO_WORKSPACE') // => false

const bitWithInviteToWorkspace = flags.allow(bit, 'INVITE_TO_WORKSPACE')
const bitWithoutManageWorkspace = flags.deny(bit, 'MANAGE_WORKSPACE')
```

###### License

> `bitbouncer` is licensed under:
> [MIT](/LICENSE) &copy; [@sxhk0](https://github.com/sxhk0/)

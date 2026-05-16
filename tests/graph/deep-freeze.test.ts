import * as assert from 'assert'

import {
  deepFreeze,
} from '../../graph/immutable'

const frozenObject =
  deepFreeze({
    level1: {
      level2: {
        value: 'sealed',
      },
    },
    array: [
      {
        id: 'a',
      },
    ],
    map: new Map([
      [
        'key',
        {
          nested: true,
        },
      ],
    ]),
    set: new Set([
      {
        marker: 'x',
      },
    ]),
  })

assert.ok(
  Object.isFrozen(
    frozenObject
  )
)

assert.ok(
  Object.isFrozen(
    frozenObject.level1
  )
)

assert.ok(
  Object.isFrozen(
    frozenObject.level1.level2
  )
)

assert.ok(
  Object.isFrozen(
    frozenObject.array
  )
)

assert.ok(
  Object.isFrozen(
    frozenObject.map
  )
)

assert.ok(
  Object.isFrozen(
    frozenObject.set
  )
)

assert.throws(() => {
  const mutableArray =
    frozenObject.array as unknown as unknown[]

  mutableArray.push({
    injected: true,
  })
})

console.log(
  'deep-freeze.test.ts passed'
)

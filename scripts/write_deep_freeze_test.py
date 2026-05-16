from pathlib import Path

content = """import * as assert from 'assert'

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
  (
    frozenObject.array
      as unknown as unknown[]
  ).push({
    injected: true,
  })
})

console.log(
  'deep-freeze.test.ts passed'
)
"""

target =
  Path(
    'tests/graph/deep-freeze.test.ts'
  )

target.write_text(
  content,
  encoding='utf-8',
)

print(
  'deep-freeze.test.ts written successfully'
)

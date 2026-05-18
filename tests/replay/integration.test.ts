import * as assert from 'assert'

import {
  certifyReplay,
} from '../../replay/certify'

const projection = [
  {
    executionId: 'root',
    parentExecutionId: null,
    ordinal: 0,
    timestamp: '2026-01-01T00:00:00Z',
  },
  {
    executionId: 'child-a',
    parentExecutionId: 'root',
    ordinal: 1,
    timestamp: '2026-01-01T00:00:01Z',
  },
  {
    executionId: 'child-b',
    parentExecutionId: 'root',
    ordinal: 2,
    timestamp: '2026-01-01T00:00:02Z',
  },
] as const

const left =
  certifyReplay(
    projection
  )

const right =
  certifyReplay(
    projection
  )

assert.deepStrictEqual(
)

assert.deepStrictEqual(
  left.traversal,
  right.traversal
)

assert.deepStrictEqual(
  left.traversalHash,
  right.traversalHash
)

console.log(
  'integration.test.ts passed'
)

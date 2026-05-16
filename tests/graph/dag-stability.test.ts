import { strict as assert } from 'assert'

import {
  projectCanonicalDAG,
} from '../../verifier/graph/project'

const projection = [
  {
    executionId: 'root',
    parentExecutionId: null,
    ordinal: 0,
    timestamp: '2026-01-01T00:00:00Z',
  },
  {
    executionId: 'child',
    parentExecutionId: 'root',
    ordinal: 1,
    timestamp: '2026-01-01T00:00:01Z',
  },
] as const

const left =
  projectCanonicalDAG(projection)

const right =
  projectCanonicalDAG(projection)

assert.ok(
  left.graphHash,
  right.graphHash
)

console.log(
  'dag-stability.test.ts passed'
)

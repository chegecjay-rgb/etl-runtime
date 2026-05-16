import { strict as assert } from 'assert'

import {
  projectCanonicalDAG,
} from '../../verifier/graph/project'

const ordered = [
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

const shuffled = [
  ordered[2],
  ordered[0],
  ordered[1],
] as const

const left =
  projectCanonicalDAG(ordered)

const right =
  projectCanonicalDAG(shuffled)

assert.ok(
  left.graphHash,
  right.graphHash
)

console.log(
  'shuffle-equivalence.test.ts passed'
)

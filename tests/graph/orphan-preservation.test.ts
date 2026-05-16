import * as assert from 'assert'

import {
  projectCanonicalDAG,
} from '../../verifier/graph/project'

const projection = [
  {
    executionId: 'orphan-child',
    parentExecutionId: 'missing-parent',
    ordinal: 0,
    timestamp: '2026-01-01T00:00:00Z',
  },
] as const

const dag =
  projectCanonicalDAG(
    projection
  )

assert.strictEqual(
  dag.orphans.length,
  1
)

assert.strictEqual(
  dag.edges.length,
  0
)

console.log(
  'orphan-preservation.test.ts passed'
)

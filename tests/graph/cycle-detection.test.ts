import { strict as assert } from 'assert'

import {
  validateCanonicalDAG,
} from '../../verifier/graph/validate'

assert.throws(() => {
  validateCanonicalDAG({
    graphHash: 'cycle-test',
    nodes: [],
    edges: [],
    adjacency: new Map([
      ['a', ['b']],
      ['b', ['a']],
    ]),
    reverseAdjacency: new Map(),
    roots: [],
    orphans: [],
  })
})

console.log(
  'cycle-detection.test.ts passed'
)

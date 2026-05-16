import { strict as assert } from 'assert'

import {
  depthFirstTraversal,
} from '../../graph/depth-first'

import {
  assertTraversalEquivalence,
} from '../../graph/traversal-certify'

const adjacency =
  new Map<string, readonly string[]>([
    ['root', ['child-a', 'child-b']],
    ['child-a', []],
    ['child-b', []],
  ])

const left =
  depthFirstTraversal(
    'root',
    adjacency
  )

const right =
  depthFirstTraversal(
    'root',
    adjacency
  )

assertTraversalEquivalence(
  left,
  right
)

assert.deepStrictEqual(
  left,
  ['root', 'child-a', 'child-b']
)

console.log(
  'traversal-stability.test.ts passed'
)

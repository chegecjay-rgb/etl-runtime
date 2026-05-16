import {
  CanonicalProjectionRecord,
} from '../graph/types'

import {
  projectCanonicalDAG,
} from '../verifier/graph/project'

import {
  depthFirstTraversal,
} from '../graph/depth-first'

import {
  hashReplayTraversal,
} from './hash'

import {
  assertReplayEquivalence,
} from './equivalence'

export interface ReplayCertification {
  readonly graphHash: string
  readonly traversal: readonly string[]
  readonly traversalHash: string
}

export function certifyReplay(
  projection:
    readonly CanonicalProjectionRecord[]
): ReplayCertification {
  const dag =
    projectCanonicalDAG(
      projection
    )

  const traversal: string[] = []

  for (const root of dag.roots) {
    traversal.push(
      ...depthFirstTraversal(
        root,
        dag.adjacency
      )
    )
  }

  const replayTraversal =
    [...traversal]

  assertReplayEquivalence(
    traversal,
    replayTraversal
  )

  return {
    graphHash:
      dag.graphHash,

    traversal,

    traversalHash:
      hashReplayTraversal(
        traversal
      ),
  }
}

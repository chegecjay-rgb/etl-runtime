import {
  CanonicalGraphEdge,
  CanonicalGraphNode,
} from '../../graph/types'

import {
  createEdge,
} from '../../graph/edges'

import {
  assertNoSelfCycle,
} from '../../graph/cycles'

export function materializeEdges(
  nodes: readonly CanonicalGraphNode[]
): readonly CanonicalGraphEdge[] {
  const executionMap =
    new Map(
      nodes.map((node) => [
        node.executionId,
        node,
      ])
    )

  const edges:
    CanonicalGraphEdge[] = []

  for (const node of nodes) {
    if (
      node.parentExecutionId === null
    ) {
      continue
    }

    const parent =
      executionMap.get(
        node.parentExecutionId
      )

    if (!parent) {
      continue
    }

    assertNoSelfCycle(
      parent.nodeId,
      node.nodeId
    )

    edges.push(
      createEdge(
        parent.nodeId,
        node.nodeId,
        node.ordinal
      )
    )
  }

  return Object.freeze(edges)
}

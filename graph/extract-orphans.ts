import {
  CanonicalGraphNode,
} from './types'

import {
  sortTraversalRoots,
} from './traversal'

export function extractOrphanNodeIds(
  nodes: readonly CanonicalGraphNode[]
): readonly string[] {
  const executionIds =
    new Set(
      nodes.map(
        (node) =>
          node.executionId
      )
    )

  return sortTraversalRoots(
    nodes
      .filter((node) => {
        if (
          node.parentExecutionId ===
          null
        ) {
          return false
        }

        return !executionIds.has(
          node.parentExecutionId
        )
      })
      .map(
        (node) => node.nodeId
      )
  )
}

import {
  CanonicalGraphNode,
} from './types'

import {
  sortTraversalRoots,
} from './traversal'

export function extractRootNodeIds(
  nodes: readonly CanonicalGraphNode[]
): readonly string[] {
  return sortTraversalRoots(
    nodes
      .filter(
        (node) =>
          node.parentExecutionId ===
          null
      )
      .map(
        (node) => node.nodeId
      )
  )
}

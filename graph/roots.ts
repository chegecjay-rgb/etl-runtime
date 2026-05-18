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
          node.parents[0] ===
          null
      )
      .map(
        (node) => node.id
      )
  )
}

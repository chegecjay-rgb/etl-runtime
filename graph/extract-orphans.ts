import type { CanonicalGraphNode } from "./types.js";

import {
  sortTraversalRoots,
} from './traversal.js'

export function extractOrphanNodeIds(
  nodes: readonly CanonicalGraphNode[]
): readonly string[] {
  const executionIds =
    new Set(
      nodes.map(
        (node) =>
          node.id
      )
    )

  return sortTraversalRoots(
    nodes
      .filter((node) => {
        if (
          node.parents[0] ===
          null
        ) {
          return false
        }

        return !executionIds.has(
          node.parents[0]
        )
      })
      .map(
        (node) => node.id
      )
  )
}

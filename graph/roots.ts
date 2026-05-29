import type { CanonicalGraphNode } from "./types.js";

import {
  sortTraversalRoots,
} from './traversal.js'

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

import type { CanonicalGraphNode } from "./types.js";

export function indexNodes(
  nodes: readonly CanonicalGraphNode[]
): ReadonlyMap<
  string,
  CanonicalGraphNode
> {
  return new Map(
    nodes.map((node) => [
      node.id,
      node,
    ])
  )
}

import type { CanonicalGraph, CanonicalGraphEdge, CanonicalGraphNode } from "../../graph/types.js";

export function constructCanonicalGraph(
  nodes: readonly CanonicalGraphNode[]
): CanonicalGraph {
  const edges: CanonicalGraphEdge[] = [];

  for (const node of nodes) {
    node.parents.forEach(
      (parent, index) => {
        edges.push(
          Object.freeze({
            from: parent,
            to: node.id,
            ordinal: index
          })
        );
      }
    );
  }

  return Object.freeze({
    nodes: Object.freeze(
      [...nodes]
    ),
    edges: Object.freeze(
      edges
    )
  });
}

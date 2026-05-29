import type { CanonicalGraph, CanonicalGraphEdge } from "../../graph/types.js";

export function linkGraph(
  graph: CanonicalGraph
): CanonicalGraph {

  const edges: CanonicalGraphEdge[] = [];

  graph.nodes.forEach((node) => {
    node.parents.forEach((parent, index) => {
      edges.push({
        from: parent,
        to: node.id,
        ordinal: index
      });
    });
  });

  return Object.freeze({
    nodes: graph.nodes,
    edges: Object.freeze(edges)
  });
}

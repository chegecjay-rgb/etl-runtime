import {
  CanonicalAdjacencyMap,
  CanonicalGraph
} from "./types.js";

export function createReverseAdjacencyMap(
  graph: CanonicalGraph
): CanonicalAdjacencyMap {

  const adjacency = new Map<string, string[]>();

  graph.nodes.forEach((node) => {
    adjacency.set(node.id, []);
  });

  graph.edges.forEach((edge) => {
    const current = adjacency.get(edge.to) ?? [];
    current.push(edge.from);
    adjacency.set(edge.to, current);
  });

  return adjacency;
}

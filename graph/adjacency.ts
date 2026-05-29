import {
  CanonicalAdjacencyMap,
  CanonicalGraph
} from "./types.js";

export function buildAdjacencyMap(
  graph: CanonicalGraph
): CanonicalAdjacencyMap {

  const adjacency =
    new Map<string, string[]>();

  for (const node of graph.nodes) {
    adjacency.set(node.id, []);
  }

  for (const edge of graph.edges) {

    const current =
      adjacency.get(edge.from);

    if (!current) {
      continue;
    }

    current.push(edge.to);

    current.sort((a, b) =>
      a.localeCompare(b, "en")
    );
  }

  return adjacency;
}

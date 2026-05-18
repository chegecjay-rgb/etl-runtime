import {
  CanonicalAdjacencyMap,
  CanonicalGraph
} from "./types";

export function buildAdjacencyMap(
  graph: CanonicalGraph
): CanonicalAdjacencyMap {
  const adjacency =
    new Map<string, string[]>();

  for (const node of graph.nodes) {
    adjacency.set(node.id, []);
  }

  for (const edge of graph.edges) {
    const children =
      adjacency.get(edge.from);

    if (children) {
      children.push(edge.to);
      continue;
    }

    adjacency.set(
      edge.from,
      [edge.to]
    );
  }

  const normalized:
    [string, readonly string[]][] =
      [...adjacency.entries()]
        .map(
          (
            [key, value]
          ): [string, readonly string[]] => [
            key,
            Object.freeze(
              [...value].sort()
            )
          ]
        )
        .sort(
          (
            left,
            right
          ) =>
            left[0].localeCompare(
              right[0]
            )
        );

  return new Map<
    string,
    readonly string[]
  >(normalized);
}

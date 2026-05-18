import {
  CanonicalGraph,
  CanonicalGraphEdge
} from "./types";

export function deriveCanonicalEdges(
  graph: CanonicalGraph
): readonly CanonicalGraphEdge[] {
  const edges: CanonicalGraphEdge[] = [];

  for (const node of graph.nodes) {
    node.parents.forEach(
      (
        parent,
        ordinal
      ) => {
        edges.push(
          Object.freeze({
            from: parent,
            to: node.id,
            ordinal
          })
        );
      }
    );
  }

  return Object.freeze(
    edges.slice().sort(
      (left, right) => {
        if (left.from !== right.from) {
          return left.from.localeCompare(
            right.from
          );
        }

        if (left.to !== right.to) {
          return left.to.localeCompare(
            right.to
          );
        }

        return (
          left.ordinal -
          right.ordinal
        );
      }
    )
  );
}

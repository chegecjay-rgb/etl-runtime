import type { CanonicalGraph, CanonicalGraphEdge, CanonicalGraphNode } from "./types.js";

import { sortNodes } from "./sort-nodes.js";

function sortEdges(
  edges: readonly CanonicalGraphEdge[]
): readonly CanonicalGraphEdge[] {

  return Object.freeze(
    [...edges].sort((left, right) => {

      const fromOrder =
        left.from.localeCompare(right.from, "en");

      if (fromOrder !== 0) {
        return fromOrder;
      }

      const toOrder =
        left.to.localeCompare(right.to, "en");

      if (toOrder !== 0) {
        return toOrder;
      }

      return left.ordinal - right.ordinal;
    })
  );
}

export function normalizeGraph(
  graph: CanonicalGraph
): CanonicalGraph {

  const normalizedNodes =
    sortNodes(graph.nodes).map(
      (node): CanonicalGraphNode =>
        Object.freeze({
          id: node.id,
          parents: Object.freeze(
            [...node.parents].sort((a, b) =>
              a.localeCompare(b, "en")
            )
          ),
          authority: node.authority
        })
    );

  return Object.freeze({
    nodes: Object.freeze(normalizedNodes),
    edges: sortEdges(graph.edges)
  });
}

export function stableStringify(
  graph: CanonicalGraph
): string {

  return JSON.stringify(
    normalizeGraph(graph),
    null,
    2
  );
}

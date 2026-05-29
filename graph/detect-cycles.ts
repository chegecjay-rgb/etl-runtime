import {
  CanonicalGraph,
  CanonicalGraphNode
} from "./types.js";

import {
  buildAdjacencyMap
} from "./adjacency-map.js";

export type CanonicalCycle = Readonly<{
  path: readonly string[];
}>;

export function detectCycles(
  graph: CanonicalGraph
): readonly CanonicalCycle[] {
  const adjacency =
    buildAdjacencyMap(graph);

  const visited =
    new Set<string>();

  const active =
    new Set<string>();

  const cycles:
    CanonicalCycle[] = [];

  function visit(
    nodeId: string,
    path: readonly string[]
  ): void {
    if (active.has(nodeId)) {
      cycles.push(
        Object.freeze({
          path: [...path, nodeId]
        })
      );
      return;
    }

    if (visited.has(nodeId)) {
      return;
    }

    visited.add(nodeId);
    active.add(nodeId);

    const children =
      adjacency.get(nodeId) ?? [];

    for (const child of children) {
      visit(
        child,
        [...path, nodeId]
      );
    }

    active.delete(nodeId);
  }

  for (const node of graph.nodes) {
    visit(node.id, []);
  }

  return Object.freeze(cycles);
}

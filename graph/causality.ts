import {
  CanonicalGraph
} from "./types";

export type CanonicalCycle =
  readonly string[];

export type CanonicalCausalityValidation =
  Readonly<{
    state:
      | "VALID"
      | "INVALID";
    cycles:
      readonly CanonicalCycle[];
  }>;

export function validateCausality(
  graph: CanonicalGraph
): CanonicalCausalityValidation {

  const adjacency =
    new Map<string, string[]>();

  for (const node of graph.nodes) {
    adjacency.set(
      node.id,
      [...node.parents]
    );
  }

  const visited =
    new Set<string>();

  const active =
    new Set<string>();

  const cycles: string[][] = [];

  function dfs(
    nodeId: string,
    path: string[]
  ): void {

    if (active.has(nodeId)) {

      const index =
        path.indexOf(nodeId);

      cycles.push([
        ...path.slice(index),
        nodeId
      ]);

      return;
    }

    if (visited.has(nodeId)) {
      return;
    }

    visited.add(nodeId);
    active.add(nodeId);

    const parents =
      adjacency.get(nodeId) ?? [];

    for (const parentId of parents) {
      dfs(
        parentId,
        [...path, parentId]
      );
    }

    active.delete(nodeId);
  }

  for (const node of graph.nodes) {
    dfs(node.id, [node.id]);
  }

  return Object.freeze({
    state:
      cycles.length === 0
        ? "VALID"
        : "INVALID",
    cycles: Object.freeze(
      cycles.map(
        (cycle) =>
          Object.freeze(cycle)
      )
    )
  });
}

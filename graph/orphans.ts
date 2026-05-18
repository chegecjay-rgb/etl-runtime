export type CanonicalOrphanEntry = Readonly<{
  nodeId: string;
  missingParents: readonly string[];
}>;

export type CanonicalOrphanValidation = Readonly<{
  state: "VALID" | "INVALID";
  entries: readonly CanonicalOrphanEntry[];
}>;

import {
  CanonicalGraph
} from "./types";

export function validateOrphans(
  graph: CanonicalGraph
): CanonicalOrphanValidation {

  const nodeIds = new Set(
    graph.nodes.map((node) => node.id)
  );

  const entries: CanonicalOrphanEntry[] = [];

  for (const node of graph.nodes) {

    const missingParents =
      node.parents.filter(
        (parentId) => !nodeIds.has(parentId)
      );

    if (missingParents.length > 0) {
      entries.push(
        Object.freeze({
          nodeId: node.id,
          missingParents: Object.freeze(
            [...missingParents].sort()
          )
        })
      );
    }
  }

  return Object.freeze({
    state:
      entries.length === 0
        ? "VALID"
        : "INVALID",
    entries: Object.freeze(entries)
  });
}

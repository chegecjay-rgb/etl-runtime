import type { CanonicalGraph } from "./types.js";

import type { ConsistencyState } from "./states.js";

export interface TopologyValidation {
  readonly state: ConsistencyState;
  readonly cycles: readonly string[];
}

export function validateTopology(graph: CanonicalGraph): TopologyValidation {
  const ids = new Set(graph.nodes.map((node) => node.id));
  const cycles = new Set<string>();

  for (const node of graph.nodes) {
    for (const parent of node.parents) {
      if (parent === node.id || !ids.has(parent)) {
        cycles.add(node.id);
      }
    }
  }

  return Object.freeze({
    state: cycles.size === 0 ? "VALID" : "INVALID",
    cycles: Object.freeze([...cycles].sort())
  });
}

import {
  CanonicalGraph,
  CanonicalGraphNode
} from "./types.js";

import {
  normalizeGraph
} from "./normalize.js";

function compareText(left: string, right: string): number {
  return left.localeCompare(right, "en");
}

export interface TraversalResult {
  readonly ordered: readonly CanonicalGraphNode[];
}

export function sortTraversalRoots(roots: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(roots)].sort(compareText));
}

export function extractTraversalRoots(graph: CanonicalGraph): readonly string[] {
  const normalized = normalizeGraph(graph);
  return sortTraversalRoots(
    normalized.nodes.filter((node) => node.parents.length === 0).map((node) => node.id)
  );
}

export function canonicalTraversal(graph: CanonicalGraph): TraversalResult {
  const normalized = normalizeGraph(graph);
  const ordered = normalized.nodes.slice().sort((left, right) => {
    if (left.parents.length !== right.parents.length) {
      return left.parents.length - right.parents.length;
    }
    return compareText(left.id, right.id);
  });

  return Object.freeze({
    ordered: Object.freeze(ordered)
  });
}

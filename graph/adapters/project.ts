import type { CanonicalGraph, CanonicalGraphEdge, CanonicalGraphNode, CanonicalProjectionRecord } from "../types.js";

export function projectCanonicalGraph(
  records: readonly CanonicalProjectionRecord[]
): CanonicalGraph {

  const nodes: CanonicalGraphNode[] = records.map((record) => ({
    id: record.executionId,
    parents: record.parentExecutionId
      ? [record.parentExecutionId]
      : [],
    authority: record.authority ?? "UNKNOWN"
  }));

  const edges: CanonicalGraphEdge[] = records
    .filter((record) => record.parentExecutionId !== null)
    .map((record, index) => ({
      from: record.parentExecutionId as string,
      to: record.executionId,
      ordinal: index
    }));

  return Object.freeze({
    nodes: Object.freeze(nodes),
    edges: Object.freeze(edges)
  });
}

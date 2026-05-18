import {
  CanonicalGraph,
  CanonicalGraphNode,
  CanonicalGraphEdge,
  CanonicalProjectionRecord
} from "../../graph/types";

export function projectRecords(
  records:
    readonly CanonicalProjectionRecord[]
): CanonicalGraph {

  const nodes:
    CanonicalGraphNode[] = [];

  const edges:
    CanonicalGraphEdge[] = [];

  for (const record of records) {

    const parents =
      record.parentExecutionId
        ? [record.parentExecutionId]
        : [];

    nodes.push(
      Object.freeze({
        id: record.executionId,
        parents,
        authority:
          record.authority ??
          "UNKNOWN"
      })
    );

    if (
      record.parentExecutionId
    ) {
      edges.push(
        Object.freeze({
          from:
            record.parentExecutionId,
          to:
            record.executionId,
          ordinal:
            record.ordinal
        })
      );
    }
  }

  return Object.freeze({
    nodes:
      Object.freeze(nodes),
    edges:
      Object.freeze(edges)
  });
}

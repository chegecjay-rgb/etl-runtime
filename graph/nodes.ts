import {
  CanonicalGraphNode,
  CanonicalProjectionRecord
} from "./types";

export function projectionNode(
  record: CanonicalProjectionRecord
): CanonicalGraphNode {

  return Object.freeze({
    id: record.executionId,
    parents: record.parentExecutionId
      ? [record.parentExecutionId]
      : [],
    authority: record.authority ?? "UNKNOWN"
  });
}

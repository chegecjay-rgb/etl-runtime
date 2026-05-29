import type {
  CanonicalExecutionNode,
} from "./types.js";

function compareNodes(
  left: CanonicalExecutionNode,
  right: CanonicalExecutionNode,
): number {
  if (left.timestamp !== right.timestamp) {
    return left.timestamp.localeCompare(
      right.timestamp,
    );
  }

  if (
    left.executionId !== right.executionId
  ) {
    return left.executionId.localeCompare(
      right.executionId,
    );
  }

  return left.evidenceHash.localeCompare(
    right.evidenceHash,
  );
}

export function normalizeProjectionNodes(
  nodes: readonly CanonicalExecutionNode[],
): readonly CanonicalExecutionNode[] {
  return Object.freeze(
    [...nodes].sort(compareNodes),
  );
}

import type { ReconstructionError } from "./errors.js";

import type {
  CanonicalExecutionNode,
} from "./types.js";

export function validateContinuity(
  nodes: readonly CanonicalExecutionNode[],
): void {
  const identitySet = new Set<string>();

  for (const node of nodes) {
    if (identitySet.has(node.executionId)) {
      throw new ReconstructionError(
        "DUPLICATE_NODE",
        `Duplicate node '${node.executionId}' detected`,
      );
    }

    identitySet.add(node.executionId);

    if (
      node.continuityState === "resolved" &&
      node.parentExecutionId === null
    ) {
      throw new ReconstructionError(
        "INVALID_RESOLVED_PARENT",
        `Resolved node '${node.executionId}' has null parent`,
      );
    }

    if (
      node.continuityState === "root" &&
      node.parentExecutionId !== null
    ) {
      throw new ReconstructionError(
        "INVALID_ROOT_PARENT",
        `Root node '${node.executionId}' cannot have parent`,
      );
    }

    if (
      node.continuityState ===
        "unknown-parent" &&
      node.lineageDepth !== null
    ) {
      throw new ReconstructionError(
        "INVALID_UNKNOWN_DEPTH",
        `Unknown parent node '${node.executionId}' cannot have lineage depth`,
      );
    }
  }
}

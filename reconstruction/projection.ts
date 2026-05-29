import type { createHash } from "node:crypto";

import type {
  CanonicalExecutionNode,
  CanonicalExecutionProjection,
} from "./types.js";

function stableSerialize(value: unknown): string {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value
      .map((entry) => stableSerialize(entry))
      .join(",")}]`;
  }

  const entries = Object.entries(
    value as Record<string, unknown>,
  ).sort(([left], [right]) =>
    left.localeCompare(right),
  );

  return `{${entries
    .map(
      ([key, entry]) =>
        `${JSON.stringify(key)}:${stableSerialize(
          entry,
        )}`,
    )
    .join(",")}}`;
}

export function createProjectionHash(
  nodes: readonly CanonicalExecutionNode[],
): string {
  const serialized = stableSerialize(nodes);

  return createHash("sha256")
    .update(serialized)
    .digest("hex");
}

export function createExecutionProjection(
  nodes: readonly CanonicalExecutionNode[],
): CanonicalExecutionProjection {
  const canonicalOrdering = nodes.map(
    (node) => node.executionId,
  );

  const roots = nodes
    .filter(
      (node) =>
        node.continuityState === "root",
    )
    .map((node) => node.executionId);

  const unresolved = nodes
    .filter(
      (node) =>
        node.continuityState ===
        "unknown-parent",
    )
    .map((node) => node.executionId);

  return Object.freeze({
    projectionHash:
      createProjectionHash(nodes),

    nodes: Object.freeze([...nodes]),

    roots: Object.freeze(roots),

    unresolved: Object.freeze(unresolved),

    canonicalOrdering:
      Object.freeze(canonicalOrdering),
  });
}

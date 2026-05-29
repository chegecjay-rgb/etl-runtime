import type { CanonicalGraphNode } from "./types.js";

export function sortNodes(
  nodes: readonly CanonicalGraphNode[]
): readonly CanonicalGraphNode[] {

  return Object.freeze(
    [...nodes].sort((left, right) =>
      left.id.localeCompare(right.id, "en")
    )
  );
}

import type { CanonicalGraph } from "./types.js";

export function replayEquals(
  left: CanonicalGraph,
  right: CanonicalGraph
): boolean {

  return JSON.stringify(left) === JSON.stringify(right);
}

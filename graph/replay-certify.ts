import {
  CanonicalGraph
} from "./types";

export function replayEquals(
  left: CanonicalGraph,
  right: CanonicalGraph
): boolean {

  return JSON.stringify(left) === JSON.stringify(right);
}

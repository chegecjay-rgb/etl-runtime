import {
  CanonicalGraph
} from "./types.js";

export function hashGraph(
  graph: CanonicalGraph
): string {

  return JSON.stringify(graph);
}

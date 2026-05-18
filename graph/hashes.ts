import {
  CanonicalGraph
} from "./types";

export function hashGraph(
  graph: CanonicalGraph
): string {

  return JSON.stringify(graph);
}

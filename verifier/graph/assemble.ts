import type { CanonicalProjectionRecord } from "../../graph/types.js";

import {
  projectCanonicalDAG
} from "./project.js";

import {
  validateGraph
} from "./validate.js";

export function assembleGraph(
  records:
    readonly CanonicalProjectionRecord[]
) {

  const graph =
    projectCanonicalDAG(records);

  const certification =
    validateGraph(graph as any);

  return Object.freeze({
    graph,
    certification
  });
}

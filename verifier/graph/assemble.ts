import {
  CanonicalProjectionRecord
} from "../../graph/types.js";

import {
  projectRecords
} from "./project.js";

import {
  validateGraph
} from "./validate.js";

export function assembleGraph(
  records:
    readonly CanonicalProjectionRecord[]
) {

  const graph =
    projectRecords(records);

  const certification =
    validateGraph(graph);

  return Object.freeze({
    graph,
    certification
  });
}

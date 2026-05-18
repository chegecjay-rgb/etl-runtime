import {
  CanonicalProjectionRecord
} from "../../graph/types";

import {
  projectRecords
} from "./project";

import {
  validateGraph
} from "./validate";

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

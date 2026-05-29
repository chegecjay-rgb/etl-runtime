import {
  CanonicalGraph
} from "../../graph/types.js";

import {
  certifyGraph
} from "../../graph/certify.js";

export function validateGraph(
  graph: CanonicalGraph
) {
  return certifyGraph(graph);
}

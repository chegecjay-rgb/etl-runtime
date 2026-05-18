import {
  CanonicalGraph
} from "../../graph/types";

import {
  certifyGraph
} from "../../graph/certify";

export function validateGraph(
  graph: CanonicalGraph
) {
  return certifyGraph(graph);
}

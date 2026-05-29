import type { CanonicalGraph } from "../../graph/types.js";
import type { validateTopology } from "../../graph/topology.js";
import type { validateCausality } from "../../graph/causality.js";
import type { validateOrphans } from "../../graph/orphans.js";
import type { validateAuthority } from "../../graph/authority.js";
import type { certifyGraph } from "../../graph/certify.js";

export function verifyGraph(graph: CanonicalGraph) {
  const validation = Object.freeze({
    topology: validateTopology(graph),
    causality: validateCausality(graph),
    orphans: validateOrphans(graph),
    authority: validateAuthority(graph)
  });

  const certification = certifyGraph(graph);

  return Object.freeze({
    validation,
    certification
  });
}

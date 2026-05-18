import { CanonicalGraph } from "../../graph/types";
import { validateTopology } from "../../graph/topology";
import { validateCausality } from "../../graph/causality";
import { validateOrphans } from "../../graph/orphans";
import { validateAuthority } from "../../graph/authority";
import { certifyGraph } from "../../graph/certify";

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

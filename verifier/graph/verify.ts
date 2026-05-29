import type { CanonicalGraph } from "../../graph/types.js";
import { validateTopology  } from "../../graph/topology.js";
import { validateCausality  } from "../../graph/causality.js";
import { validateOrphans  } from "../../graph/orphans.js";
import { validateAuthority  } from "../../graph/authority.js";
import { certifyGraph  } from "../../graph/certify.js";

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

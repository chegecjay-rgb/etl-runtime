import type { admitEvidence } from "../../ingestion/admission.js"

import {
  buildReplayDiagnostic,
} from "../../ingestion/diagnostics.js"

export function certifyReplay(
  evidence: readonly unknown[],
) {
  const admitted =
    admitEvidence(evidence)

  return buildReplayDiagnostic(
    admitted.canonicalSet
      .canonicalSetDigest,
    admitted.canonicalSet
      .orderingDigest,
    admitted.canonicalSet
      .evidence.length,
  )
}

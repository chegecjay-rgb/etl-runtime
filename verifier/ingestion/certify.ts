import { admitEvidence } from "../../ingestion/admission"

import {
  buildReplayDiagnostic,
} from "../../ingestion/diagnostics"

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

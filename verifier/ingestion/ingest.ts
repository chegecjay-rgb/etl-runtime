import type { admitEvidence } from "../../ingestion/admission.js"

export function ingestEvidence(
  evidence: readonly unknown[],
) {
  return admitEvidence(evidence)
}

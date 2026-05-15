import { admitEvidence } from "../../ingestion/admission"

export function ingestEvidence(
  evidence: readonly unknown[],
) {
  return admitEvidence(evidence)
}

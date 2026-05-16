import type {
  CanonicalEvidenceRecord,
} from "./types";

import {
  deepFreeze,
} from "./immutable";

function compareEvidence(
  left: CanonicalEvidenceRecord,
  right: CanonicalEvidenceRecord,
): number {
  if (left.timestamp !== right.timestamp) {
    return left.timestamp.localeCompare(
      right.timestamp,
    );
  }

  if (
    left.executionId !==
    right.executionId
  ) {
    return left.executionId.localeCompare(
      right.executionId,
    );
  }

  return left.evidenceHash.localeCompare(
    right.evidenceHash,
  );
}

export function canonicalizeEvidence(
  evidence:
    readonly CanonicalEvidenceRecord[],
): readonly CanonicalEvidenceRecord[] {
  return deepFreeze(
    [...evidence].sort(compareEvidence),
  );
}

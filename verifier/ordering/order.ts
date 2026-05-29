import {
  DeterministicOrdering
} from "../../types/ordering.js";

export interface CanonicalEvidence {
  readonly id: string;
  readonly timestamp: number;
  readonly authority: string;
  readonly type: string;
  readonly hash: string;
}

export function canonicalEvidenceComparator(
  left: Readonly<CanonicalEvidence>,
  right: Readonly<CanonicalEvidence>
): DeterministicOrdering {
  if (left.timestamp < right.timestamp) return -1;
  if (left.timestamp > right.timestamp) return 1;
  if (left.authority < right.authority) return -1;
  if (left.authority > right.authority) return 1;
  if (left.type < right.type) return -1;
  if (left.type > right.type) return 1;
  if (left.hash < right.hash) return -1;
  if (left.hash > right.hash) return 1;
  if (left.id < right.id) return -1;
  if (left.id > right.id) return 1;
  return 0;
}

export type EvidenceComparator<T> = (
  left: Readonly<T>,
  right: Readonly<T>
) => DeterministicOrdering;

export function stableCanonicalSort<T>(
  values: readonly T[],
  comparator: EvidenceComparator<T>
): readonly T[] {
  const cloned = [...values];

  cloned.sort((left, right) => {
    const result = comparator(left, right);

    if (
      result !== -1 &&
      result !== 0 &&
      result !== 1
    ) {
      throw new Error(
        "Comparator produced invalid deterministic ordering"
      );
    }

    return result;
  });

  return cloned;
}

export function canonicalizeEvidence(
  evidence: readonly CanonicalEvidence[]
): readonly CanonicalEvidence[] {
  return stableCanonicalSort(
    evidence,
    canonicalEvidenceComparator
  );
}

export interface ReplayIdentity {
  readonly lineageId: string;
  readonly manifestHash: string;
}

export interface DuplicateLineageConflict {
  readonly status: "REJECTED";
  readonly reason: "DUPLICATE_LINEAGE_CONFLICT";
  readonly lineageId: string;
}

export function detectDuplicateLineage(
  identities: readonly ReplayIdentity[]
): DuplicateLineageConflict | null {
  const observed = new Map<string, string>();

  for (const identity of identities) {
    const existing = observed.get(identity.lineageId);

    if (
      existing !== undefined &&
      existing !== identity.manifestHash
    ) {
      return Object.freeze({
        status: "REJECTED" as const,
        reason: "DUPLICATE_LINEAGE_CONFLICT" as const,
        lineageId: identity.lineageId
      });
    }

    observed.set(identity.lineageId, identity.manifestHash);
  }

  return null;
}

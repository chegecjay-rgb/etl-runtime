export interface ManifestConflictInput {
  readonly canonicalHash: string;
  readonly observedHash: string;
}

export interface ManifestConflictResult {
  readonly status: "REJECTED";
  readonly reason: "MANIFEST_HASH_CONFLICT";
}

export function detectManifestConflict(
  input: ManifestConflictInput
): ManifestConflictResult | null {
  if (input.canonicalHash !== input.observedHash) {
    return Object.freeze({
      status: "REJECTED" as const,
      reason: "MANIFEST_HASH_CONFLICT" as const
    });
  }

  return null;
}

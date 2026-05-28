export interface CertificationArtifact {
  readonly certificationHash: string;
  readonly canonicalHash: string;
  readonly payload: unknown;
}

export interface CertificationContainmentResult {
  readonly status: "REJECTED";
  readonly reason:
    | "CERTIFICATION_HASH_MISMATCH"
    | "CERTIFICATION_CONTAMINATION";
}

function isPlainObject(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

export function inspectCertificationArtifact(
  artifact: CertificationArtifact
): CertificationContainmentResult | null {
  if (
    artifact.certificationHash !== artifact.canonicalHash
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      reason: "CERTIFICATION_HASH_MISMATCH" as const
    });
  }

  if (!isPlainObject(artifact.payload)) {
    return Object.freeze({
      status: "REJECTED" as const,
      reason: "CERTIFICATION_CONTAMINATION" as const
    });
  }

  return null;
}

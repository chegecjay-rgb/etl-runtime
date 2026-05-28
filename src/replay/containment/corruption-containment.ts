export interface CorruptionInspection {
  readonly artifactId: string;
  readonly payload: unknown;
}

export interface CorruptionContainmentResult {
  readonly status: "REJECTED";
  readonly reason:
    | "INVALID_SERIALIZATION"
    | "STRUCTURAL_CORRUPTION";
  readonly artifactId: string;
}

function isPlainObject(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

export function inspectCorruptedArtifact(
  inspection: CorruptionInspection
): CorruptionContainmentResult | null {
  const payload = inspection.payload;

  if (!isPlainObject(payload)) {
    return Object.freeze({
      status: "REJECTED" as const,
      reason: "INVALID_SERIALIZATION" as const,
      artifactId: inspection.artifactId
    });
  }

  const entries = Object.entries(
    payload as Record<string, unknown>
  );

  for (const [key, value] of entries) {
    if (
      typeof key !== "string" ||
      value === undefined
    ) {
      return Object.freeze({
        status: "REJECTED" as const,
        reason: "STRUCTURAL_CORRUPTION" as const,
        artifactId: inspection.artifactId
      });
    }
  }

  return null;
}

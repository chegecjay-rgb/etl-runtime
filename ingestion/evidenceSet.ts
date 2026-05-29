import type { createHash } from "node:crypto"
import type { CanonicalEvidence } from "./normalize.js"

export type CanonicalEvidenceSet = Readonly<{
  evidence: readonly CanonicalEvidence[]
  orderingDigest: string
  canonicalSetDigest: string
}>

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>

    return `{${Object.keys(record)
      .sort()
      .map(
        (key) =>
          `"${key}":${stableStringify(record[key])}`,
      )
      .join(",")}}`
  }

  return JSON.stringify(value)
}

function digest(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex")
}

function orderingKey(
  evidence: CanonicalEvidence,
): string {
  return [
    evidence.kind,
    evidence.timestamp,
    evidence.id,
    digest(stableStringify(evidence.payload)),
  ].join("::")
}

export function buildCanonicalEvidenceSet(
  evidence: readonly CanonicalEvidence[],
): CanonicalEvidenceSet {
  const ordered = [...evidence].sort((a, b) =>
    orderingKey(a).localeCompare(orderingKey(b)),
  )

  const canonicalRepresentation =
    stableStringify(ordered)

  return Object.freeze({
    evidence: Object.freeze(ordered),
    orderingDigest: digest(
      ordered.map(orderingKey).join("|"),
    ),
    canonicalSetDigest: digest(
      canonicalRepresentation,
    ),
  })
}

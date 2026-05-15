import { ParsedEvidence } from "./parser"

export type CanonicalEvidence = Readonly<{
  kind: string
  id: string
  timestamp: string
  payload: Readonly<Record<string, unknown>>
}>

function deepSort(
  value: unknown,
): unknown {
  if (Array.isArray(value)) {
    return Object.freeze(value.map((entry) => deepSort(entry)))
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>

    const sortedEntries = Object.keys(record)
      .sort()
      .map((key) => [key, deepSort(record[key])] as const)

    return Object.freeze(Object.fromEntries(sortedEntries))
  }

  return value
}

export function normalizeEvidence(
  evidence: ParsedEvidence,
): CanonicalEvidence {
  return Object.freeze({
    kind: evidence.kind,
    id: evidence.id,
    timestamp: evidence.timestamp,
    payload: deepSort(evidence.payload) as Readonly<
      Record<string, unknown>
    >,
  })
}

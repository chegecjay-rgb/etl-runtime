import { reject, RejectionCode } from "./reject.js"

export function stableSortedKeys(
  value: Record<string, unknown>,
): readonly string[] {
  return Object.freeze([...Object.keys(value)].sort())
}

export function ensurePlainObject(
  value: unknown,
): Record<string, unknown> {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    reject(
      RejectionCode.INVALID_STRUCTURE,
      "expected canonical object structure",
    )
  }

  return value as Record<string, unknown>
}

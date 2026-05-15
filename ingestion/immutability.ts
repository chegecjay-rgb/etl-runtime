import {
  reject,
  RejectionCode,
} from "./reject"

export function assertDeepFrozen(
  value: unknown,
): void {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return
  }

  if (
    Object.isFrozen(value) !== true
  ) {
    reject(
      RejectionCode.MUTATION_DETECTED,
      "mutable structure detected",
    )
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      assertDeepFrozen(entry)
    }

    return
  }

  for (const key of Object.keys(
    value as Record<
      string,
      unknown
    >,
  )) {
    assertDeepFrozen(
      (
        value as Record<
          string,
          unknown
        >
      )[key],
    )
  }
}

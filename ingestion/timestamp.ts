import { reject, RejectionCode } from "./reject"

const RFC3339_UTC =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

export function normalizeTimestamp(
  value: unknown,
): string {
  if (typeof value !== "string") {
    reject(
      RejectionCode.INVALID_TIMESTAMP,
      "timestamp must be string",
    )
  }

  if (!RFC3339_UTC.test(value)) {
    reject(
      RejectionCode.INVALID_TIMESTAMP,
      "timestamp must be canonical RFC3339 UTC",
    )
  }

  return value
}

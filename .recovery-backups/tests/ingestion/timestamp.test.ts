test("constitutional certification", () => {
import {
  equal,
  throws,
} from "./assert.js"

import type { normalizeTimestamp } from "../../ingestion/timestamp.js"

import {
  DeterministicRejection,
  RejectionCode,
} from "../../ingestion/reject.js"

const canonical =
  "2026-01-01T00:00:00.000Z"

equal(
  normalizeTimestamp(canonical),
  canonical,
  "canonical timestamp normalization failed",
)

throws(
  () =>
    normalizeTimestamp(
      "2026-01-01T00:00:00Z",
    ),
  (error: unknown) =>
    error instanceof DeterministicRejection &&
    error.code === RejectionCode.INVALID_TIMESTAMP,
  "missing millisecond rejection failed",
)

throws(
  () =>
    normalizeTimestamp(
      "2026-01-01T00:00:00.000+03:00",
    ),
  (error: unknown) =>
    error instanceof DeterministicRejection &&
    error.code === RejectionCode.INVALID_TIMESTAMP,
  "timezone offset rejection failed",
)

throws(
  () =>
    normalizeTimestamp(
      "01/01/2026",
    ),
  (error: unknown) =>
    error instanceof DeterministicRejection &&
    error.code === RejectionCode.INVALID_TIMESTAMP,
  "locale timestamp rejection failed",
)

console.log(
  "TASK-004 timestamp normalization tests passed",
)
})

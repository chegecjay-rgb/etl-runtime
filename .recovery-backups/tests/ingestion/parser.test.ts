test("constitutional certification", () => {
import {
  deepEqual,
  equal,
  throws,
} from "./assert.js"

import { parseEvidence  } from "../../ingestion/parser.js"

import {
  DeterministicRejection,
  RejectionCode,
} from "../../ingestion/reject.js"

const valid = {
  id: "evidence-001",
  kind: "ERC8241_DISCLOSURE",
  payload: {
    disclosure: "canonical",
  },
  timestamp: "2026-01-01T00:00:00.000Z",
}

const parsed = parseEvidence(valid)

equal(parsed.id, valid.id, "id mismatch")

equal(parsed.kind, valid.kind, "kind mismatch")

equal(
  parsed.timestamp,
  valid.timestamp,
  "timestamp mismatch",
)

deepEqual(
  parsed.payload,
  valid.payload,
  "payload mismatch",
)

throws(
  () =>
    parseEvidence({
      ...valid,
      timestamp: "01/01/2026",
    }),
  (error: unknown) =>
    error instanceof DeterministicRejection &&
    error.code === RejectionCode.INVALID_TIMESTAMP,
  "invalid timestamp rejection failed",
)

throws(
  () =>
    parseEvidence({
      ...valid,
      kind: "UNKNOWN_KIND",
    }),
  (error: unknown) =>
    error instanceof DeterministicRejection &&
    error.code === RejectionCode.UNSUPPORTED_KIND,
  "unsupported kind rejection failed",
)

throws(
  () =>
    parseEvidence({
      id: "missing-fields",
    }),
  (error: unknown) =>
    error instanceof DeterministicRejection &&
    error.code === RejectionCode.INVALID_STRUCTURE,
  "invalid structure rejection failed",
)

throws(
  () => {
    ;(parsed.payload as Record<string, unknown>).disclosure =
      "mutated"
  },
  () => true,
  "mutation resistance failed",
)

console.log(
  "TASK-004 parser foundation tests passed",
)
})

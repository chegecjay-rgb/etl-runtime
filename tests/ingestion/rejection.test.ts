import {
  throws,
} from "./assert.js"

import type { parseEvidence } from "../../ingestion/parser.js"

import {
  DeterministicRejection,
  RejectionCode,
} from "../../ingestion/reject.js"

const base = {
  id: "evidence",
  kind: "ETNL_OUTPUT",
  timestamp:
    "2026-01-01T00:00:00.000Z",
}

throws(
  () =>
    parseEvidence({
      ...base,
      payload: {
        invalid:
          undefined,
      },
    }),
  (error: unknown) =>
    error instanceof
      DeterministicRejection &&
    error.code ===
      RejectionCode.NON_CANONICAL_FIELD,
  "undefined rejection failed",
)

throws(
  () =>
    parseEvidence({
      ...base,
      payload: {
        invalid: Symbol(
          "x",
        ),
      },
    }),
  (error: unknown) =>
    error instanceof
      DeterministicRejection &&
    error.code ===
      RejectionCode.NON_CANONICAL_FIELD,
  "symbol rejection failed",
)

throws(
  () =>
    parseEvidence({
      ...base,
      payload: {
        invalid:
          Infinity,
      },
    }),
  (error: unknown) =>
    error instanceof
      DeterministicRejection &&
    error.code ===
      RejectionCode.NON_CANONICAL_FIELD,
  "infinity rejection failed",
)

throws(
  () =>
    parseEvidence({
      ...base,
      payload: {
        invalid: () => 1,
      },
    }),
  (error: unknown) =>
    error instanceof
      DeterministicRejection &&
    error.code ===
      RejectionCode.NON_CANONICAL_FIELD,
  "function rejection failed",
)

console.log(
  "TASK-004 malformed rejection tests passed",
)

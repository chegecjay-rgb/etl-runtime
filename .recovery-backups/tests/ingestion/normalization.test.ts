test("constitutional certification", () => {
import { deepEqual } from "./assert.js"

import { normalizeEvidence  } from "../../ingestion/normalize.js"

import { parseEvidence  } from "../../ingestion/parser.js"

const a = parseEvidence({
  id: "evidence-a",
  kind: "ETNL_OUTPUT",
  payload: {
    z: 1,
    a: 2,
  },
  timestamp: "2026-01-01T00:00:00.000Z",
})

const b = parseEvidence({
  id: "evidence-a",
  kind: "ETNL_OUTPUT",
  payload: {
    a: 2,
    z: 1,
  },
  timestamp: "2026-01-01T00:00:00.000Z",
})

const normalizedA = normalizeEvidence(a)

const normalizedB = normalizeEvidence(b)

deepEqual(
  normalizedA,
  normalizedB,
  "normalization equivalence failed",
)

console.log(
  "TASK-004 normalization tests passed",
)
})

import { deepEqual } from "./assert"

import { buildCanonicalEvidenceSet } from "../../ingestion/evidenceSet"

import { normalizeEvidence } from "../../ingestion/normalize"

import { parseEvidence } from "../../ingestion/parser"

const first = normalizeEvidence(
  parseEvidence({
    id: "b",
    kind: "ETNL_OUTPUT",
    payload: {
      value: 2,
    },
    timestamp: "2026-01-01T00:00:00.000Z",
  }),
)

const second = normalizeEvidence(
  parseEvidence({
    id: "a",
    kind: "ETNL_OUTPUT",
    payload: {
      value: 1,
    },
    timestamp: "2026-01-01T00:00:00.000Z",
  }),
)

const setA = buildCanonicalEvidenceSet([
  first,
  second,
])

const setB = buildCanonicalEvidenceSet([
  second,
  first,
])

deepEqual(
  setA.canonicalSetDigest,
  setB.canonicalSetDigest,
  "canonical set digest mismatch",
)

deepEqual(
  setA.orderingDigest,
  setB.orderingDigest,
  "ordering digest mismatch",
)

console.log(
  "TASK-004 evidence-set replay stability tests passed",
)

import {
  equal,
} from "./assert"

import {
  ingestEvidence,
  certifyReplay,
} from "../../verifier/ingestion"

const evidence = [
  {
    id: "freeze-a",
    kind: "ETNL_OUTPUT",
    payload: {
      value: 1,
    },
    timestamp:
      "2026-01-01T00:00:00.000Z",
  },
]

const admitted =
  ingestEvidence(
    evidence,
  )

const replay =
  certifyReplay(
    evidence,
  )

equal(
  typeof replay
    .canonicalDigest,
  "string",
  "canonical digest missing",
)

equal(
  typeof replay
    .orderingDigest,
  "string",
  "ordering digest missing",
)

equal(
  admitted.canonicalSet
    .evidence.length,
  1,
  "incorrect evidence count",
)

console.log(
  "TASK-004 freeze readiness tests passed",
)

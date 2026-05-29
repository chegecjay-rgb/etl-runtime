import {
  deepEqual,
  equal,
} from "./assert.js"

import { admitEvidence  } from "../../ingestion/admission.js"

const input = [
  {
    id: "b",
    kind: "ETNL_OUTPUT",
    payload: {
      value: 2,
    },
    timestamp:
      "2026-01-01T00:00:00.000Z",
  },
  {
    id: "a",
    kind: "ETNL_OUTPUT",
    payload: {
      value: 1,
    },
    timestamp:
      "2026-01-01T00:00:00.000Z",
  },
]

const resultA =
  admitEvidence(input)

const resultB =
  admitEvidence([
    input[1],
    input[0],
  ])

equal(
  Object.isFrozen(
    resultA,
  ),
  true,
  "admission result must be frozen",
)

equal(
  Object.isFrozen(
    resultA.canonicalSet,
  ),
  true,
  "canonical set must be frozen",
)

deepEqual(
  resultA.canonicalSet
    .canonicalSetDigest,
  resultB.canonicalSet
    .canonicalSetDigest,
  "canonical replay equivalence failed",
)

deepEqual(
  resultA.canonicalSet
    .orderingDigest,
  resultB.canonicalSet
    .orderingDigest,
  "ordering replay equivalence failed",
)

console.log(
  "TASK-004 admission pipeline tests passed",
)

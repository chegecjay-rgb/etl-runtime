import {
  deepEqual,
  equal,
} from "./assert.js"

import {
  certifyReplay,
} from "../../verifier/ingestion/certify.js"

const firstOrder = [
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

const secondOrder = [
  firstOrder[1],
  firstOrder[0],
]

const replayA =
  certifyReplay(
    firstOrder,
  )

const replayB =
  certifyReplay(
    secondOrder,
  )

deepEqual(
  replayA,
  replayB,
  "replay certification mismatch",
)

equal(
  replayA.evidenceCount,
  2,
  "replay evidence count mismatch",
)

console.log(
  "TASK-004 replay certification tests passed",
)

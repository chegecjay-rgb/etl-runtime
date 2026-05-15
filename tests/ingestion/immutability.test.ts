import {
  equal,
} from "./assert"

import {
  admitEvidence,
} from "../../ingestion/admission"

const admitted =
  admitEvidence([
    {
      id: "immutable",
      kind: "ETNL_OUTPUT",
      payload: {
        nested: {
          value: 1,
        },
      },
      timestamp:
        "2026-01-01T00:00:00.000Z",
    },
  ])

equal(
  Object.isFrozen(
    admitted,
  ),
  true,
  "admission result not frozen",
)

equal(
  Object.isFrozen(
    admitted.parsed[0],
  ),
  true,
  "parsed evidence not frozen",
)

equal(
  Object.isFrozen(
    admitted.parsed[0]
      .payload,
  ),
  true,
  "payload not frozen",
)

equal(
  Object.isFrozen(
    admitted.parsed[0]
      .payload.nested,
  ),
  true,
  "nested payload not frozen",
)

equal(
  Object.isFrozen(
    admitted.canonicalSet,
  ),
  true,
  "canonical set not frozen",
)

console.log(
  "TASK-004 immutability certification tests passed",
)

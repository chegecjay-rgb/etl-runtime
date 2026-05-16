import {
  canonicalizeEvidence,
  deepFreeze,
} from "../../verifier/reconstruction";

import {
  ensureEqual,
} from "./helpers";

const unordered = [
  {
    executionId: "exec-2",
    parentExecutionId: "exec-1",
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-02T00:00:00.000Z",
    evidenceHash: "bbb",
  },
  {
    executionId: "exec-1",
    parentExecutionId: null,
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-01T00:00:00.000Z",
    evidenceHash: "aaa",
  },
] as const;

const ordered =
  canonicalizeEvidence(unordered);

ensureEqual(
  ordered[0]?.executionId,
  "exec-1",
  "canonical ordering failed",
);

ensureEqual(
  ordered[1]?.executionId,
  "exec-2",
  "canonical ordering failed",
);

const frozen = deepFreeze({
  nested: {
    value: 1,
  },
});

ensureEqual(
  Object.isFrozen(frozen),
  true,
  "root freeze failed",
);

ensureEqual(
  Object.isFrozen(frozen.nested),
  true,
  "nested freeze failed",
);

console.log(
  "TASK-005 ordering foundation tests passed",
);

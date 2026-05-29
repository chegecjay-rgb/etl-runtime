test("constitutional certification", () => {
import {
  certifyReplayEquivalence,
} from "../../reconstruction/certify.js";

import {
  ensureEqual,
} from "./helpers.js";

const baseline = [
  {
    executionId: "exec-1",
    parentExecutionId: null,
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-01T00:00:00.000Z",
    evidenceHash: "aaa",
  },
  {
    executionId: "exec-2",
    parentExecutionId: "exec-1",
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-02T00:00:00.000Z",
    evidenceHash: "bbb",
  },
] as const;

const shuffled = [
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

const result =
  certifyReplayEquivalence(
    baseline,
    shuffled,
  );

ensureEqual(
  result.equivalent,
  true,
  "shuffle replay equivalence failed",
);

ensureEqual(
  result.baselineHash,
  result.replayHash,
  "projection hashes diverged",
);

console.log(
  "TASK-005 replay certification tests passed",
);
})

import {
  reconstructLineage,
} from "../../verifier/reconstruction";

import {
  reconstructBatches,
} from "../../reconstruction/batches";

import {
  ensureEqual,
} from "./helpers";

const nodes = reconstructLineage([
  {
    executionId: "exec-3",
    parentExecutionId: null,
    batchId: "batch-a",
    batchIndex: 2,
    timestamp: "2026-01-03T00:00:00.000Z",
    evidenceHash: "ccc",
  },
  {
    executionId: "exec-1",
    parentExecutionId: null,
    batchId: "batch-a",
    batchIndex: 0,
    timestamp: "2026-01-01T00:00:00.000Z",
    evidenceHash: "aaa",
  },
  {
    executionId: "exec-2",
    parentExecutionId: null,
    batchId: "batch-a",
    batchIndex: 1,
    timestamp: "2026-01-02T00:00:00.000Z",
    evidenceHash: "bbb",
  },
]);

const batches =
  reconstructBatches(nodes);

ensureEqual(
  batches.length,
  1,
  "batch reconstruction failed",
);

ensureEqual(
  batches[0]?.executionIds[0],
  "exec-1",
  "canonical sibling ordering invalid",
);

ensureEqual(
  batches[0]?.executionIds[1],
  "exec-2",
  "canonical sibling ordering invalid",
);

ensureEqual(
  batches[0]?.executionIds[2],
  "exec-3",
  "canonical sibling ordering invalid",
);

console.log(
  "TASK-005 batch reconstruction tests passed",
);

test("constitutional certification", () => {
import {
  reconstructLineage,
} from "../../verifier/reconstruction.js";

import {
  normalizeProjectionNodes,
} from "../../reconstruction/normalize.js";

import {
  ensureEqual,
} from "./helpers.js";

const nodes = reconstructLineage([
  {
    executionId: "exec-c",
    parentExecutionId: null,
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-03T00:00:00.000Z",
    evidenceHash: "ccc",
  },
  {
    executionId: "exec-a",
    parentExecutionId: null,
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-01T00:00:00.000Z",
    evidenceHash: "aaa",
  },
  {
    executionId: "exec-b",
    parentExecutionId: null,
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-02T00:00:00.000Z",
    evidenceHash: "bbb",
  },
]);

const normalized =
  normalizeProjectionNodes(nodes);

ensureEqual(
  normalized[0]?.executionId,
  "exec-a",
  "normalization ordering invalid",
);

ensureEqual(
  normalized[1]?.executionId,
  "exec-b",
  "normalization ordering invalid",
);

ensureEqual(
  normalized[2]?.executionId,
  "exec-c",
  "normalization ordering invalid",
);

console.log(
  "TASK-005 normalization tests passed",
);
})

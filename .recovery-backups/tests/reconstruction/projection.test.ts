test("constitutional certification", () => {
import {
  createExecutionProjection,
  reconstructLineage,
} from "../../verifier/reconstruction.js";

import {
  ensureEqual,
} from "./helpers.js";

const nodes = reconstructLineage([
  {
    executionId: "root",
    parentExecutionId: null,
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-01T00:00:00.000Z",
    evidenceHash: "aaa",
  },
  {
    executionId: "child",
    parentExecutionId: "root",
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-02T00:00:00.000Z",
    evidenceHash: "bbb",
  },
]);

const projection =
  createExecutionProjection(nodes);

ensureEqual(
  projection.roots[0],
  "root",
  "root projection invalid",
);

ensureEqual(
  projection.canonicalOrdering[1],
  "child",
  "projection ordering invalid",
);

ensureEqual(
  typeof projection.projectionHash,
  "string",
  "projection hash type invalid",
);

ensureEqual(
  projection.projectionHash.length,
  64,
  "projection hash length invalid",
);

console.log(
  "TASK-005 projection tests passed",
);
})

import {
  reconstructLineage,
  validateContinuity,
  ReconstructionError,
} from "../../verifier/reconstruction.js";

import {
  ensureThrows,
} from "./helpers.js";

const validNodes = reconstructLineage([
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

validateContinuity(validNodes);

ensureThrows(
  () =>
    validateContinuity([
      {
        executionId: "broken",
        parentExecutionId: null,
        batchId: null,
        batchIndex: null,
        timestamp: "2026-01-01T00:00:00.000Z",
        evidenceHash: "aaa",
        lineageDepth: 1,
        continuityState: "resolved",
        children: [],
      },
    ]),
  (error: unknown) =>
    error instanceof ReconstructionError &&
    (error as any).code ===
      "INVALID_RESOLVED_PARENT",
  "continuity validation failed",
);

console.log(
  "TASK-005 continuity validation tests passed",
);

import {
  reconstructLineage,
  ReconstructionError,
} from "../../verifier/reconstruction";

import {
  ensureEqual,
  ensureThrows,
} from "./helpers";

const lineage = reconstructLineage([
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

ensureEqual(
  lineage[0]?.continuityState,
  "root",
  "root continuity invalid",
);

ensureEqual(
  lineage[1]?.continuityState,
  "resolved",
  "resolved continuity invalid",
);

ensureEqual(
  lineage[1]?.lineageDepth,
  1,
  "lineage depth invalid",
);

const unresolved = reconstructLineage([
  {
    executionId: "orphan",
    parentExecutionId: "missing",
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-03T00:00:00.000Z",
    evidenceHash: "ccc",
  },
]);

ensureEqual(
  unresolved[0]?.continuityState,
  "unknown-parent",
  "unknown lineage preservation failed",
);

ensureThrows(
  () =>
    reconstructLineage([
      {
        executionId: "self",
        parentExecutionId: "self",
        batchId: null,
        batchIndex: null,
        timestamp: "2026-01-04T00:00:00.000Z",
        evidenceHash: "ddd",
      },
    ]),
  (error: unknown) =>
    error instanceof ReconstructionError &&
    error.code === "SELF_PARENT",
  "self parent rejection failed",
);

ensureThrows(
  () =>
    reconstructLineage([
      {
        executionId: "a",
        parentExecutionId: "b",
        batchId: null,
        batchIndex: null,
        timestamp: "2026-01-01T00:00:00.000Z",
        evidenceHash: "aaa",
      },
      {
        executionId: "b",
        parentExecutionId: "a",
        batchId: null,
        batchIndex: null,
        timestamp: "2026-01-02T00:00:00.000Z",
        evidenceHash: "bbb",
      },
    ]),
  (error: unknown) =>
    error instanceof ReconstructionError &&
    error.code === "CYCLIC_LINEAGE",
  "cyclic lineage rejection failed",
);

console.log(
  "TASK-005 lineage reconstruction tests passed",
);

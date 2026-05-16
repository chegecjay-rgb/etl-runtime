import {
  canonicalizeEvidence,
  reconstructLineage,
  createExecutionProjection,
  deepFreeze,
} from "../../verifier/reconstruction";

import {
  ensureEqual,
} from "./helpers";

const evidence = deepFreeze([
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
    parentExecutionId: "exec-1",
    batchId: "batch-a",
    batchIndex: 1,
    timestamp: "2026-01-02T00:00:00.000Z",
    evidenceHash: "bbb",
  },
] as const);

const ordered =
  canonicalizeEvidence(evidence);

const lineage =
  reconstructLineage(ordered);

const projection =
  createExecutionProjection(
    lineage,
  );

ensureEqual(
  Object.isFrozen(evidence),
  true,
  "evidence immutability failed",
);

ensureEqual(
  Object.isFrozen(ordered),
  true,
  "ordered evidence immutability failed",
);

ensureEqual(
  Object.isFrozen(lineage),
  true,
  "lineage immutability failed",
);

ensureEqual(
  Object.isFrozen(projection),
  true,
  "projection immutability failed",
);

const replayProjection =
  createExecutionProjection(
    reconstructLineage(
      canonicalizeEvidence(
        evidence,
      ),
    ),
  );

ensureEqual(
  projection.projectionHash,
  replayProjection.projectionHash,
  "replay convergence failed",
);

console.log(
  "TASK-005 freeze readiness tests passed",
);

import {
  canonicalizeEvidence,
  reconstructLineage,
  createExecutionProjection,
} from "../../verifier/reconstruction";

import {
  ensureEqual,
} from "./helpers";

const baselineEvidence = [
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
  {
    executionId: "exec-3",
    parentExecutionId: "exec-2",
    batchId: null,
    batchIndex: null,
    timestamp: "2026-01-03T00:00:00.000Z",
    evidenceHash: "ccc",
  },
] as const;

const shuffledEvidence = [
  baselineEvidence[2],
  baselineEvidence[0],
  baselineEvidence[1],
] as const;

const baselineProjection =
  createExecutionProjection(
    reconstructLineage(
      canonicalizeEvidence(
        baselineEvidence,
      ),
    ),
  );

const shuffledProjection =
  createExecutionProjection(
    reconstructLineage(
      canonicalizeEvidence(
        shuffledEvidence,
      ),
    ),
  );

ensureEqual(
  baselineProjection.projectionHash,
  shuffledProjection.projectionHash,
  "shuffle equivalence failed",
);

console.log(
  "TASK-005 shuffle equivalence tests passed",
);

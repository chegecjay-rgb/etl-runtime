import type { CertificationEntry, CertificationLineage, SnapshotReference } from "../../ledger/types.js";

import type { createLineage } from "../../ledger/lineage.js";
import type { createSnapshot } from "../../ledger/snapshots.js";
import type { createReplayCheckpoint } from "../../ledger/history.js";
import type { exportLedger } from "../../ledger/export.js";
import {
  generateLedgerReport,
  validateLineageIntegrity,
  validateReplayContinuity
} from "../../ledger/diagnostics.js";

export interface LedgerBuildInput {
  readonly entries: readonly CertificationEntry[];
}

export interface LedgerBuildOutput {
  readonly lineage: CertificationLineage;
  readonly snapshots: readonly SnapshotReference[];
  readonly checkpoints: readonly ReturnType<typeof createReplayCheckpoint>[];
}

export function buildLineageFromEntries(
  entries: readonly CertificationEntry[]
): CertificationLineage {
  return createLineage(entries);
}

export function buildSnapshotsFromLineage(
  lineage: CertificationLineage
): readonly SnapshotReference[] {
  const snapshot = createSnapshot(lineage);
  return [snapshot];
}

export function buildReplayChain(
  lineage: CertificationLineage
): readonly ReturnType<typeof createReplayCheckpoint>[] {
  return [createReplayCheckpoint(lineage)];
}

export function runFullDiagnostics(
  lineage: CertificationLineage,
  snapshots: readonly SnapshotReference[]
) {
  return {
    report: generateLedgerReport(lineage, snapshots),
    lineageValid: validateLineageIntegrity(lineage),
    replayValid: validateReplayContinuity(lineage, snapshots)
  };
}

export function buildLedger(
  input: LedgerBuildInput
): LedgerBuildOutput {
  const lineage = buildLineageFromEntries(input.entries);

  const snapshots = buildSnapshotsFromLineage(lineage);

  const checkpoints = buildReplayChain(lineage);

  return {
    lineage,
    snapshots,
    checkpoints
  };
}

export function exportConstitutionalLedger(
  lineage: CertificationLineage,
  checkpoints: readonly ReturnType<typeof createReplayCheckpoint>[]
) {
  return exportLedger(lineage, checkpoints);
}

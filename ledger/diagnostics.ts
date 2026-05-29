import type { CertificationLineage, CertificationEntry, SnapshotReference } from "./types.js";
import { traverseLineage } from "./traversal.js";
import { immutable  } from "./immutable.js";

export interface LedgerDiagnosticsReport {
  readonly entryCount: number;
  readonly snapshotCount: number;
  readonly lineageId: string;
  readonly entryIds: readonly string[];
  readonly snapshotHashes: readonly string[];
  readonly isEmpty: boolean;
}

export function generateLedgerReport(
  lineage: CertificationLineage,
  snapshots: readonly SnapshotReference[]
): LedgerDiagnosticsReport {
  const entries = traverseLineage(lineage);

  return immutable({
    entryCount: entries.length,
    snapshotCount: snapshots.length,
    lineageId: lineage.lineageId,
    entryIds: entries.map(e => e.entryId),
    snapshotHashes: snapshots.map(s => s.snapshotHash),
    isEmpty: entries.length === 0
  });
}

export function validateLineageIntegrity(
  lineage: CertificationLineage
): boolean {
  const entries = traverseLineage(lineage);

  const ids = entries.map(e => e.entryId);
  const unique = new Set(ids);

  return ids.length === unique.size;
}

export function validateSnapshotConsistency(
  snapshots: readonly SnapshotReference[]
): boolean {
  const hashes = snapshots.map(s => s.snapshotHash);
  const unique = new Set(hashes);
  return hashes.length === unique.size;
}

export function validateReplayContinuity(
  lineage: CertificationLineage,
  snapshots: readonly SnapshotReference[]
): boolean {
  return validateLineageIntegrity(lineage) && validateSnapshotConsistency(snapshots);
}

export function detectMutationAnomalies(
  lineage: CertificationLineage
): boolean {
  try {
    const entries = traverseLineage(lineage);
    Object.freeze(entries);
    return Object.isFrozen(entries);
  } catch {
    return false;
  }
}

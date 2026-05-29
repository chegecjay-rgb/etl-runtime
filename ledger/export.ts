import { immutable  } from "./immutable.js";

import type { CertificationLineage, ImmutableLedgerExport, ReplayCheckpoint, SnapshotReference } from "./types.js";

import {
  deterministicHash
} from "./hashes.js";

import {
  traverseLineage
} from "./traversal.js";

function collectSnapshots(
  checkpoints: readonly ReplayCheckpoint[]
): readonly SnapshotReference[] {
  return immutable(
    checkpoints.map(
      (checkpoint) => checkpoint.snapshot
    )
  );
}

export function exportLedger(
  lineage: CertificationLineage,
  checkpoints: readonly ReplayCheckpoint[]
): ImmutableLedgerExport {
  const entries = traverseLineage(lineage);

  const snapshots = collectSnapshots(
    checkpoints
  );

  const exportHash = deterministicHash({
    lineageHash: lineage.lineageHash,
    checkpoints,
    snapshots,
    entries
  });

  return immutable({
    exportHash,
    lineage,
    checkpoints: immutable([...checkpoints]),
    snapshots,
    entries
  });
}

export function exportEquals(
  left: ImmutableLedgerExport,
  right: ImmutableLedgerExport
): boolean {
  return (
    left.exportHash === right.exportHash
  );
}

import type { immutable } from "./immutable.js";

import type { CertificationLineage, SnapshotReference } from "./types.js";

import {
  deterministicHash
} from "./hashes.js";

export function createSnapshot(
  lineage: CertificationLineage
): SnapshotReference {
  const snapshotHash = deterministicHash({
    lineageId: lineage.lineageId,
    lineageHash: lineage.lineageHash,
    entries: lineage.entries
  });

  const snapshotId = deterministicHash({
    snapshotHash
  });

  return immutable({
    snapshotId,
    lineageHash: lineage.lineageHash,
    snapshotHash
  });
}

export function snapshotEquals(
  left: SnapshotReference,
  right: SnapshotReference
): boolean {
  return (
    left.snapshotHash === right.snapshotHash &&
    left.lineageHash === right.lineageHash
  );
}

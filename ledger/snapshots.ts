import { immutable } from "./immutable";

import {
  CertificationLineage,
  SnapshotReference
} from "./types";

import {
  deterministicHash
} from "./hashes";

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

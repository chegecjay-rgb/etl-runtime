import { immutable } from "./immutable";

import {
  CertificationLineage,
  ReplayCheckpoint,
  SnapshotReference
} from "./types";

import {
  deterministicHash
} from "./hashes";

import {
  createSnapshot
} from "./snapshots";

export function createReplayCheckpoint(
  lineage: CertificationLineage
): ReplayCheckpoint {
  const snapshot = createSnapshot(lineage);

  const replayHash = deterministicHash({
    lineageHash: lineage.lineageHash,
    snapshotHash: snapshot.snapshotHash
  });

  const checkpointId = deterministicHash({
    replayHash
  });

  return immutable({
    checkpointId,
    snapshot,
    replayHash
  });
}

export function validateReplayEquivalence(
  left: ReplayCheckpoint,
  right: ReplayCheckpoint
): boolean {
  return (
    left.replayHash === right.replayHash &&
    left.snapshot.snapshotHash === right.snapshot.snapshotHash &&
    left.snapshot.lineageHash === right.snapshot.lineageHash
  );
}

export function certifyReplayHistory(
  checkpoints: readonly ReplayCheckpoint[]
): string {
  return deterministicHash({
    checkpoints
  });
}

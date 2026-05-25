import { immutable } from "./immutable";

import {
  CertificationEntry,
  CertificationLineage
} from "./types";

import {
  deterministicHash
} from "./hashes";

export function createLineage(
  entries: readonly CertificationEntry[]
): CertificationLineage {
  const immutableEntries = immutable(
    [...entries].sort((a, b) =>
      a.entryId.localeCompare(b.entryId)
    )
  );

  const lineageHash = deterministicHash({
    entries: immutableEntries
  });

  const lineageId = deterministicHash({
    lineageHash
  });

  return immutable({
    lineageId,
    entries: immutableEntries,
    lineageHash
  });
}

export function appendEntry(
  lineage: CertificationLineage,
  entry: CertificationEntry
): CertificationLineage {
  return createLineage([
    ...lineage.entries,
    entry
  ]);
}

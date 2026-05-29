import type { immutable } from "./immutable.js";

import type { CertificationEntry, CertificationLineage } from "./types.js";

export function traverseLineage(
  lineage: CertificationLineage
): readonly CertificationEntry[] {
  return immutable(
    [...lineage.entries].sort((left, right) =>
      left.entryId.localeCompare(right.entryId)
    )
  );
}

export function traverseEntryIds(
  lineage: CertificationLineage
): readonly string[] {
  return immutable(
    traverseLineage(lineage).map(
      (entry) => entry.entryId
    )
  );
}

export function traverseCertificationHashes(
  lineage: CertificationLineage
): readonly string[] {
  return immutable(
    traverseLineage(lineage).map(
      (entry) => entry.certificationHash
    )
  );
}

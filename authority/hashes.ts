import { createHash  } from "node:crypto";

import { deepFreeze, type DeepReadonly } from "./immutable.js";
import type {
  CertificationSnapshot
} from "./certify.js";
import type {
  AuthorityContinuityResult
} from "./continuity.js";
import type {
  DelegationTraversalResult
} from "./traversal.js";

export interface AuthorityHash {
  readonly algorithm: "sha256";
  readonly value: string;
}

export interface TraversalHash {
  readonly traversal: DeepReadonly<AuthorityHash>;
}

export interface CertificationHash {
  readonly certification: DeepReadonly<AuthorityHash>;
}

export interface AuthorityHashBundle {
  readonly continuity: DeepReadonly<AuthorityHash>;
  readonly traversal: DeepReadonly<TraversalHash>;
  readonly certification: DeepReadonly<CertificationHash>;
}

function stableHash(
  value: readonly string[]
): DeepReadonly<AuthorityHash> {
  const hash = createHash("sha256");

  hash.update(
    value.join("\n"),
    "utf8"
  );

  return deepFreeze({
    algorithm: "sha256",
    value: hash.digest("hex")
  });
}

function normalizeContinuity(
  continuity: AuthorityContinuityResult
): readonly string[] {
  return Object.freeze(
    continuity.continuity
      .map(
        (entry) =>
          `${entry.authorityId}:${entry.state}:${entry.lineage.join(">")}`
      )
      .sort((left, right) =>
        left.localeCompare(right)
      )
  );
}

function normalizeTraversal(
  traversal: DelegationTraversalResult
): readonly string[] {
  return Object.freeze(
    traversal.traversal
      .map(
        (entry) =>
          `${entry.nodeId}:${entry.authorityId}:${entry.depth}`
      )
      .sort((left, right) =>
        left.localeCompare(right)
      )
  );
}

function normalizeCertification(
  snapshot: CertificationSnapshot
): readonly string[] {
  return Object.freeze([
    ...snapshot.continuityStates,
    ...snapshot.traversalAuthorities,
    ...snapshot.undeclaredAuthorities
  ].sort((left, right) =>
    left.localeCompare(right)
  ));
}

export function createAuthorityHashes(
  continuity: AuthorityContinuityResult,
  traversal: DelegationTraversalResult,
  snapshot: CertificationSnapshot
): DeepReadonly<AuthorityHashBundle> {
  return deepFreeze({
    continuity: stableHash(
      normalizeContinuity(
        continuity
      )
    ),
    traversal: deepFreeze({
      traversal: stableHash(
        normalizeTraversal(
          traversal
        )
      )
    }),
    certification: deepFreeze({
      certification: stableHash(
        normalizeCertification(
          snapshot
        )
      )
    })
  });
}

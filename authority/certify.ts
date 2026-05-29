import type { deepFreeze, type DeepReadonly } from "./immutable.js";
import type {
  AuthorityContinuityResult
} from "./continuity.js";
import type {
  DelegationTraversalResult
} from "./traversal.js";
import type {
  UndeclaredDetectionResult
} from "./undeclared.js";

export interface CertificationSnapshot {
  readonly continuityStates: readonly string[];
  readonly traversalAuthorities: readonly string[];
  readonly undeclaredAuthorities: readonly string[];
}

export interface AuthorityEquivalenceResult {
  readonly equivalent: boolean;
  readonly continuityEquivalent: boolean;
  readonly traversalEquivalent: boolean;
  readonly undeclaredEquivalent: boolean;
}

export interface CertificationDiagnostics {
  readonly continuityCount: number;
  readonly traversalCount: number;
  readonly undeclaredCount: number;
}

export interface AuthorityCertification {
  readonly snapshot: DeepReadonly<CertificationSnapshot>;
  readonly equivalence: DeepReadonly<AuthorityEquivalenceResult>;
  readonly diagnostics: DeepReadonly<CertificationDiagnostics>;
}

function createSnapshot(
  continuity: AuthorityContinuityResult,
  traversal: DelegationTraversalResult,
  undeclared: UndeclaredDetectionResult
): DeepReadonly<CertificationSnapshot> {
  return deepFreeze({
    continuityStates: Object.freeze(
      continuity.states.map(
        (entry) =>
          `${entry.authorityId}:${entry.state}`
      )
    ),
    traversalAuthorities: Object.freeze(
      traversal.traversal.map(
        (entry) =>
          `${entry.nodeId}:${entry.authorityId}:${entry.depth}`
      )
    ),
    undeclaredAuthorities: Object.freeze(
      undeclared.undeclared.map(
        (entry) =>
          `${entry.authorityId}:${entry.state}`
      )
    )
  });
}

function arraysEqual(
  left: readonly string[],
  right: readonly string[]
): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
}

function createEquivalence(
  snapshot: CertificationSnapshot,
  comparison: CertificationSnapshot
): DeepReadonly<AuthorityEquivalenceResult> {
  const continuityEquivalent = arraysEqual(
    snapshot.continuityStates,
    comparison.continuityStates
  );

  const traversalEquivalent = arraysEqual(
    snapshot.traversalAuthorities,
    comparison.traversalAuthorities
  );

  const undeclaredEquivalent = arraysEqual(
    snapshot.undeclaredAuthorities,
    comparison.undeclaredAuthorities
  );

  return deepFreeze({
    equivalent:
      continuityEquivalent &&
      traversalEquivalent &&
      undeclaredEquivalent,
    continuityEquivalent,
    traversalEquivalent,
    undeclaredEquivalent
  });
}

function createDiagnostics(
  snapshot: CertificationSnapshot
): DeepReadonly<CertificationDiagnostics> {
  return deepFreeze({
    continuityCount:
      snapshot.continuityStates.length,
    traversalCount:
      snapshot.traversalAuthorities.length,
    undeclaredCount:
      snapshot.undeclaredAuthorities.length
  });
}

export function certifyAuthorityVerification(
  continuity: AuthorityContinuityResult,
  traversal: DelegationTraversalResult,
  undeclared: UndeclaredDetectionResult,
  comparison?: CertificationSnapshot
): DeepReadonly<AuthorityCertification> {
  const snapshot = createSnapshot(
    continuity,
    traversal,
    undeclared
  );

  const equivalence = createEquivalence(
    snapshot,
    comparison ?? snapshot
  );

  return deepFreeze({
    snapshot,
    equivalence,
    diagnostics: createDiagnostics(
      snapshot
    )
  });
}

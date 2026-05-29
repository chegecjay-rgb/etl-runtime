import type { deepFreeze, type DeepReadonly } from "./immutable.js";
import {
  AuthorityStates,
  type AuthorityState
} from "./states.js";
import type {
  AuthorityContinuityResult,
  ResolvedAuthorityContinuity
} from "./continuity.js";

export interface UndeclaredAuthority {
  readonly authorityId: string;
  readonly lineage: readonly string[];
  readonly state: AuthorityState;
}

export interface UndeclaredPath {
  readonly authorityId: string;
  readonly visitedNodeIds: readonly string[];
}

export interface AuthorityDiscontinuity {
  readonly authorityId: string;
  readonly reason: string;
  readonly state: AuthorityState;
}

export interface UndeclaredDetectionResult {
  readonly undeclared: readonly DeepReadonly<UndeclaredAuthority>[];
  readonly paths: readonly DeepReadonly<UndeclaredPath>[];
  readonly discontinuities: readonly DeepReadonly<AuthorityDiscontinuity>[];
}

function sortContinuity(
  continuity: readonly ResolvedAuthorityContinuity[]
): readonly ResolvedAuthorityContinuity[] {
  return Object.freeze(
    [...continuity].sort((left, right) => {
      const authorityOrder = left.authorityId.localeCompare(
        right.authorityId
      );

      if (authorityOrder !== 0) {
        return authorityOrder;
      }

      return left.lineage.join(":").localeCompare(
        right.lineage.join(":")
      );
    })
  );
}

function isUndeclared(
  continuity: ResolvedAuthorityContinuity
): boolean {
  return (
    continuity.state === AuthorityStates.UNDECLARED ||
    continuity.lineage.length === 0
  );
}

function createUndeclaredAuthority(
  continuity: ResolvedAuthorityContinuity
): DeepReadonly<UndeclaredAuthority> {
  return deepFreeze({
    authorityId: continuity.authorityId,
    lineage: Object.freeze([
      ...continuity.lineage
    ]),
    state: AuthorityStates.UNDECLARED
  });
}

function createUndeclaredPath(
  continuity: ResolvedAuthorityContinuity
): DeepReadonly<UndeclaredPath> {
  return deepFreeze({
    authorityId: continuity.authorityId,
    visitedNodeIds: Object.freeze([
      ...continuity.lineage
    ])
  });
}

function createDiscontinuity(
  continuity: ResolvedAuthorityContinuity
): DeepReadonly<AuthorityDiscontinuity> {
  return deepFreeze({
    authorityId: continuity.authorityId,
    reason: AuthorityStates.UNDECLARED,
    state: AuthorityStates.UNDECLARED
  });
}

export function detectUndeclaredAuthority(
  continuityResult: AuthorityContinuityResult
): DeepReadonly<UndeclaredDetectionResult> {
  const undeclared: UndeclaredAuthority[] = [];
  const paths: UndeclaredPath[] = [];
  const discontinuities: AuthorityDiscontinuity[] = [];

  for (const continuity of sortContinuity(
    continuityResult.continuity
  )) {
    if (!isUndeclared(continuity)) {
      continue;
    }

    undeclared.push(
      createUndeclaredAuthority(
        continuity
      )
    );

    paths.push(
      createUndeclaredPath(
        continuity
      )
    );

    discontinuities.push(
      createDiscontinuity(
        continuity
      )
    );
  }

  return deepFreeze({
    undeclared: Object.freeze(undeclared),
    paths: Object.freeze(paths),
    discontinuities: Object.freeze(
      discontinuities
    )
  });
}

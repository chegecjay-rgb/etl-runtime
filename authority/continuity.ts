import { deepFreeze, type DeepReadonly } from "./immutable";
import {
  AuthorityStates,
  type AuthorityState
} from "./states";
import type {
  DelegationLineage,
  DelegationVerificationResult
} from "./delegation";

export interface ContinuityViolation {
  readonly authorityId: string;
  readonly reason: string;
  readonly state: AuthorityState;
}

export interface ResolvedAuthorityContinuity {
  readonly authorityId: string;
  readonly lineage: readonly string[];
  readonly state: AuthorityState;
}

export interface ContinuityVerificationState {
  readonly authorityId: string;
  readonly state: AuthorityState;
}

export interface AuthorityContinuityResult {
  readonly states: readonly DeepReadonly<ContinuityVerificationState>[];
  readonly continuity: readonly DeepReadonly<ResolvedAuthorityContinuity>[];
  readonly violations: readonly DeepReadonly<ContinuityViolation>[];
}

function sortLineages(
  lineages: readonly DelegationLineage[]
): readonly DelegationLineage[] {
  return Object.freeze(
    [...lineages].sort((left, right) => {
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

function resolveState(
  lineage: DelegationLineage
): AuthorityState {
  if (lineage.lineage.length === 0) {
    return AuthorityStates.UNDECLARED;
  }

  const uniqueNodes = new Set(lineage.lineage);

  if (uniqueNodes.size !== lineage.lineage.length) {
    return AuthorityStates.UNKNOWN;
  }

  return AuthorityStates.VALID;
}

function createViolation(
  authorityId: string,
  state: AuthorityState
): DeepReadonly<ContinuityViolation> | null {
  if (state === AuthorityStates.VALID) {
    return null;
  }

  return deepFreeze({
    authorityId,
    reason: state,
    state
  });
}

export function verifyAuthorityContinuity(
  delegation: DelegationVerificationResult
): DeepReadonly<AuthorityContinuityResult> {
  const continuity: ResolvedAuthorityContinuity[] = [];
  const states: ContinuityVerificationState[] = [];
  const violations: ContinuityViolation[] = [];

  for (const lineage of sortLineages(
    delegation.lineages
  )) {
    const state = resolveState(lineage);

    continuity.push(
      deepFreeze({
        authorityId: lineage.authorityId,
        lineage: Object.freeze([
          ...lineage.lineage
        ]),
        state
      })
    );

    states.push(
      deepFreeze({
        authorityId: lineage.authorityId,
        state
      })
    );

    const violation = createViolation(
      lineage.authorityId,
      state
    );

    if (violation) {
      violations.push(violation);
    }
  }

  return deepFreeze({
    states: Object.freeze(states),
    continuity: Object.freeze(continuity),
    violations: Object.freeze(violations)
  });
}

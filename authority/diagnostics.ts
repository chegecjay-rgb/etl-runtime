import { deepFreeze, type DeepReadonly } from "./immutable";

import type {
  AuthorityCertification
} from "./certify";

import type {
  AuthorityContinuityResult
} from "./continuity";

import type {
  AuthorityHashBundle
} from "./hashes";

import type {
  UndeclaredDetectionResult
} from "./undeclared";

export interface ReplayDiagnosticResult {
  readonly replayStable: boolean;
  readonly certificationEquivalent: boolean;
  readonly hashEquivalent: boolean;
}

export interface FreezeReadinessState {
  readonly ready: boolean;
  readonly continuityStable: boolean;
  readonly undeclaredStable: boolean;
  readonly hashStable: boolean;
}

export interface DiagnosticSnapshot {
  readonly continuityStates: readonly string[];
  readonly undeclaredAuthorities: readonly string[];
  readonly hashFingerprints: readonly string[];
}

export interface AuthorityDiagnostics {
  readonly replay: DeepReadonly<ReplayDiagnosticResult>;
  readonly freeze: DeepReadonly<FreezeReadinessState>;
  readonly snapshot: DeepReadonly<DiagnosticSnapshot>;
}

function createSnapshot(
  continuity: AuthorityContinuityResult,
  undeclared: UndeclaredDetectionResult,
  hashes: AuthorityHashBundle
): DeepReadonly<DiagnosticSnapshot> {
  return deepFreeze({
    continuityStates: Object.freeze(
      continuity.states.map(
        (entry) =>
          `${entry.authorityId}:${entry.state}`
      )
    ),
    undeclaredAuthorities: Object.freeze(
      undeclared.undeclared.map(
        (entry) =>
          `${entry.authorityId}:${entry.state}`
      )
    ),
    hashFingerprints: Object.freeze([
      hashes.continuity.value,
      hashes.traversal.traversal.value,
      hashes.certification.certification.value
    ])
  });
}

function createReplayDiagnostics(
  certification: AuthorityCertification,
  hashes: AuthorityHashBundle
): DeepReadonly<ReplayDiagnosticResult> {
  return deepFreeze({
    replayStable:
      certification.equivalence.equivalent,
    certificationEquivalent:
      certification.equivalence
        .continuityEquivalent &&
      certification.equivalence
        .traversalEquivalent &&
      certification.equivalence
        .undeclaredEquivalent,
    hashEquivalent:
      hashes.continuity.value.length === 64 &&
      hashes.traversal.traversal.value.length === 64 &&
      hashes.certification.certification.value.length === 64
  });
}

function createFreezeReadiness(
  continuity: AuthorityContinuityResult,
  undeclared: UndeclaredDetectionResult,
  replay: ReplayDiagnosticResult
): DeepReadonly<FreezeReadinessState> {
  const continuityStable =
    continuity.states.length > 0;

  const undeclaredStable =
    undeclared.discontinuities.every(
      (entry) =>
        entry.state === "UNDECLARED"
    );

  const hashStable =
    replay.hashEquivalent;

  return deepFreeze({
    ready:
      continuityStable &&
      undeclaredStable &&
      hashStable &&
      replay.replayStable,
    continuityStable,
    undeclaredStable,
    hashStable
  });
}

export function createAuthorityDiagnostics(
  continuity: AuthorityContinuityResult,
  undeclared: UndeclaredDetectionResult,
  certification: AuthorityCertification,
  hashes: AuthorityHashBundle
): DeepReadonly<AuthorityDiagnostics> {
  const replay =
    createReplayDiagnostics(
      certification,
      hashes
    );

  return deepFreeze({
    replay,
    freeze: createFreezeReadiness(
      continuity,
      undeclared,
      replay
    ),
    snapshot: createSnapshot(
      continuity,
      undeclared,
      hashes
    )
  });
}

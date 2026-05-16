import {
  canonicalizeEvidence,
} from "./ordering";

import {
  reconstructLineage,
} from "./lineage";

import {
  createExecutionProjection,
} from "./projection";

import {
  compareProjections,
} from "./diagnostics";

import type {
  CanonicalEvidenceRecord,
} from "./types";

export interface ReplayCertificationResult {
  readonly equivalent: boolean;

  readonly baselineHash: string;

  readonly replayHash: string;
}

export function certifyReplayEquivalence(
  baseline:
    readonly CanonicalEvidenceRecord[],

  replay:
    readonly CanonicalEvidenceRecord[],
): ReplayCertificationResult {
  const baselineProjection =
    createExecutionProjection(
      reconstructLineage(
        canonicalizeEvidence(
          baseline,
        ),
      ),
    );

  const replayProjection =
    createExecutionProjection(
      reconstructLineage(
        canonicalizeEvidence(
          replay,
        ),
      ),
    );

  const comparison =
    compareProjections(
      baselineProjection,
      replayProjection,
    );

  return Object.freeze({
    equivalent:
      comparison.equivalent,

    baselineHash:
      comparison.leftHash,

    replayHash:
      comparison.rightHash,
  });
}

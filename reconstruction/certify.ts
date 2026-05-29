import {
  canonicalizeEvidence,
} from "./ordering.js";

import {
  reconstructLineage,
} from "./lineage.js";

import {
  createExecutionProjection,
} from "./projection.js";

import {
  compareProjections,
} from "./diagnostics.js";

import type {
  CanonicalEvidenceRecord,
} from "./types.js";

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

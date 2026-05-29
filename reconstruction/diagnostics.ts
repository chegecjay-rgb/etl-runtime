import type {
  CanonicalExecutionProjection,
} from "./types.js";

export interface ProjectionEquivalenceResult {
  readonly equivalent: boolean;

  readonly leftHash: string;

  readonly rightHash: string;
}

export function compareProjections(
  left: CanonicalExecutionProjection,
  right: CanonicalExecutionProjection,
): ProjectionEquivalenceResult {
  return Object.freeze({
    equivalent:
      left.projectionHash ===
      right.projectionHash,

    leftHash: left.projectionHash,

    rightHash: right.projectionHash,
  });
}

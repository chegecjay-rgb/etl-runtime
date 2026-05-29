import type {
  CanonicalEvidence
} from "../types/evidence.js";

export interface NormalizationInput {
  readonly source: unknown;
}

export interface EvidenceNormalizer {
  normalize(
    input: NormalizationInput
  ): CanonicalEvidence;
}

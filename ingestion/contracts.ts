import type {
  CanonicalEvidence
} from "../types/evidence";

export interface NormalizationInput {
  readonly source: unknown;
}

export interface EvidenceNormalizer {
  normalize(
    input: NormalizationInput
  ): CanonicalEvidence;
}

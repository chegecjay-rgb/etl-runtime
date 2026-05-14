export interface CanonicalEvidenceIdentifier {
  readonly namespace: string;
  readonly evidenceHash: string;
}

export interface IdentifierDerivationInput {
  readonly schemaVersion: string;
  readonly kind: string;
  readonly canonicalPayload: string;
}

export interface IdentifierDeriver {
  derive(
    input: IdentifierDerivationInput
  ): CanonicalEvidenceIdentifier;
}

import type { OutputCertification } from "./certify.js";

export interface OutputDiagnostics {
  readonly state: string;
  readonly serializedLength: number;
  readonly hashLength: number;
  readonly isFrozen: boolean;
  readonly serializationValid: boolean;
  readonly hashPresent: boolean;
}

export function inspectCertification(
  certification: OutputCertification
): Readonly<OutputDiagnostics> {
  const diagnostics: OutputDiagnostics = {
    state: certification.serialized,
    serializedLength: certification.serialized.length,
    hashLength: certification.hash.length,
    isFrozen: Object.isFrozen(certification),
    serializationValid:
      certification.serialized.length > 0,
    hashPresent:
      certification.hash.length > 0
  };

  return Object.freeze(diagnostics);
}

export function verifyImmutableBoundary(
  value: unknown
): boolean {
  return Object.isFrozen(value);
}

export function verifySerializationIntegrity(
  certification: OutputCertification
): boolean {
  return (
    certification.serialized.length > 0 &&
    certification.hash.length === 64
  );
}

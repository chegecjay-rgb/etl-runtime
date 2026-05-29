import { createHash  } from "node:crypto";

import type {
  CanonicalEvidenceIdentifier,
  IdentifierDerivationInput,
  IdentifierDeriver
} from "../../types/identifiers.js";

const assertNonEmpty = (
  value: string,
  field: string
): void => {
  if (value.trim().length === 0) {
    throw new Error(
      field + " must not be empty"
    );
  }
};

const createDeterministicHash = (
  input: string
): string => {
  return createHash("sha256")
    .update(input, "utf8")
    .digest("hex");
};

export class SHA256IdentifierDeriver
  implements IdentifierDeriver {

  derive(
    input: IdentifierDerivationInput
  ): CanonicalEvidenceIdentifier {

    assertNonEmpty(
      input.schemaVersion,
      "schemaVersion"
    );

    assertNonEmpty(
      input.kind,
      "kind"
    );

    assertNonEmpty(
      input.canonicalPayload,
      "canonicalPayload"
    );

    const canonicalIdentityMaterial = [
      input.schemaVersion,
      input.kind,
      input.canonicalPayload
    ].join("|");

    const evidenceHash =
      createDeterministicHash(
        canonicalIdentityMaterial
      );

    return Object.freeze({
      namespace:
        "etl.reference.verifier",
      evidenceHash
    });
  }
}

export const deriveCanonicalIdentifier = (
  input: IdentifierDerivationInput
): CanonicalEvidenceIdentifier => {
  return new SHA256IdentifierDeriver()
    .derive(input);
};

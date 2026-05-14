import type {
  CanonicalEvidence,
  CanonicalObject,
  CanonicalValue
} from "../../types/evidence";

import type {
  EvidenceValidator,
  ValidationResult,
  ValidationViolation
} from "../../types/validation";

const createViolation = (
  path: string,
  reason: string
): ValidationViolation => {
  return Object.freeze({
    path,
    reason
  });
};

const isPlainObject = (
  value: unknown
): value is Record<string, unknown> => {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return false;
  }

  return (
    Object.getPrototypeOf(value) ===
    Object.prototype
  );
};

const validateCanonicalValue = (
  value: unknown,
  path: string,
  violations: ValidationViolation[],
  seen = new WeakSet<object>()
): value is CanonicalValue => {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return true;
  }

  if (
    typeof value === "undefined" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    typeof value === "bigint"
  ) {
    violations.push(
      createViolation(
        path,
        "Unsupported canonical type"
      )
    );

    return false;
  }

  if (Array.isArray(value)) {
    if (seen.has(value)) {
      violations.push(
        createViolation(
          path,
          "Cyclic structure detected"
        )
      );

      return false;
    }

    seen.add(value);

    let valid = true;

    for (let i = 0; i < value.length; i += 1) {
      const nestedValid =
        validateCanonicalValue(
          value[i],
          path + "[" + i + "]",
          violations,
          seen
        );

      if (!nestedValid) {
        valid = false;
      }
    }

    return valid;
  }

  if (!isPlainObject(value)) {
    violations.push(
      createViolation(
        path,
        "Prototype-bearing objects are forbidden"
      )
    );

    return false;
  }

  if (seen.has(value)) {
    violations.push(
      createViolation(
        path,
        "Cyclic structure detected"
      )
    );

    return false;
  }

  seen.add(value);

  let valid = true;

  for (const key of Object.keys(value)) {
    const nestedValid =
      validateCanonicalValue(
        value[key],
        path + "." + key,
        violations,
        seen
      );

    if (!nestedValid) {
      valid = false;
    }
  }

  return valid;
};

const isCanonicalEvidence = (
  value: unknown
): value is CanonicalEvidence => {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    typeof value.schemaVersion ===
      "string" &&
    typeof value.kind ===
      "string" &&
    typeof value.identifier ===
      "object" &&
    value.identifier !== null &&
    typeof value.payload ===
      "object" &&
    value.payload !== null
  );
};

export class CanonicalEvidenceValidator
  implements EvidenceValidator {

  validate(
    value: unknown
  ): ValidationResult {

    const violations:
      ValidationViolation[] = [];

    if (!isCanonicalEvidence(value)) {
      violations.push(
        createViolation(
          "$",
          "Invalid canonical evidence structure"
        )
      );

      return Object.freeze({
        valid: false,
        violations
      });
    }

    validateCanonicalValue(
      value.payload,
      "$.payload",
      violations
    );

    return Object.freeze({
      valid:
        violations.length === 0,
      violations:
        Object.freeze(
          violations
        )
    });
  }
}

export const validateEvidence = (
  value: unknown
): ValidationResult => {
  return new CanonicalEvidenceValidator()
    .validate(value);
};

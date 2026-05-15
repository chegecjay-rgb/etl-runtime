import {
  reject,
  RejectionCode,
} from "./reject"

function validatePrimitive(
  value: unknown,
): void {
  if (
    typeof value === "function" ||
    typeof value === "symbol" ||
    typeof value === "bigint" ||
    typeof value === "undefined"
  ) {
    reject(
      RejectionCode.NON_CANONICAL_FIELD,
      "unsupported primitive type",
    )
  }

  if (
    typeof value === "number" &&
    Number.isFinite(value) === false
  ) {
    reject(
      RejectionCode.NON_CANONICAL_FIELD,
      "non-finite number rejected",
    )
  }
}

export function validateCanonicalValue(
  value: unknown,
): void {
  validatePrimitive(value)

  if (Array.isArray(value)) {
    for (const entry of value) {
      validateCanonicalValue(entry)
    }

    return
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    const record =
      value as Record<
        string,
        unknown
      >

    for (const key of Object.keys(
      record,
    )) {
      validateCanonicalValue(
        record[key],
      )
    }
  }
}

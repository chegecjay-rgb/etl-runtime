import {
  VerificationState
} from "./states";

export interface FormattedVerificationOutput {
  readonly state: VerificationState;
  readonly serialized: string;
}

function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const prototype =
    Object.getPrototypeOf(value);

  return (
    prototype === Object.prototype ||
    prototype === null
  );
}

function assertSerializable(
  value: unknown
): void {
  if (typeof value === "function") {
    throw new Error(
      "Functions are not constitutionally serializable"
    );
  }

  if (typeof value === "symbol") {
    throw new Error(
      "Symbols are not constitutionally serializable"
    );
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error(
        "Non-finite numbers are prohibited"
      );
    }
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    if (
      !Array.isArray(value) &&
      !isPlainObject(value)
    ) {
      throw new Error(
        "Non-plain objects are prohibited"
      );
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        assertSerializable(item);
      }

      return;
    }

    for (const key of Object.keys(value)) {
      assertSerializable(
        value[key]
      );
    }
  }
}

function canonicalize(
  value: unknown
): unknown {
  assertSerializable(value);

  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(
      canonicalize
    );
  }

  const sortedKeys =
    Object.keys(
      value as Record<string, unknown>
    ).sort();

  const result:
    Record<string, unknown> = {};

  for (const key of sortedKeys) {
    const nested =
      (
        value as Record<
          string,
          unknown
        >
      )[key];

    if (nested === undefined) {
      continue;
    }

    result[key] =
      canonicalize(nested);
  }

  return result;
}

export function stableSerialize(
  value: unknown
): string {
  const canonical =
    canonicalize(value);

  return JSON.stringify(
    canonical
  ).normalize("NFC");
}

export function formatVerificationOutput(
  state: VerificationState
): Readonly<FormattedVerificationOutput> {
  const serialized =
    stableSerialize({
      state
    });

  return Object.freeze({
    state,
    serialized
  });
}

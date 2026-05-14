import type {
  CanonicalObject,
  CanonicalValue
} from "../../types/evidence";

type MutableCanonicalObject =
  Record<string, CanonicalValue>;

const isCanonicalObject = (
  value: CanonicalValue
): value is CanonicalObject => {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
};

export const canonicalize = (
  value: CanonicalValue
): CanonicalValue => {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(
      canonicalize
    );
  }

  if (!isCanonicalObject(value)) {
    throw new Error(
      "Invalid canonical object"
    );
  }

  const orderedKeys =
    Object.keys(value).sort();

  const result:
    MutableCanonicalObject = {};

  for (const key of orderedKeys) {
    result[key] = canonicalize(
      value[key]
    );
  }

  return Object.freeze(
    result
  ) as CanonicalObject;
};

import type {
  CanonicalSerializer
} from "../../types/serialization";

import type {
  CanonicalValue
} from "../../types/evidence";

import {
  canonicalize
} from "./canonicalize";

const assertSerializable = (
  value: unknown,
  seen = new WeakSet<object>()
): void => {
  if (value === undefined) {
    throw new Error(
      "Undefined values are forbidden"
    );
  }

  if (
    typeof value === "function" ||
    typeof value === "symbol" ||
    typeof value === "bigint"
  ) {
    throw new Error(
      "Unsupported canonical type"
    );
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    if (seen.has(value)) {
      throw new Error(
        "Cyclic structures are forbidden"
      );
    }

    seen.add(value);

    if (Array.isArray(value)) {
      for (const item of value) {
        assertSerializable(
          item,
          seen
        );
      }

      return;
    }

    const prototype =
      Object.getPrototypeOf(value);

    if (
      prototype !== Object.prototype
    ) {
      throw new Error(
        "Prototype-bearing objects are forbidden"
      );
    }

    for (const nested of Object.values(
      value
    )) {
      assertSerializable(
        nested,
        seen
      );
    }
  }
};

export class DeterministicSerializer
  implements CanonicalSerializer {

  serialize(
    value: CanonicalValue
  ): string {

    assertSerializable(value);

    const canonical =
      canonicalize(value);

    return JSON.stringify(
      canonical
    );
  }
}

export const serializeCanonical = (
  value: CanonicalValue
): string => {
  return new DeterministicSerializer()
    .serialize(value);
};

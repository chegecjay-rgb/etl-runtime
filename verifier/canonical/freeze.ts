import type {
  DeepReadonly
} from "../../types/readonly.js";

export interface ImmutableFreezer {
  freeze<T>(
    value: T
  ): DeepReadonly<T>;
}

const isObject = (
  value: unknown
): value is object => {
  return (
    value !== null &&
    typeof value === "object"
  );
};

const deepFreezeInternal = <T>(
  value: T,
  seen = new WeakSet<object>()
): DeepReadonly<T> => {

  if (!isObject(value)) {
    return value as DeepReadonly<T>;
  }

  if (seen.has(value)) {
    return value as DeepReadonly<T>;
  }

  seen.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      deepFreezeInternal(
        item,
        seen
      );
    }

    return Object.freeze(
      value
    ) as DeepReadonly<T>;
  }

  for (const key of Object.keys(value)) {
    const nested = (
      value as Record<
        string,
        unknown
      >
    )[key];

    deepFreezeInternal(
      nested,
      seen
    );
  }

  return Object.freeze(
    value
  ) as DeepReadonly<T>;
};

export const deepFreeze = <T>(
  value: T
): DeepReadonly<T> => {
  return deepFreezeInternal(
    value
  );
};

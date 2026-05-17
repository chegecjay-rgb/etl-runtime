export type DeepReadonly<T> =
  T extends (...args: never[]) => unknown
    ? T
    : T extends readonly (infer U)[]
      ? readonly DeepReadonly<U>[]
      : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;

export function deepFreeze<T>(value: T): DeepReadonly<T> {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);

    for (const key of Reflect.ownKeys(value)) {
      const nested = (value as Record<PropertyKey, unknown>)[key];

      if (nested && typeof nested === "object") {
        deepFreeze(nested);
      }
    }
  }

  return value as DeepReadonly<T>;
}

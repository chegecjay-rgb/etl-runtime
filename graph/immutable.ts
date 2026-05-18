export type Immutable<T> =
  T extends (...args: any[]) => any
    ? T
    : T extends object
      ? {
          readonly [K in keyof T]:
            Immutable<T[K]>;
        }
      : T;

export function deepFreeze<T>(
  value: T
): Immutable<T> {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return value as Immutable<T>;
  }

  const target =
    value as Record<string, unknown>;

  for (const key of Object.keys(target)) {
    const nested = target[key];

    if (
      nested !== null &&
      typeof nested === "object"
    ) {
      deepFreeze(nested);
    }
  }

  return Object.freeze(
    value
  ) as Immutable<T>;
}

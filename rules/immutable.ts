export type Immutable<T> =
  T extends (...args: any[]) => any
    ? T
    : T extends object
      ? { readonly [K in keyof T]: Immutable<T[K]> }
      : T;

export function deepFreeze<T>(value: T): Immutable<T> {
  if (typeof value !== "object" || value === null) {
    return value as Immutable<T>;
  }

  Object.freeze(value);

  for (const key of Reflect.ownKeys(value)) {
    const child = (value as Record<PropertyKey, unknown>)[key];

    if (typeof child === "object" && child !== null) {
      deepFreeze(child);
    }
  }

  return value as Immutable<T>;
}

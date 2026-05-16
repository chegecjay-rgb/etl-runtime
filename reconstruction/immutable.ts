export function deepFreeze<T>(value: T): T {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Object.isFrozen(value)) {
    return value;
  }

  const target = value as Record<string, unknown>;

  for (const key of Object.keys(target)) {
    const nested = target[key];

    if (nested !== null && typeof nested === "object") {
      deepFreeze(nested);
    }
  }

  return Object.freeze(value);
}

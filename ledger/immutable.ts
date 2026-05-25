import { DeepReadonly } from "./types";

export function deepFreeze<T>(value: T): DeepReadonly<T> {
  if (value === null || typeof value !== "object") {
    return value as DeepReadonly<T>;
  }

  if (Object.isFrozen(value)) {
    return value as DeepReadonly<T>;
  }

  const target = value as Record<string, unknown>;

  for (const key of Object.keys(target)) {
    const child = target[key];

    if (child && typeof child === "object") {
      deepFreeze(child);
    }
  }

  return Object.freeze(value) as DeepReadonly<T>;
}

export function immutable<T>(value: T): DeepReadonly<T> {
  return deepFreeze(structuredClone(value));
}

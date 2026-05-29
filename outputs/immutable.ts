import type { VerificationState } from "./states.js";

const FROZEN_OBJECTS = new WeakSet<object>();

function isObjectLike(value: unknown): value is Record<PropertyKey, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

export function deepFreeze<T>(value: T): Readonly<T> {
  if (!isObjectLike(value)) {
    return value as Readonly<T>;
  }

  if (FROZEN_OBJECTS.has(value)) {
    return value as Readonly<T>;
  }

  FROZEN_OBJECTS.add(value);

  const propertyNames = Reflect.ownKeys(value);

  for (const propertyName of propertyNames) {
    const propertyValue = value[propertyName as keyof typeof value];

    if (isObjectLike(propertyValue)) {
      deepFreeze(propertyValue);
    }
  }

  return Object.freeze(value);
}

export interface ImmutableVerificationOutput {
  readonly state: VerificationState;
  readonly serialized: string;
  readonly certificationHash: string;
}

export function createImmutableVerificationOutput(
  output: ImmutableVerificationOutput
): Readonly<ImmutableVerificationOutput> {
  return deepFreeze({
    state: output.state,
    serialized: output.serialized,
    certificationHash: output.certificationHash
  });
}

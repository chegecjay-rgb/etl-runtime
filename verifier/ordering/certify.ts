export function assertDeterministicEquality<T>(
  left: readonly T[],
  right: readonly T[],
  message: string
): void {
  const leftSerialized =
    JSON.stringify(left);

  const rightSerialized =
    JSON.stringify(right);

  if (leftSerialized !== rightSerialized) {
    throw new Error(message);
  }
}

export function assertImmutableSnapshot<T>(
  current: readonly T[],
  snapshot: string,
  message: string
): void {
  const serialized =
    JSON.stringify(current);

  if (serialized !== snapshot) {
    throw new Error(message);
  }
}

export function createReplaySnapshot<T>(
  value: readonly T[]
): string {
  return JSON.stringify(value);
}

export function certifyReplayOrdering<T>(
  baseline: readonly T[],
  candidate: readonly T[]
): {
  readonly deterministic: boolean;
  readonly baselineHash: string;
  readonly candidateHash: string;
} {
  const baselineHash =
    JSON.stringify(baseline);

  const candidateHash =
    JSON.stringify(candidate);

  return {
    deterministic:
      baselineHash === candidateHash,
    baselineHash,
    candidateHash
  };
}

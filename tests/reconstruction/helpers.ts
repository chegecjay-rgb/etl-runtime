export function ensure(
  condition: unknown,
  message: string,
): void {
  if (!condition) {
    throw new Error(message);
  }
}

export function ensureEqual<T>(
  actual: T,
  expected: T,
  message: string,
): void {
  if (actual !== expected) {
    throw new Error(
      `${message} | expected=${String(expected)} actual=${String(actual)}`,
    );
  }
}

export function ensureThrows(
  handler: () => void,
  predicate: (error: unknown) => boolean,
  message: string,
): void {
  try {
    handler();
  } catch (error) {
    if (predicate(error)) {
      return;
    }

    throw new Error(
      `${message} | unexpected error`,
    );
  }

  throw new Error(
    `${message} | expected throw`,
  );
}

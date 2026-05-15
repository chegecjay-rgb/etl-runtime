export function invariant(
  condition: boolean,
  message: string,
): void {
  if (!condition) {
    throw new Error(message)
  }
}

export function equal(
  actual: unknown,
  expected: unknown,
  message: string,
): void {
  if (actual !== expected) {
    throw new Error(
      `${message}: expected=${String(expected)} actual=${String(actual)}`,
    )
  }
}

export function deepEqual(
  actual: unknown,
  expected: unknown,
  message: string,
): void {
  const actualSerialized = JSON.stringify(actual)
  const expectedSerialized = JSON.stringify(expected)

  if (actualSerialized !== expectedSerialized) {
    throw new Error(
      `${message}: expected=${expectedSerialized} actual=${actualSerialized}`,
    )
  }
}

export function throws(
  fn: () => void,
  validator: (error: unknown) => boolean,
  message: string,
): void {
  try {
    fn()
  } catch (error) {
    if (validator(error)) {
      return
    }

    throw new Error(`${message}: invalid rejection`)
  }

  throw new Error(`${message}: expected throw`)
}

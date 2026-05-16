export function deepFreeze<T>(
  value: T
): Readonly<T> {
  if (
    value === null ||
    value === undefined ||
    typeof value !== 'object'
  ) {
    return value as Readonly<T>
  }

  if (Object.isFrozen(value)) {
    return value as Readonly<T>
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      deepFreeze(item)
    }

    return Object.freeze(
      value
    ) as unknown as Readonly<T>
  }

  if (value instanceof Map) {
    for (const [key, mapValue] of value) {
      deepFreeze(key)
      deepFreeze(mapValue)
    }

    return Object.freeze(
      value
    ) as unknown as Readonly<T>
  }

  if (value instanceof Set) {
    for (const item of value) {
      deepFreeze(item)
    }

    return Object.freeze(
      value
    ) as unknown as Readonly<T>
  }

  const record =
    value as Record<
      string,
      unknown
    >

  for (const property of Object.keys(record)) {
    deepFreeze(
      record[property]
    )
  }

  return Object.freeze(
    value
  ) as Readonly<T>
}

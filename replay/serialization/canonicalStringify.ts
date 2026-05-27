export type CanonicalPrimitive =
  | null
  | boolean
  | number
  | string

export type CanonicalArray =
  readonly CanonicalValue[]

export type CanonicalObject = {
  readonly [key: string]: CanonicalValue
}

export type CanonicalValue =
  | CanonicalPrimitive
  | CanonicalArray
  | CanonicalObject

function normalizeString(value: string): string {
  return value.normalize("NFC").replace(/\r\n/g, "\n").replace(/\r/g, "\n")
}

function isCanonicalObject(
  value: CanonicalValue
): value is CanonicalObject {
  return typeof value === "object"
    && value !== null
    && !Array.isArray(value)
}

function canonicalize(value: CanonicalValue): CanonicalValue {
  if (typeof value === "string") {
    return normalizeString(value)
  }

  if (Array.isArray(value)) {
    return value.map((entry) => canonicalize(entry))
  }

  if (isCanonicalObject(value)) {
    const output: Record<string, CanonicalValue> = {}

    for (const key of Object.keys(value).sort()) {
      output[normalizeString(key)] = canonicalize(value[key])
    }

    return output
  }

  return value
}

export function canonicalStringify(
  value: CanonicalValue
): string {
  return JSON.stringify(
    canonicalize(value),
    null,
    2
  ) + "\n"
}

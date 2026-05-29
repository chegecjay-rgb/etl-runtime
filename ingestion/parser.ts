import {
  ensurePlainObject,
  stableSortedKeys,
} from "./canonicalFields.js"

import {
  reject,
  RejectionCode,
} from "./reject.js"

import type { CanonicalEvidenceInput, EvidenceKind } from "./schemas.js";

import { normalizeTimestamp  } from "./timestamp.js"

import {
  validateCanonicalValue,
} from "./validators.js"

const SUPPORTED_KINDS:
  readonly EvidenceKind[] =
  Object.freeze([
    "ERC8241_DISCLOSURE",
    "PROOF_OF_OPERATION",
    "ETNL_OUTPUT",
    "GRAPH_REFERENCE",
  ])

export type ParsedEvidence =
  Readonly<{
    kind: EvidenceKind
    id: string
    timestamp: string
    payload: Readonly<
      Record<string, unknown>
    >
  }>

function deepFreeze<T>(
  value: T,
): Readonly<T> {
  if (
    typeof value === "object" &&
    value !== null
  ) {
    Object.freeze(value)

    for (const key of Object.keys(
      value as Record<
        string,
        unknown
      >,
    )) {
      deepFreeze(
        (
          value as Record<
            string,
            unknown
          >
        )[key],
      )
    }
  }

  return value as Readonly<T>
}

export function parseEvidence(
  input: unknown,
): ParsedEvidence {
  const candidate =
    ensurePlainObject(input)

  const requiredFields = [
    "id",
    "kind",
    "payload",
    "timestamp",
  ]

  const keys =
    stableSortedKeys(candidate)

  if (
    JSON.stringify(keys) !==
    JSON.stringify(
      requiredFields,
    )
  ) {
    reject(
      RejectionCode.INVALID_STRUCTURE,
      "non-canonical evidence fields",
    )
  }

  const {
    id,
    kind,
    payload,
    timestamp,
  } =
    candidate as CanonicalEvidenceInput

  if (
    typeof id !== "string" ||
    id.length === 0
  ) {
    reject(
      RejectionCode.INVALID_STRUCTURE,
      "invalid evidence id",
    )
  }

  if (
    typeof kind !== "string" ||
    !SUPPORTED_KINDS.includes(
      kind as EvidenceKind,
    )
  ) {
    reject(
      RejectionCode.UNSUPPORTED_KIND,
      "unsupported evidence kind",
    )
  }

  const normalizedTimestamp =
    normalizeTimestamp(
      timestamp,
    )

  const normalizedPayload =
    ensurePlainObject(payload)

  validateCanonicalValue(
    normalizedPayload,
  )

  return deepFreeze({
    kind,
    id,
    timestamp:
      normalizedTimestamp,
    payload:
      normalizedPayload,
  })
}

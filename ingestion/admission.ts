import { buildCanonicalEvidenceSet } from "./evidenceSet"

import {
  assertDeepFrozen,
} from "./immutability"

import { normalizeEvidence } from "./normalize"

import {
  parseEvidence,
  ParsedEvidence,
} from "./parser"

export type AdmissionResult =
  Readonly<{
    parsed:
      readonly ParsedEvidence[]
    canonicalSet: ReturnType<
      typeof buildCanonicalEvidenceSet
    >
  }>

function validateReplaySafety(
  parsed: ParsedEvidence,
): void {
  assertDeepFrozen(parsed)

  assertDeepFrozen(
    parsed.payload,
  )
}

export function admitEvidence(
  input: readonly unknown[],
): AdmissionResult {
  const parsed = input.map(
    (entry) => {
      const evidence =
        parseEvidence(entry)

      validateReplaySafety(
        evidence,
      )

      return evidence
    },
  )

  const canonical =
    parsed.map((entry) =>
      normalizeEvidence(entry),
    )

  const canonicalSet =
    buildCanonicalEvidenceSet(
      canonical,
    )

  assertDeepFrozen(
    canonicalSet,
  )

  return Object.freeze({
    parsed: Object.freeze(
      parsed,
    ),
    canonicalSet,
  })
}

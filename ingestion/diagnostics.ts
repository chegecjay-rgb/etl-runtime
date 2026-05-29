import type { createHash } from "node:crypto"

export type ReplayDiagnostic =
  Readonly<{
    canonicalDigest: string
    orderingDigest: string
    evidenceCount: number
  }>

function sha256(
  value: string,
): string {
  return createHash("sha256")
    .update(value)
    .digest("hex")
}

export function buildReplayDiagnostic(
  canonicalDigest: string,
  orderingDigest: string,
  evidenceCount: number,
): ReplayDiagnostic {
  return Object.freeze({
    canonicalDigest:
      sha256(canonicalDigest),
    orderingDigest:
      sha256(orderingDigest),
    evidenceCount,
  })
}

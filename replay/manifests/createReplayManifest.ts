import { canonicalHash } from "../hashing/canonicalHash"
import {
  canonicalStringify,
  type CanonicalValue
} from "../serialization/canonicalStringify"

export type ReplayManifest = Readonly<{
  replayHash: string
  serializationHash: string
  evidenceHash: string
  artifacts: readonly string[]
  stdout: string
  stderr: string
  exitCode: number
}>

export function createReplayManifest(
  evidence: CanonicalValue,
  artifacts: readonly string[],
  stdout: string,
  stderr: string,
  exitCode: number
): ReplayManifest {
  const orderedArtifacts = [...artifacts].sort()

  const serialization = canonicalStringify({
    evidence,
    artifacts: orderedArtifacts,
    stdout,
    stderr,
    exitCode
  })

  return {
    replayHash: canonicalHash(serialization),
    serializationHash: canonicalHash(serialization),
    evidenceHash: canonicalHash(evidence),
    artifacts: orderedArtifacts,
    stdout,
    stderr,
    exitCode
  }
}

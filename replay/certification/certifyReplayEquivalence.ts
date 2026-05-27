import assert from "node:assert/strict"
import {
  createReplayManifest,
  type ReplayManifest
} from "../manifests/createReplayManifest"
import type { CanonicalValue } from "../serialization/canonicalStringify"

export function certifyReplayEquivalence(
  evidence: CanonicalValue,
  artifacts: readonly string[],
  stdout: string,
  stderr: string,
  exitCode: number,
  iterations: number
): ReplayManifest {
  const reference = createReplayManifest(
    evidence,
    artifacts,
    stdout,
    stderr,
    exitCode
  )

  for (let i = 0; i < iterations; i++) {
    const candidate = createReplayManifest(
      evidence,
      artifacts,
      stdout,
      stderr,
      exitCode
    )

    assert.deepEqual(candidate, reference)
  }

  return reference
}

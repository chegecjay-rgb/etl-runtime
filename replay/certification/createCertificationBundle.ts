import fs from "node:fs"
import path from "node:path"
import type { canonicalHash } from "../hashing/canonicalHash.js"
import {
  canonicalStringify,
  type CanonicalValue
} from "../serialization/canonicalStringify.js"
import {
  createReplayManifest,
  type ReplayManifest
} from "../manifests/createReplayManifest.js"

export type CertificationBundle = Readonly<{
  manifest: ReplayManifest
  manifestHash: string
  replaySnapshotPath: string
  attestationPath: string
  reportPath: string
}>

function writeDeterministicFile(
  file: string,
  content: string
): void {
  fs.mkdirSync(path.dirname(file), { recursive: true })

  fs.writeFileSync(
    file,
    content.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    {
      encoding: "utf8"
    }
  )
}

export function createCertificationBundle(
  outputDirectory: string,
  evidence: CanonicalValue,
  artifacts: readonly string[],
  stdout: string,
  stderr: string,
  exitCode: number
): CertificationBundle {
  const manifest = createReplayManifest(
    evidence,
    artifacts,
    stdout,
    stderr,
    exitCode
  )

  const manifestHash = canonicalHash(manifest)

  const snapshotPath = path.join(
    outputDirectory,
    "canonical-replay-snapshot.json"
  )

  const attestationPath = path.join(
    outputDirectory,
    "replay-equivalence-attestation.json"
  )

  const reportPath = path.join(
    outputDirectory,
    "replay-certification-report.json"
  )

  writeDeterministicFile(
    snapshotPath,
    canonicalStringify(manifest)
  )

  writeDeterministicFile(
    attestationPath,
    canonicalStringify({
      invariant: "same-evidence-same-replay-outcome",
      replayHash: manifest.replayHash,
      manifestHash,
      certified: true
    })
  )

  writeDeterministicFile(
    reportPath,
    canonicalStringify({
      task: "TASK-016",
      classification: "DETERMINISTIC CERTIFICATION PHASE",
      replayHash: manifest.replayHash,
      manifestHash,
      evidenceHash: manifest.evidenceHash,
      artifacts: manifest.artifacts,
      exitCode: manifest.exitCode
    })
  )

  return {
    manifest,
    manifestHash,
    replaySnapshotPath: snapshotPath,
    attestationPath,
    reportPath
  }
}

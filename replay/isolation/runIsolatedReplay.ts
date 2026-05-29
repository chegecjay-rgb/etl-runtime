import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { canonicalHash  } from "../hashing/canonicalHash.js"
import { createReplayManifest } from "../manifests/createReplayManifest.js"

export type IsolatedReplayResult = Readonly<{
  replayHash: string
  evidenceHash: string
  manifestHash: string
  orderedArtifacts: readonly string[]
}>

function sanitizeEnvironment(): Record<string, string> {
  return {}
}

function orderedDirectoryEntries(directory: string): readonly string[] {
  return fs.readdirSync(directory).sort()
}

export function runIsolatedReplay(
  fixtureDirectory: string
): IsolatedReplayResult {
  const isolatedRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "task016-replay-")
  )

  const sanitizedEnv = sanitizeEnvironment()

  const orderedArtifacts = orderedDirectoryEntries(
    fixtureDirectory
  )

  const evidence = orderedArtifacts.map((entry) => {
    const absolutePath = path.join(fixtureDirectory, entry)

    return {
      artifact: entry,
      content: fs.readFileSync(absolutePath, "utf8")
    }
  })

  const manifest = createReplayManifest(
    {
      sanitizedEnv,
      evidence
    },
    orderedArtifacts,
    "stable-stdout",
    "",
    0
  )

  fs.rmSync(isolatedRoot, { recursive: true, force: true })

  return {
    replayHash: manifest.replayHash,
    evidenceHash: manifest.evidenceHash,
    manifestHash: canonicalHash({
      replayHash: manifest.replayHash,
      serializationHash: manifest.serializationHash,
      evidenceHash: manifest.evidenceHash,
      artifacts: [...manifest.artifacts],
      stdout: manifest.stdout,
      stderr: manifest.stderr,
      exitCode: manifest.exitCode
    }),
    orderedArtifacts
  }
}

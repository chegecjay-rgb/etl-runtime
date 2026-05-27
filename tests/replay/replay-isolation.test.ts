import assert from "node:assert/strict"
import path from "node:path"
import { runIsolatedReplay } from "../../replay/isolation/runIsolatedReplay"

const environmentA = path.resolve(
  "fixtures/task016/environment-a"
)

const environmentB = path.resolve(
  "fixtures/task016/environment-b"
)

const first = runIsolatedReplay(environmentA)
const second = runIsolatedReplay(environmentB)

assert.deepEqual(
  first.orderedArtifacts,
  [
    "alpha.json",
    "zeta.json"
  ]
)

assert.deepEqual(
  second.orderedArtifacts,
  [
    "alpha.json",
    "zeta.json"
  ]
)

assert.equal(first.evidenceHash, second.evidenceHash)

assert.equal(first.replayHash, second.replayHash)

assert.equal(first.manifestHash, second.manifestHash)

console.log("replay-isolation.test.ts passed")

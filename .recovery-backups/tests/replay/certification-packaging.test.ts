test("constitutional certification", () => {
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

import { createCertificationBundle  } from "../../replay/certification/createCertificationBundle.js"

const tempRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), "task016-certification-")
)

const bundleA = createCertificationBundle(
  path.join(tempRoot, "bundle-a"),
  {
    authority: "constitutional",
    replay: "stable"
  },
  [
    "artifact-b.json",
    "artifact-a.json"
  ],
  "stdout-stable",
  "",
  0
)

const bundleB = createCertificationBundle(
  path.join(tempRoot, "bundle-b"),
  {
    replay: "stable",
    authority: "constitutional"
  },
  [
    "artifact-a.json",
    "artifact-b.json"
  ],
  "stdout-stable",
  "",
  0
)

assert.equal(
  bundleA.manifestHash,
  bundleB.manifestHash
)

assert.equal(
  bundleA.manifest.replayHash,
  bundleB.manifest.replayHash
)

assert.deepStrictEqual(
  bundleA.manifest.artifacts,
  bundleB.manifest.artifacts
)

assert.ok(fs.existsSync(bundleA.replaySnapshotPath))
assert.ok(fs.existsSync(bundleA.attestationPath))
assert.ok(fs.existsSync(bundleA.reportPath))

const snapshotA = fs.readFileSync(
  bundleA.replaySnapshotPath,
  "utf8"
)

const snapshotB = fs.readFileSync(
  bundleB.replaySnapshotPath,
  "utf8"
)

assert.equal(snapshotA, snapshotB)

console.log("certification-packaging.test.ts passed")
})

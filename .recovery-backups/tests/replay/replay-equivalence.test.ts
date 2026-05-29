test("constitutional certification", () => {
import assert from "node:assert/strict"
import type { certifyReplayEquivalence } from "../../replay/certification/certifyReplayEquivalence.js"

const evidence = {
  alpha: {
    beta: "value",
    delta: "e\u0301"
  },
  zeta: "line\r\nvalue"
}

const manifest = certifyReplayEquivalence(
  evidence,
  [
    "snapshot-b.json",
    "snapshot-a.json",
    "snapshot-c.json"
  ],
  "stable-stdout",
  "",
  0,
  100
)

assert.deepStrictEqual(
  manifest.artifacts,
  [
    "snapshot-a.json",
    "snapshot-b.json",
    "snapshot-c.json"
  ]
)

assert.equal(manifest.exitCode, 0)

assert.equal(manifest.stderr, "")

assert.equal(manifest.stdout, "stable-stdout")

assert.equal(manifest.replayHash.length, 64)

console.log("replay-equivalence.test.ts passed")
})

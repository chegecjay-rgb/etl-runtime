test("constitutional certification", () => {
import assert from "node:assert/strict"
import type { canonicalHash } from "../../replay/hashing/canonicalHash.js"

const payloadA = {
  zeta: "last\r\nline",
  alpha: {
    delta: "é",
    beta: "value"
  }
}

const payloadB = {
  alpha: {
    beta: "value",
    delta: "e\u0301"
  },
  zeta: "last\nline"
}

const first = canonicalHash(payloadA)
const second = canonicalHash(payloadB)

assert.equal(first, second)

assert.equal(first.length, 64)

assert.match(first, /^[a-f0-9]+$/)

console.log("canonical-hash.test.ts passed")
})

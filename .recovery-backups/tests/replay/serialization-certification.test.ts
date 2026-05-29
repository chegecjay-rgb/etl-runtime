test("constitutional certification", () => {
import assert from "node:assert/strict"
import { canonicalStringify  } from "../../replay/serialization/canonicalStringify.js"

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

const first = canonicalStringify(payloadA)
const second = canonicalStringify(payloadB)

assert.equal(first, second)

assert.equal(
  first,
  `{
  "alpha": {
    "beta": "value",
    "delta": "é"
  },
  "zeta": "last\\nline"
}
`
)

console.log("serialization-certification.test.ts passed")
})

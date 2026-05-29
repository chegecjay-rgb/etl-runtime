test("constitutional certification", () => {
const assert = require("assert")

const {
  certifyReplay,
} = require("../../dist-runtime/replay/certify.js")

const left =
  certifyReplay({
    roots: ["root-node"],
    adjacency: {
      "root-node": [
        "child-a-node",
        "child-b-node",
      ],
    },
    graphHash: "GRAPH_HASH_V1",
  })

const right =
  certifyReplay({
    roots: ["root-node"],
    adjacency: {
      "root-node": [
        "child-a-node",
        "child-b-node",
      ],
    },
    graphHash: "GRAPH_HASH_V1",
  })

assert.deepStrictEqual(
  left.traversal,
  right.traversal
)

assert.deepStrictEqual(
  left.traversalHash,
  right.traversalHash
)

console.log(
  "integration.test.ts passed"
)
})

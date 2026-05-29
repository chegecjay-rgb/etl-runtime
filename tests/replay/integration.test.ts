import assert from "node:assert"

const {
  certifyReplay,
} = await import("../../replay/certify.js")

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

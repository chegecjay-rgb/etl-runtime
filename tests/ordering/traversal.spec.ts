import {
  canonicalTraversal
} from "../../verifier/ordering/traversal.js";

import type { TraversalNode } from "../../types/ordering.js";

function assert(
  condition: boolean,
  message: string
): void {
  if (!condition) {
    throw new Error(message);
  }
}

const graph: readonly TraversalNode[] = [
  {
    id: "node-c",
    children: [
      {
        id: "node-c-2"
      },
      {
        id: "node-c-1"
      }
    ]
  },
  {
    id: "node-a",
    children: [
      {
        id: "node-a-2"
      },
      {
        id: "node-a-1"
      }
    ]
  }
];

const traversalA =
  canonicalTraversal(graph);

const traversalB =
  canonicalTraversal(graph);

assert(
  JSON.stringify(traversalA) ===
    JSON.stringify(traversalB),
  "Traversal replay divergence detected"
);

assert(
  traversalA.join(",") ===
    [
      "node-a",
      "node-a-1",
      "node-a-2",
      "node-c",
      "node-c-1",
      "node-c-2"
    ].join(","),
  "Canonical traversal ordering failed"
);

console.log(
  "Canonical traversal certification passed"
);

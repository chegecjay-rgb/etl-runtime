import assert from "node:assert/strict";

import {
  createDeclarationIndex
} from "../../authority/declarations.js";

import {
  createAuthorityProjectionGraph
} from "../../authority/project.js";

import {
  traverseAuthorityProjection
} from "../../authority/traversal.js";

const declarationIndex = createDeclarationIndex([
  {
    nodeId: "node-c",
    authority: {
      authorityId: "executor.gamma",
      capabilities: ["audit"],
      delegations: ["delegate.gamma"],
      controlSurfaces: ["governance"]
    }
  },
  {
    nodeId: "node-a",
    authority: {
      authorityId: "executor.alpha",
      capabilities: ["deploy"],
      delegations: ["delegate.alpha"],
      controlSurfaces: ["treasury"]
    }
  },
  {
    nodeId: "node-b",
    authority: {
      authorityId: "executor.beta",
      capabilities: ["mint"],
      delegations: ["delegate.beta"],
      controlSurfaces: ["operations"]
    }
  }
]);

const graph = createAuthorityProjectionGraph(
  declarationIndex,
  [
    {
      fromNodeId: "node-a",
      toNodeId: "node-b"
    },
    {
      fromNodeId: "node-b",
      toNodeId: "node-c"
    },
    {
      fromNodeId: "node-c",
      toNodeId: "node-a"
    }
  ]
);

const firstTraversal = traverseAuthorityProjection(graph);
const secondTraversal = traverseAuthorityProjection(graph);

assert.deepStrictEqual(
  firstTraversal,
  secondTraversal
);

assert.deepStrictEqual(firstTraversal.traversal, [
  {
    nodeId: "node-a",
    authorityId: "executor.alpha",
    depth: 0
  },
  {
    nodeId: "node-b",
    authorityId: "executor.beta",
    depth: 0
  },
  {
    nodeId: "node-c",
    authorityId: "executor.gamma",
    depth: 0
  },
  {
    nodeId: "node-a",
    authorityId: "executor.alpha",
    depth: 1
  },
  {
    nodeId: "node-b",
    authorityId: "executor.beta",
    depth: 1
  },
  {
    nodeId: "node-c",
    authorityId: "executor.gamma",
    depth: 1
  },
  {
    nodeId: "node-a",
    authorityId: "executor.alpha",
    depth: 2
  },
  {
    nodeId: "node-b",
    authorityId: "executor.beta",
    depth: 2
  },
  {
    nodeId: "node-c",
    authorityId: "executor.gamma",
    depth: 2
  }
]);

assert.equal(firstTraversal.paths.length, 9);

assert.equal(
  Object.isFrozen(firstTraversal),
  true
);

assert.equal(
  Object.isFrozen(firstTraversal.traversal),
  true
);

assert.equal(
  Object.isFrozen(firstTraversal.paths),
  true
);

assert.deepStrictEqual(
  firstTraversal.traversal.map(
    (entry) => entry.nodeId
  ),
  [
    "node-a",
    "node-b",
    "node-c",
    "node-a",
    "node-b",
    "node-c",
    "node-a",
    "node-b",
    "node-c"
  ]
);

console.log(
  "TASK-007 authority traversal convergence tests passed"
);

import assert from "node:assert/strict";

import {
  createDeclarationIndex
} from "../../authority/declarations.js";

import {
  createAuthorityProjectionGraph,
  projectAuthorityPaths
} from "../../authority/project.js";

const declarationIndex = createDeclarationIndex([
  {
    nodeId: "node-b",
    authority: {
      authorityId: "executor.beta",
      capabilities: ["mint"],
      delegations: ["delegate.gamma"],
      controlSurfaces: ["treasury"]
    }
  },
  {
    nodeId: "node-a",
    authority: {
      authorityId: "executor.alpha",
      capabilities: ["deploy"],
      delegations: ["delegate.alpha"],
      controlSurfaces: ["governance"]
    }
  }
]);

const graph = createAuthorityProjectionGraph(
  declarationIndex,
  [
    {
      fromNodeId: "node-b",
      toNodeId: "node-a"
    },
    {
      fromNodeId: "node-a",
      toNodeId: "node-b"
    }
  ]
);

assert.deepStrictEqual(graph.nodes, [
  {
    nodeId: "node-a",
    authorityId: "executor.alpha"
  },
  {
    nodeId: "node-b",
    authorityId: "executor.beta"
  }
]);

assert.deepStrictEqual(graph.edges, [
  {
    fromNodeId: "node-a",
    toNodeId: "node-b"
  },
  {
    fromNodeId: "node-b",
    toNodeId: "node-a"
  }
]);

const paths = projectAuthorityPaths(graph);

assert.deepStrictEqual(paths, [
  {
    authorityId: "executor.alpha",
    nodePath: ["node-a"]
  },
  {
    authorityId: "executor.beta",
    nodePath: ["node-b"]
  }
]);

assert.equal(Object.isFrozen(graph), true);
assert.equal(Object.isFrozen(graph.nodes), true);
assert.equal(Object.isFrozen(graph.edges), true);

console.log("TASK-007 authority projection tests passed");

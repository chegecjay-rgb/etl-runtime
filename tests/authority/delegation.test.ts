import assert from "node:assert/strict";

import {
  createDeclarationIndex
} from "../../authority/declarations";

import {
  verifyDelegationContinuity
} from "../../authority/delegation";

import {
  createAuthorityProjectionGraph
} from "../../authority/project";

import {
  traverseAuthorityProjection
} from "../../authority/traversal";

const declarationIndex = createDeclarationIndex([
  {
    nodeId: "node-a",
    authority: {
      authorityId: "executor.alpha",
      capabilities: ["deploy"],
      delegations: ["delegate.alpha"],
      controlSurfaces: ["governance"]
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
    }
  ]
);

const traversal = traverseAuthorityProjection(
  graph
);

const result = verifyDelegationContinuity(
  traversal
);

assert.deepEqual(result.lineages, [
  {
    authorityId: "executor.alpha",
    lineage: ["node-a"]
  },
  {
    authorityId: "executor.beta",
    lineage: ["node-a", "node-b"]
  },
  {
    authorityId: "executor.beta",
    lineage: ["node-b"]
  }
]);

assert.deepEqual(result.states, [
  {
    authorityId: "executor.alpha",
    valid: true
  },
  {
    authorityId: "executor.beta",
    valid: true
  },
  {
    authorityId: "executor.beta",
    valid: true
  }
]);

assert.deepEqual(result.paths, [
  {
    authorityId: "executor.alpha",
    visitedNodeIds: ["node-a"]
  },
  {
    authorityId: "executor.beta",
    visitedNodeIds: ["node-a", "node-b"]
  },
  {
    authorityId: "executor.beta",
    visitedNodeIds: ["node-b"]
  }
]);

assert.equal(
  Object.isFrozen(result),
  true
);

assert.equal(
  Object.isFrozen(result.lineages),
  true
);

assert.equal(
  Object.isFrozen(result.states),
  true
);

assert.equal(
  Object.isFrozen(result.paths),
  true
);

console.log(
  "TASK-007 delegation continuity tests passed"
);

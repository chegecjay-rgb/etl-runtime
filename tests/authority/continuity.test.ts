import assert from "node:assert/strict";

import {
  verifyAuthorityContinuity
} from "../../authority/continuity";

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

const delegation = verifyDelegationContinuity(
  traversal
);

const result = verifyAuthorityContinuity(
  delegation
);

assert.deepEqual(result.states, [
  {
    authorityId: "executor.alpha",
    state: "VALID"
  },
  {
    authorityId: "executor.beta",
    state: "VALID"
  },
  {
    authorityId: "executor.beta",
    state: "VALID"
  }
]);

assert.deepEqual(result.continuity, [
  {
    authorityId: "executor.alpha",
    lineage: ["node-a"],
    state: "VALID"
  },
  {
    authorityId: "executor.beta",
    lineage: ["node-a", "node-b"],
    state: "VALID"
  },
  {
    authorityId: "executor.beta",
    lineage: ["node-b"],
    state: "VALID"
  }
]);

assert.deepEqual(result.violations, []);

assert.equal(
  Object.isFrozen(result),
  true
);

assert.equal(
  Object.isFrozen(result.states),
  true
);

assert.equal(
  Object.isFrozen(result.continuity),
  true
);

assert.equal(
  Object.isFrozen(result.violations),
  true
);

console.log(
  "TASK-007 authority continuity tests passed"
);

test("constitutional certification", () => {
import assert from "node:assert/strict";

import {
  verifyAuthorityContinuity
} from "../../authority/continuity.js";

import {
  createDeclarationIndex
} from "../../authority/declarations.js";

import {
  verifyDelegationContinuity
} from "../../authority/delegation.js";

import {
  createAuthorityProjectionGraph
} from "../../authority/project.js";

import {
  traverseAuthorityProjection
} from "../../authority/traversal.js";

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

assert.deepStrictEqual(result.states, [
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

assert.deepStrictEqual(result.continuity, [
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

assert.deepStrictEqual(result.violations, []);

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
})

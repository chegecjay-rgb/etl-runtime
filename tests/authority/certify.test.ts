import assert from "node:assert/strict";

import {
  certifyAuthorityVerification
} from "../../authority/certify.js";

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

import {
  detectUndeclaredAuthority
} from "../../authority/undeclared.js";

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

const continuity = verifyAuthorityContinuity(
  delegation
);

const undeclared = detectUndeclaredAuthority(
  continuity
);

const certification =
  certifyAuthorityVerification(
    continuity,
    traversal,
    undeclared
  );

const replayCertification =
  certifyAuthorityVerification(
    continuity,
    traversal,
    undeclared,
    certification.snapshot
  );

assert.deepStrictEqual(
  certification.snapshot,
  replayCertification.snapshot
);

assert.deepStrictEqual(
  certification.equivalence,
  {
    equivalent: true,
    continuityEquivalent: true,
    traversalEquivalent: true,
    undeclaredEquivalent: true
  }
);

assert.deepStrictEqual(
  certification.diagnostics,
  {
    continuityCount: 3,
    traversalCount: 3,
    undeclaredCount: 0
  }
);

assert.equal(
  Object.isFrozen(certification),
  true
);

assert.equal(
  Object.isFrozen(
    certification.snapshot
  ),
  true
);

assert.equal(
  Object.isFrozen(
    certification.equivalence
  ),
  true
);

assert.equal(
  Object.isFrozen(
    certification.diagnostics
  ),
  true
);

console.log(
  "TASK-007 authority certification tests passed"
);

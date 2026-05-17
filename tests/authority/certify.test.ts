import assert from "node:assert/strict";

import {
  certifyAuthorityVerification
} from "../../authority/certify";

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

import {
  detectUndeclaredAuthority
} from "../../authority/undeclared";

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

assert.deepEqual(
  certification.snapshot,
  replayCertification.snapshot
);

assert.deepEqual(
  certification.equivalence,
  {
    equivalent: true,
    continuityEquivalent: true,
    traversalEquivalent: true,
    undeclaredEquivalent: true
  }
);

assert.deepEqual(
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

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
  createAuthorityHashes
} from "../../authority/hashes";

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

const hashes = createAuthorityHashes(
  continuity,
  traversal,
  certification.snapshot
);

const replayHashes = createAuthorityHashes(
  continuity,
  traversal,
  certification.snapshot
);

assert.deepEqual(
  hashes,
  replayHashes
);

assert.equal(
  hashes.continuity.algorithm,
  "sha256"
);

assert.equal(
  hashes.traversal.traversal.algorithm,
  "sha256"
);

assert.equal(
  hashes.certification.certification.algorithm,
  "sha256"
);

assert.equal(
  hashes.continuity.value.length,
  64
);

assert.equal(
  hashes.traversal.traversal.value.length,
  64
);

assert.equal(
  hashes.certification.certification.value.length,
  64
);

assert.equal(
  Object.isFrozen(hashes),
  true
);

assert.equal(
  Object.isFrozen(
    hashes.continuity
  ),
  true
);

assert.equal(
  Object.isFrozen(
    hashes.traversal
  ),
  true
);

assert.equal(
  Object.isFrozen(
    hashes.certification
  ),
  true
);

console.log(
  "TASK-007 authority hash tests passed"
);

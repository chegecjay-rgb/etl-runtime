test("constitutional certification", () => {
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
  createAuthorityDiagnostics
} from "../../authority/diagnostics.js";

import {
  createAuthorityHashes
} from "../../authority/hashes.js";

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

const hashes =
  createAuthorityHashes(
    continuity,
    traversal,
    certification.snapshot
  );

const diagnostics =
  createAuthorityDiagnostics(
    continuity,
    undeclared,
    certification,
    hashes
  );

assert.deepStrictEqual(
  diagnostics.replay,
  {
    replayStable: true,
    certificationEquivalent: true,
    hashEquivalent: true
  }
);

assert.deepStrictEqual(
  diagnostics.freeze,
  {
    ready: true,
    continuityStable: true,
    undeclaredStable: true,
    hashStable: true
  }
);

assert.equal(
  diagnostics.snapshot
    .continuityStates.length,
  3
);

assert.equal(
  diagnostics.snapshot
    .hashFingerprints.length,
  3
);

assert.equal(
  Object.isFrozen(diagnostics),
  true
);

assert.equal(
  Object.isFrozen(
    diagnostics.replay
  ),
  true
);

assert.equal(
  Object.isFrozen(
    diagnostics.freeze
  ),
  true
);

assert.equal(
  Object.isFrozen(
    diagnostics.snapshot
  ),
  true
);

console.log(
  "TASK-007 authority diagnostics tests passed"
);
})
